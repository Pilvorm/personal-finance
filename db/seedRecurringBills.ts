import "dotenv/config";
import { db } from "@/db";
import { recurringBillsTable } from "./schema";

const userId = "dev-user";

async function main() {
  console.log("Seeding recurring bills...");

  const billsData: (typeof recurringBillsTable.$inferInsert)[] = [
    {
      title: "Spark Electric Solutions",
      avatar: "spark-electric-solutions.jpg",
      amount: "100.00",
      dueDate: 2,
    },
    {
      title: "Serenity Spa & Wellness",
      avatar: "serenity-spa-and-wellness.jpg",
      amount: "30.00",
      dueDate: 3,
    },
    {
      title: "Elevate Education",
      avatar: "elevate-education.jpg",
      amount: "50.00",
      dueDate: 4,
    },
    {
      title: "Pixel Playground",
      avatar: "pixel-playground.jpg",
      amount: "10.00",
      dueDate: 11,
    },
    {
      title: "Nimbus Data Storage",
      avatar: "nimbus-data-storage.jpg",
      amount: "9.99",
      dueDate: 21,
    },
    {
      title: "ByteWise",
      avatar: "bytewise.jpg",
      amount: "49.99",
      dueDate: 23,
    },
    {
      title: "EcoFuel Energy",
      avatar: "ecofuel-energy.jpg",
      amount: "35.00",
      dueDate: 29,
    },
    {
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
