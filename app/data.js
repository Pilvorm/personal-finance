import {
  OverviewIcon,
  TransactionsIcon,
  BudgetsIcon,
  PotsIcon,
  RecurringBillsIcon,
} from "./components/icons";

export const SIDEBAR_MENU = [
  { id: "overview", label: "Overview", href: "/", icon: OverviewIcon },
  {
    id: "transactions",
    label: "Transactions",
    href: "/transactions",
    icon: TransactionsIcon,
  },
  { id: "budgets", label: "Budgets", href: "/budgets", icon: BudgetsIcon },
  { id: "pots", label: "Pots", href: "/pots", icon: PotsIcon },
  {
    id: "recurring-bills",
    label: "Recurring Bills",
    href: "/recurring-bills",
    icon: RecurringBillsIcon,
  },
];

export const POTS_DATA = [
  {
    id: "savings",
    label: "Savings",
    totalSaved: 159,
    target: 2000,
    color: "green",
  },
  {
    id: "gift",
    label: "Gift",
    totalSaved: 40,
    target: 60,
    color: "cyan",
  },
  {
    id: "concert-ticket",
    label: "Concert Ticket",
    totalSaved: 110,
    target: 150,
    color: "navy",
  },
  {
    id: "new-laptop",
    label: "New Laptop",
    totalSaved: 10,
    target: 1000,
    color: "yellow",
  },
  {
    id: "holiday",
    label: "Holiday",
    totalSaved: 531,
    target: 1440,
    color: "purple",
  },
];

export const BUDGETS_DATA = [
  {
    label: "Entertainment",
    limit: 50,
    spending: 15,
    color: "#2F7F73",
    tagColor: "green",
  },
  {
    label: "Bills",
    limit: 750,
    spending: 150,
    color: "#7DB9C8",
    tagColor: "cyan",
  },
  {
    label: "Dining Out",
    limit: 75,
    spending: 133,
    color: "#E6C29F",
    tagColor: "yellow",
  },
  {
    label: "Personal Care",
    limit: 100,
    spending: 40,
    color: "#6B6A77",
    tagColor: "navy",
  },
];