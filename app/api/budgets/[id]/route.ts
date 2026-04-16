import { db } from "@/db";
import { budgetsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const parsedId = Number(id);

    if (!parsedId) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { categoryId, max, theme } = body;

    const updated = await db
      .update(budgetsTable)
      .set({
        categoryId,
        max,
        theme,
      })
      .where(
        and(
          eq(budgetsTable.userId, 1),
          eq(budgetsTable.id, parsedId),
        ),
      )
      .returning();

    return Response.json(updated[0]);
  } catch (err: any) {
    console.error("PATCH ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const parsedId = Number(id);

    if (!parsedId) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(budgetsTable).where(eq(budgetsTable.id, parsedId));

    return Response.json({ success: true });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
