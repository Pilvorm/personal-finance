import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import { budgetsTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding budgets...");

  const budgetsData: typeof budgetsTable.$inferInsert[] = [
    {
      userId: 1,
      categoryId: 1,
      max: "50.00",
      theme: "green",
    },
    {
      userId: 1,
      categoryId: 2,
      max: "750.00",
      theme: "cyan",
    },
    {
      userId: 1,
      categoryId: 4,
      max: "75.00",
      theme: "yellow",
    },
    {
      userId: 1,
      categoryId: 6,
      max: "100.00",
      theme: "navy",
    },
    {
      userId: 1,
      categoryId: 8,
      max: "150.00",
      theme: "blue",
    },
  ];

  await db
    .insert(budgetsTable)
    .values(budgetsData)
    .onConflictDoNothing();

  console.log("Budgets seeded successfully!");

  const allBudgets = await db.select().from(budgetsTable);
  console.log("Budgets in DB:", allBudgets);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});