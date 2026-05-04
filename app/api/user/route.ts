// /api/user/route.ts
import { auth } from "@/auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db
    .select({
      balance: usersTable.balance,
    })
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .then((res) => res[0]);

  return Response.json(user);
}