import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import { recurringBillsTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding recurring bills...");

  const billsData: (typeof recurringBillsTable.$inferInsert)[] = [
    {
      userId: 1,
      title: "Spark Electric Solutions",
      avatar: "spark-electric-solutions.jpg",
      amount: "100.00",
      dueDate: 2,
    },
    {
      userId: 1,
      title: "Serenity Spa & Wellness",
      avatar: "serenity-spa-and-wellness.jpg",
      amount: "30.00",
      dueDate: 3,
    },
    {
      userId: 1,
      title: "Elevate Education",
      avatar: "elevate-education.jpg",
      amount: "50.00",
      dueDate: 4,
    },
    {
      userId: 1,
      title: "Pixel Playground",
      avatar: "pixel-playground.jpg",
      amount: "10.00",
      dueDate: 11,
    },
    {
      userId: 1,
      title: "Nimbus Data Storage",
      avatar: "nimbus-data-storage.jpg",
      amount: "9.99",
      dueDate: 21,
    },
    {
      userId: 1,
      title: "ByteWise",
      avatar: "bytewise.jpg",
      amount: "49.99",
      dueDate: 23,
    },
    {
      userId: 1,
      title: "EcoFuel Energy",
      avatar: "ecofuel-energy.jpg",
      amount: "35.00",
      dueDate: 29,
    },
    {
      userId: 1,
      title: "Aqua Flow Utilities",
      avatar: "aqua-flow-utilities.jpg",
      amount: "100.00",
      dueDate: 30,
    },
  ];

  await db.insert(recurringBillsTable).values(billsData).onConflictDoNothing();

  console.log("Recurring bills seeded successfully!");

  const allBills = await db.select().from(recurringBillsTable);
  console.log("Bills in DB:", allBills);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
