import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { transactionsTable, categoriesTable } from "@/db/schema";

export async function GET() {
  try {
    const data = await db
      .select({
        id: transactionsTable.id,
        name: transactionsTable.name,
        amount: transactionsTable.amount,
        date: transactionsTable.date,
        avatar: transactionsTable.avatar,
        categoryName: categoriesTable.name,
      })
      .from(transactionsTable)
      .leftJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .orderBy(desc(transactionsTable.date));

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
