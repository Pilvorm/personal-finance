import { db } from "@/db";
import { potsTable } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { usersTable } from "@/db/schema";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
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
        .where(and(eq(potsTable.id, parsedId), eq(potsTable.userId, userId)))
        .then((res) => res[0]);

      if (!pot) {
        return Response.json({ error: "Not found" }, { status: 404 });
      }

      const numericAmount = Number(amount);
      const currentSaved = Number(pot.totalSaved);

      let newTotal;
      let balanceChange;

      if (type === "add") {
        newTotal = currentSaved + numericAmount;
        balanceChange = -numericAmount; // Decrease balance
      } else {
        newTotal = currentSaved - numericAmount;
        balanceChange = +numericAmount; // Increase balance
      }

      // Prevent overdraft in pot
      if (newTotal < 0) {
        return Response.json(
          { error: "Insufficient pot funds" },
          { status: 400 },
        );
      }
      
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .then((res) => res[0]);

      if (type === "add" && Number(user.balance) < numericAmount) {
        return Response.json({ error: "Not enough balance" }, { status: 400 });
      }

      await db
        .update(potsTable)
        .set({ totalSaved: String(newTotal) })
        .where(and(eq(potsTable.id, parsedId), eq(potsTable.userId, userId)));

      await db
        .update(usersTable)
        .set({
          balance: sql`${usersTable.balance} + ${balanceChange}`,
        })
        .where(eq(usersTable.id, userId));

      return Response.json({ success: true });
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
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { id } = await context.params;
    const parsedId = Number(id);

    if (!parsedId) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const pot = await db
      .select()
      .from(potsTable)
      .where(and(eq(potsTable.id, parsedId), eq(potsTable.userId, userId)))
      .then((res) => res[0]);

    if (!pot) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const refundAmount = Number(pot.totalSaved);

    // Return money to balance
    await db
      .update(usersTable)
      .set({
        balance: sql`${usersTable.balance} + ${refundAmount}`,
      })
      .where(eq(usersTable.id, userId));

    // Delete pot
    await db
      .delete(potsTable)
      .where(and(eq(potsTable.id, parsedId), eq(potsTable.userId, userId)));

    return Response.json({ success: true });

    return Response.json({ success: true });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
