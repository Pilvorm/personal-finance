import {
  pgTable,
  integer,
  varchar,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

// USERS
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
});

// CATEGORIES
export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar({ length: 100 }).notNull(), // Food, Bills, etc
  type: varchar({ length: 50 }).notNull(), // "income" | "expense"
});

// TRANSACTIONS
export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id").notNull(),
  categoryId: integer("category_id").notNull(),

  name: varchar({ length: 255 }).notNull(), // sender/recipient
  amount: numeric({ precision: 10, scale: 2 }).notNull(), // supports decimals

  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// BUDGETS
export const budgetsTable = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id").notNull(),
  categoryId: integer("category_id").notNull(),

  max: numeric({ precision: 10, scale: 2 }).notNull(),

  theme: varchar({ length: 50 }), // color tag
});

// POTS
export const potsTable = pgTable("pots", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id").notNull(),

  name: varchar({ length: 255 }).notNull(),

  target: numeric({ precision: 10, scale: 2 }).notNull(),
  currentAmount: numeric({ precision: 10, scale: 2 }).default("0"),

  theme: varchar({ length: 50 }),
});

// RECURRING BILLS
export const recurringBillsTable = pgTable("recurring_bills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id").notNull(),

  title: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),

  dueDate: integer("due_date").notNull(), // day of month (1–31)

  createdAt: timestamp("created_at").defaultNow(),
});
