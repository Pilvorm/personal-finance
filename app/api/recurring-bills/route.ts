import { db } from "@/db";
import { ilike, and, eq, desc, asc } from "drizzle-orm";
import { recurringBillsTable } from "@/db/schema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get("sort");
    const search = searchParams.get("search");

    const conditions = [];

    if (search) {
      conditions.push(
        ilike(recurringBillsTable.title, `%${search}%`)
      );
    }

    let orderBy;

    switch (sort) {
      case "oldest":
        orderBy = asc(recurringBillsTable.dueDate);
        break;
      case "a-z":
        orderBy = asc(recurringBillsTable.title);
        break;
      case "z-a":
        orderBy = desc(recurringBillsTable.title);
        break;
      case "highest":
        orderBy = desc(recurringBillsTable.amount);
        break;
      case "lowest":
        orderBy = asc(recurringBillsTable.amount);
        break;
      default:
        orderBy = desc(recurringBillsTable.dueDate);
    }

    const data = await db
      .select()
      .from(recurringBillsTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(orderBy);

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}