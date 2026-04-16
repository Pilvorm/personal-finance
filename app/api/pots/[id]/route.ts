import { db } from "@/db";
import { potsTable } from "@/db/schema";
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
    const { name, target, theme, amount, type } = body;

    // TRANSACTION
    if (amount && type) {
      const pot = await db
        .select()
        .from(potsTable)
        .where(eq(potsTable.id, parsedId))
        .then((res) => res[0]);

      const newTotal =
        type === "add"
          ? Number(pot.totalSaved) + Number(amount)
          : Number(pot.totalSaved) - Number(amount);

      const updated = await db
        .update(potsTable)
        .set({
          totalSaved: String(newTotal),
        })
        .where(eq(potsTable.id, parsedId))
        .returning();

      return Response.json(updated[0]);
    }

    // EDIT POT
    const updated = await db
      .update(potsTable)
      .set({
        ...(name !== undefined && { name }),
        ...(target !== undefined && { target }),
        ...(theme !== undefined && { theme }),
      })
      .where(eq(potsTable.id, parsedId))
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

    await db.delete(potsTable).where(eq(potsTable.id, parsedId));

    return Response.json({ success: true });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
