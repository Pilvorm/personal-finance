import "dotenv/config";
import { db } from "@/db";

import { budgetsTable } from "./schema";

const userId = "dev-user";

async function main() {
  console.log("Seeding budgets...");

  const budgetsData: typeof budgetsTable.$inferInsert[] = [
    {
      userId: userId,
      categoryId: 1,
      max: "50.00",
      theme: "green",
    },
    {
      userId: userId,
      categoryId: 2,
      max: "750.00",
      theme: "cyan",
    },
    {
      userId: userId,
      categoryId: 4,
      max: "75.00",
      theme: "yellow",
    },
    {
      userId: userId,
      categoryId: 6,
      max: "100.00",
      theme: "navy",
    },
    {
      userId: userId,
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