import { db } from "@/db";
import { ilike, and, eq, desc, asc, count, sql } from "drizzle-orm";
import { transactionsTable, categoriesTable } from "@/db/schema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get("sort");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") || 1);
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const conditions = [];

    if (category && category !== "all") {
      conditions.push(eq(transactionsTable.categoryId, Number(category)));
    }

    if (search) {
      conditions.push(ilike(transactionsTable.name, `%${search}%`));
    }

    let orderBy;

    switch (sort) {
      case "oldest":
        orderBy = asc(transactionsTable.date);
        break;
      case "a-z":
        orderBy = asc(transactionsTable.name);
        break;
      case "z-a":
        orderBy = desc(transactionsTable.name);
        break;
      case "highest":
        orderBy = desc(transactionsTable.amount);
        break;
      case "lowest":
        orderBy = asc(transactionsTable.amount);
        break;
      default:
        orderBy = desc(transactionsTable.date);
    }

    const data = await db
      .select({
        id: transactionsTable.id,
        name: transactionsTable.name,
        type: transactionsTable.type,
        amount: transactionsTable.amount,
        date: transactionsTable.date,
        avatar: transactionsTable.avatar,
        categoryId: transactionsTable.categoryId,
        categoryName: categoriesTable.name,
      })
      .from(transactionsTable)
      .leftJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset(offset);

    const [{ count: totalCount }] = await db
      .select({ count: count() })
      .from(transactionsTable)
      .where(conditions.length ? and(...conditions) : undefined);

    const [summary] = await db
      .select({
        income: sql`COALESCE(SUM(CASE WHEN ${transactionsTable.type} = 'income' THEN ${transactionsTable.amount} ELSE 0 END), 0)`,
        expense: sql`COALESCE(SUM(CASE WHEN ${transactionsTable.type} = 'expense' THEN ${transactionsTable.amount} ELSE 0 END), 0)`,
      })
      .from(transactionsTable)
      .where(conditions.length ? and(...conditions) : undefined);

    const totalPages = Math.ceil(Number(totalCount) / pageSize);

    const safePage = Math.min(page, totalPages || 1);

    return Response.json({
      data,
      summary: {
        income: Number(summary.income),
        expense: Number(summary.expense),
      },
      currentPage: safePage,
      totalPages,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
