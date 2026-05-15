"use client";

import { useEffect, useState } from "react";
import { THEMES_MAP } from "../data";

export function formatName(name) {
  if (!name) return "";

  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0];

  const first = parts[0];
  const lastInitial = parts[parts.length - 1][0];

  return `${first} ${lastInitial}.`;
}

export function formatUSD(amount, fraction = 2) {
  return Number(amount ?? 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });
}

export function getOrdinal(day) {
  if (day > 3 && day < 21) return `${day}th`;

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function getColor(themeId) {
  return THEMES_MAP[themeId]?.color || "#ccc";
}

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function buildQueryParams({ search, sort, category, page }) {
  const params = new URLSearchParams();

  params.set("sort", sort);
  params.set("page", page);

  if (category && category !== "all") {
    params.set("category", category);
  }

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  return params;
}

export function groupBudgets(budgets, limit = 4) {
  if (budgets.length <= limit) return budgets;

  const visible = budgets.slice(0, limit - 1);
  const rest = budgets.slice(limit - 1);

  const others = {
    id: "others",
    categoryName: "Others",
    theme: "beige",
    max: rest.reduce((acc, item) => acc + Number(item.max), 0),
    spending: rest.reduce((acc, item) => acc + item.spending, 0),
  };

  return [...visible, others];
}

export function getBillStatus(dueDay) {
  const today = new Date().getDate();

  if (today > dueDay) return "paid";
  if (dueDay - today <= 3) return "due";
  return "upcoming";
}

export function getBillsSummary(billsData = []) {
  if (!billsData) {
    return {
      paid: { count: 0, total: 0 },
      due: { count: 0, total: 0 },
      upcoming: { count: 0, total: 0 },
      grandTotal: { count: 0, total: 0 },
    };
  }

  return billsData?.reduce(
    (acc, bill) => {
      const status = getBillStatus(bill.dueDate);
      const amount = Number(bill.amount ?? 0);

      if (status === "paid") {
        acc.paid.count++;
        acc.paid.total += amount;
      } else if (status === "due") {
        acc.due.count++;
        acc.due.total += amount;
        acc.upcoming.count++;
        acc.upcoming.total += amount;
      } else {
        acc.upcoming.count++;
        acc.upcoming.total += amount;
      }

      acc.grandTotal.count++;
      acc.grandTotal.total += amount;

      return acc;
    },
    {
      paid: { count: 0, total: 0 },
      due: { count: 0, total: 0 },
      upcoming: { count: 0, total: 0 },
      grandTotal: { count: 0, total: 0 },
    },
  );
}
