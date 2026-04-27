import {
  pgTable,
  primaryKey,
  text,
  integer,
  varchar,
  numeric,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

// USERS
export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const accountsTable = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
 
export const sessionsTable = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
)

// CATEGORIES
export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar({ length: 100 }).notNull(), // Food, Bills, etc
  type: varchar({ length: 50 }).notNull(), // "income" | "expense"
});

// TRANSACTIONS
export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  categoryId: integer("category_id")
    .notNull()
    .references(() => categoriesTable.id),

  name: varchar({ length: 255 }).notNull(), // sender/recipient
  avatar: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 10, scale: 2 }).notNull(), // supports decimals

  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// BUDGETS
export const budgetsTable = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categoriesTable.id),

  max: numeric({ precision: 10, scale: 2 }).notNull(),

  theme: varchar({ length: 50 }), // color tag
});

// POTS
export const potsTable = pgTable("pots", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  name: varchar({ length: 255 }).notNull(),

  target: numeric({ precision: 10, scale: 2 }).notNull(),
  totalSaved: numeric("total_saved", { precision: 10, scale: 2 }).default("0"),

  theme: varchar({ length: 50 }),
});

// RECURRING BILLS
export const recurringBillsTable = pgTable("recurring_bills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  title: varchar({ length: 255 }).notNull(),
  avatar: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),

  dueDate: integer("due_date").notNull(), // day of month (1–31)

  createdAt: timestamp("created_at").defaultNow(),
});
