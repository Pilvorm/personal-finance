import { db } from "@/db";
import { budgetsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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
