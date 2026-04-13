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

export const THEMES = [
  {id: "beige", name: "Beige", color: "#f8f4f0"},
  { id: "green", name: "Green", color: "#277c78" },
  { id: "yellow", name: "Yellow", color: "#f2cdac" },
  { id: "cyan", name: "Cyan", color: "#82c9d7" },

  { id: "navy", name: "Navy", color: "#626070" },
  { id: "red", name: "Red", color: "#c94736" },
  { id: "purple", name: "Purple", color: "#826cb0" },

  { id: "turquoise", name: "Turquoise", color: "#597c7c" },
  { id: "brown", name: "Brown", color: "#93674f" },

  { id: "magenta", name: "Magenta", color: "#934f6f" },
  { id: "blue", name: "Blue", color: "#3f82b2" },
  { id: "navy-grey", name: "Navy Grey", color: "#97a0ac" },

  { id: "army", name: "Army", color: "#7f9161" },
  { id: "gold", name: "Gold", color: "#cab361" },
  { id: "orange", name: "Orange", color: "#be6c49" },
];

export const EXCLUDED_THEMES = new Set(["beige"]);

export const SORT_OPTIONS = [
  { name: "Latest", value: "latest" },
  { name: "Oldest", value: "oldest" },
  { name: "A to Z", value: "a-z" },
  { name: "Z to A", value: "z-a" },
  { name: "Highest", value: "highest" },
  { name: "Lowest", value: "lowest" },
];

export const POTS_DATA = [
  {
    id: "savings",
    name: "Savings",
    totalSaved: 159,
    target: 2000,
    theme: "green",
  },
  {
    id: "gift",
    name: "Gift",
    totalSaved: 40,
    target: 60,
    theme: "cyan",
  },
  {
    id: "concert-ticket",
    name: "Concert Ticket",
    totalSaved: 110,
    target: 150,
    theme: "navy",
  },
  {
    id: "new-laptop",
    name: "New Laptop",
    totalSaved: 10,
    target: 1000,
    theme: "yellow",
  },
  {
    id: "holiday",
    name: "Holiday",
    totalSaved: 531,
    target: 1440,
    theme: "purple",
  },
];

export const BUDGETS_DATA = [
  {
    name: "Entertainment",
    limit: 50,
    spending: 15,
    color: "#2F7F73",
    tagColor: "green",
  },
  {
    name: "Bills",
    limit: 750,
    spending: 150,
    color: "#7DB9C8",
    tagColor: "cyan",
  },
  {
    name: "Dining Out",
    limit: 75,
    spending: 133,
    color: "#E6C29F",
    tagColor: "yellow",
  },
  {
    name: "Personal Care",
    limit: 100,
    spending: 40,
    color: "#6B6A77",
    tagColor: "navy",
  },
];

export const DROPDOWN_ANIMATION = {
  initial: { opacity: 0, translateY: "-10px" },
  animate: { opacity: 1, translateY: "0px" },
  exit: { opacity: 0, translateY: "-10px" },
  transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] },
};
