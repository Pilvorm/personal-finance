import "dotenv/config";
import { db } from "@/db";

import { potsTable } from "./schema";

const userId = "dev-user";

async function main() {
  console.log("Seeding pots...");

  const potsData: typeof potsTable.$inferInsert[] = [
    {
      userId: userId,
      name: "Savings",
      target: "2000.00",
      totalSaved: "159.00",
      theme: "green",
    },
    {
      userId: userId,
      name: "Gift",
      target: "60.00",
      totalSaved: "40.00",
      theme: "cyan",
    },
    {
      userId: userId,
      name: "Concert Ticket",
      target: "150.00",
      totalSaved: "110.00",
      theme: "navy",
    },
    {
      userId: userId,
      name: "New Laptop",
      target: "1000.00",
      totalSaved: "10.00",
      theme: "yellow",
    },
    {
      userId: userId,
      name: "Holiday",
      target: "1440.00",
      totalSaved: "531.00",
      theme: "purple",
    },
  ];

  await db
    .insert(potsTable)
    .values(potsData)
    .onConflictDoNothing();

  console.log("Pots seeded successfully!");

  const allPots = await db.select().from(potsTable);
  console.log("Pots in DB:", allPots);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});