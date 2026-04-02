import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import { categoriesTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding categories...");

  const categoryData: typeof categoriesTable.$inferInsert[] = [
    { name: "Entertainment", type: "expense" },
    { name: "Bills", type: "expense" },
    { name: "Groceries", type: "expense" },
    { name: "Dining Out", type: "expense" },
    { name: "Transportation", type: "expense" },
    { name: "Personal Care", type: "expense" },
    { name: "Education", type: "expense" },
    { name: "Lifestyle", type: "expense" },
    { name: "Shopping", type: "expense" },
    { name: "General", type: "expense" },
  ];

  await db.insert(categoriesTable).values(categoryData).onConflictDoNothing();

  console.log("Categories seeded successfully!");

  const allCategories = await db.select().from(categoriesTable);
  console.log("Categories in DB:", allCategories);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});