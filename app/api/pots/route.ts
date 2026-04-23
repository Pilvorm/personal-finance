import { db } from "@/db";
import { eq, asc, desc } from "drizzle-orm";
import { potsTable } from "@/db/schema";

export async function GET() {
  try {
    const rawData = await db.select().from(potsTable).orderBy(asc(potsTable.id));

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
  try {
    const body = await req.json();

    const { name, target, theme } = body;

    const inserted = await db
      .insert(potsTable)
      .values({
        userId: 1,
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
