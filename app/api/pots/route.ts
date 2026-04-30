import { db } from "@/db";
import { eq, asc, desc } from "drizzle-orm";
import { potsTable } from "@/db/schema";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const rawData = await db
      .select()
      .from(potsTable)
      .where(eq(potsTable.userId, userId))
      .orderBy(asc(potsTable.id));

    const data = rawData.map((p) => ({
      ...p,
      target: Number(p.target),
      totalSaved: Number(p.totalSaved),
    }));

    const grandTotalSaved = data.reduce(
      (acc, item) => acc + item.totalSaved,
      0,
    );

    return Response.json({ data, grandTotalSaved });
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

    const { name, target, theme } = body;

    const inserted = await db
      .insert(potsTable)
      .values({
        userId: userId,
        name,
        target,
        theme,
      })
      .returning();

    return Response.json(inserted[0]);
  } catch (err: any) {
    console.error("POST ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
