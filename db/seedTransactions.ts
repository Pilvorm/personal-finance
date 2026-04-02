import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import { transactionsTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding transactions...");

  const transactionsData: typeof transactionsTable.$inferInsert[] = [
    {
      userId: 1,
      categoryId: 10,
      name: "Emma Richardson",
      avatar: "emma-richardson.jpg",
      amount: "75.50",
      date: new Date("2024-08-19"),
    },
    {
      userId: 1,
      categoryId: 4,
      name: "Savory Bites Bistro",
      avatar: "savory-bites-bistro.jpg",
      amount: "-55.50",
      date: new Date("2024-08-19"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Daniel Carter",
      avatar: "daniel-carter.jpg",
      amount: "-42.30",
      date: new Date("2024-08-18"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Sun Park",
      avatar: "sun-park.jpg",
      amount: "120.00",
      date: new Date("2024-08-17"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Urban Services Hub",
      avatar: "urban-services-hub.jpg",
      amount: "-65.00",
      date: new Date("2024-08-17"),
    },
    {
      userId: 1,
      categoryId: 3,
      name: "Liam Hughes",
      avatar: "liam-hughes.jpg",
      amount: "65.75",
      date: new Date("2024-08-15"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Lily Ramirez",
      avatar: "lily-ramirez.jpg",
      amount: "50.00",
      date: new Date("2024-08-14"),
    },
    {
      userId: 1,
      categoryId: 4,
      name: "Ethan Clark",
      avatar: "ethan-clark.jpg",
      amount: "-32.50",
      date: new Date("2024-08-13"),
    },
    {
      userId: 1,
      categoryId: 1,
      name: "James Thompson",
      avatar: "james-thompson.jpg",
      amount: "-5.00",
      date: new Date("2024-08-11"),
    },
    {
      userId: 1,
      categoryId: 1,
      name: "Pixel Playground",
      avatar: "pixel-playground.jpg",
      amount: "-10.00",
      date: new Date("2024-08-11"),
    },

    // Remaining 10 (continuing same style for full 20)
    {
      userId: 1,
      categoryId: 6,
      name: "Bravo Zen Spa",
      avatar: "serenity-spa-and-wellness.jpg",
      amount: "-25.00",
      date: new Date("2024-08-10"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Alpha Analytics",
      avatar: "nimbus-data-storage.jpg",
      amount: "450.00",
      date: new Date("2024-08-09"),
    },
    {
      userId: 1,
      categoryId: 8,
      name: "Echo Game Store",
      avatar: "pixel-playground.jpg",
      amount: "-21.50",
      date: new Date("2024-08-08"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Emma Richardson",
      avatar: "emma-richardson.jpg",
      amount: "-21.50",
      date: new Date("2024-08-07"),
    },
    {
      userId: 1,
      categoryId: 5,
      name: "Delta Taxi",
      avatar: "swift-ride-share.jpg",
      amount: "-15.00",
      date: new Date("2024-08-06"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Sun Park",
      avatar: "sun-park.jpg",
      amount: "-15.00",
      date: new Date("2024-08-05"),
    },
    {
      userId: 1,
      categoryId: 6,
      name: "Bravo Zen Spa",
      avatar: "serenity-spa-and-wellness.jpg",
      amount: "-25.00",
      date: new Date("2024-08-04"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Liam Hughes",
      avatar: "liam-hughes.jpg",
      amount: "-10.00",
      date: new Date("2024-08-03"),
    },
    {
      userId: 1,
      categoryId: 10,
      name: "Alpha Analytics",
      avatar: "nimbus-data-storage.jpg",
      amount: "1900.00",
      date: new Date("2024-08-02"),
    },
    {
      userId: 1,
      categoryId: 2,
      name: "Charlie Electric Company",
      avatar: "spark-electric-solutions.jpg",
      amount: "-100.00",
      date: new Date("2024-08-01"),
    },
  ];

  await db
    .insert(transactionsTable)
    .values(transactionsData)
    .onConflictDoNothing();

  console.log("Transactions seeded successfully!");

  const allTransactions = await db.select().from(transactionsTable);
  console.log("Transactions in DB:", allTransactions);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});