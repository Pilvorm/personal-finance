import { db } from "@/db";
import { eq, asc, desc } from "drizzle-orm";
import { transactionsTable, budgetsTable, categoriesTable } from "@/db/schema";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

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
      )
      .where(eq(budgetsTable.userId, userId))
      .orderBy(asc(budgetsTable.id));

    const transactions = await db
      .select({
        id: transactionsTable.id,
        name: transactionsTable.name,
        type: transactionsTable.type,
        amount: transactionsTable.amount,
        date: transactionsTable.date,
        avatar: transactionsTable.avatar,
        categoryId: transactionsTable.categoryId,
      })
      .from(transactionsTable)
      .orderBy(desc(transactionsTable.date));

    const result = budgets.map((budget) => {
      const txs = transactions.filter(
        (t) => t.categoryId === budget.categoryId && t.type === "expense",
      );

      const spending = txs.reduce((acc, t) => acc + Number(t.amount), 0);

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

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await req.json();

    const { categoryId, max, theme } = body;

    const inserted = await db
      .insert(budgetsTable)
      .values({
        userId: userId,
        categoryId,
        max: String(max),
        theme,
      })
      .returning();

    return Response.json(inserted[0]);
  } catch (err: any) {
    console.error("POST ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
