"use client";

import { useEffect, useState } from "react";
import { THEMES_MAP } from "../data";

export function formatUSD(amount, fraction = 2) {
  return Number(amount).toLocaleString("en-US", {
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
