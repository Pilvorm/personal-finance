import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import { potsTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding pots...");

  const potsData: typeof potsTable.$inferInsert[] = [
    {
      userId: 1,
      name: "Savings",
      target: "2000.00",
      totalSaved: "159.00",
      theme: "green",
    },
    {
      userId: 1,
      name: "Gift",
      target: "60.00",
      totalSaved: "40.00",
      theme: "cyan",
    },
    {
      userId: 1,
      name: "Concert Ticket",
      target: "150.00",
      totalSaved: "110.00",
      theme: "navy",
    },
    {
      userId: 1,
      name: "New Laptop",
      target: "1000.00",
      totalSaved: "10.00",
      theme: "yellow",
    },
    {
      userId: 1,
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