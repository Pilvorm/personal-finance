import "dotenv/config";
import { db } from "@/db";

import { categoriesTable } from "./schema";

async function main() {
  console.log("Seeding categories...");

  const categoryData: (typeof categoriesTable.$inferInsert)[] = [
    { name: "Entertainment" },
    { name: "Bills" },
    { name: "Groceries" },
    { name: "Dining Out" },
    { name: "Transportation" },
    { name: "Personal Care" },
    { name: "Education" },
    { name: "Lifestyle" },
    { name: "Shopping" },
    { name: "General" },
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
