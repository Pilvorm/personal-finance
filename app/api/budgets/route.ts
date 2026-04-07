import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { transactionsTable, budgetsTable, categoriesTable } from "@/db/schema";

export async function GET() {
  try {
    const budgets = await db
      .select({
        id: budgetsTable.id,
        max: budgetsTable.max,
        theme: budgetsTable.theme,
        categoryId: categoriesTable.id,
        categoryName: categoriesTable.name,
      })
      .from(budgetsTable)
      .leftJoin(
        categoriesTable,
        eq(budgetsTable.categoryId, categoriesTable.id),
      );

    const transactions = await db
      .select({
        id: transactionsTable.id,
        name: transactionsTable.name,
        amount: transactionsTable.amount,
        date: transactionsTable.date,
        avatar: transactionsTable.avatar,
        categoryId: transactionsTable.categoryId,
      })
      .from(transactionsTable)
      .orderBy(desc(transactionsTable.date));

    const result = budgets.map((budget) => {
      const txs = transactions.filter(
        (t) => t.categoryId === budget.categoryId,
      );

      const spending = txs
        .filter((t) => Number(t.amount) < 0)
        .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

      return {
        ...budget,
        spending,
        transactions: txs.slice(0, 3),
      };
    });

    return Response.json(result);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
