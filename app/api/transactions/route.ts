import { db } from "@/db";
import { ilike, and, eq, desc, asc } from "drizzle-orm";
import { transactionsTable, categoriesTable } from "@/db/schema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get("sort");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const conditions = [];

    if (category && category !== "all") {
      conditions.push(
        eq(transactionsTable.categoryId, Number(category))
      );
    }

    if (search) {
      conditions.push(
        ilike(transactionsTable.name, `%${search}%`)
      );
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
        amount: transactionsTable.amount,
        date: transactionsTable.date,
        avatar: transactionsTable.avatar,
        categoryId: transactionsTable.categoryId,
        categoryName: categoriesTable.name,
      })
      .from(transactionsTable)
      .leftJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id)
      )
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(orderBy);

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}