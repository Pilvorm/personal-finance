import { db } from "@/db";
import { categoriesTable } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(categoriesTable);

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
