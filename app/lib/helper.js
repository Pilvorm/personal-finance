"use client";

import { useEffect, useState } from "react";
import { THEMES } from "../data";

export function getColor(themeId) {
  return THEMES.find((t) => t.id === themeId)?.color || "#ccc";
};

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