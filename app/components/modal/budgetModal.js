"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./modal";
import DropdownInput from "../dropdowns/dropdownInput";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { THEMES } from "@/app/data";

export default function BudgetModal({
  setIsOpen,
  usedCategories = new Set(),
  usedThemes = new Set(),
}) {
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      return res.json();
    },
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [budget, setBudget] = useState("");

  const availableCategories = useMemo(
    () => categoriesData.filter((c) => !usedCategories.has(c.name)),
    [categoriesData, usedCategories],
  );

  const availableThemes = useMemo(
    () => THEMES.filter((t) => !usedThemes.has(t.id)),
    [usedThemes],
  );

  useEffect(() => {
    if (availableCategories.length && !selectedCategory) {
      setSelectedCategory(availableCategories[0]);
    }
  }, [availableCategories, selectedCategory]);

  useEffect(() => {
    if (availableThemes.length && !selectedTheme) {
      setSelectedTheme(availableThemes[0]);
    }
  }, [availableThemes, selectedTheme]);

  const queryClient = useQueryClient();

  const addBudget = useMutation({
    mutationFn: async (newBudget) => {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBudget),
      });

      return res.json();
    },

    onMutate: async (newBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const previous = queryClient.getQueryData(["budgets"]);

      // Optimistic data must match server response shape 1:1
      const optimisticBudget = {
        id: Date.now(),
        categoryId: newBudget.categoryId,
        categoryName: selectedCategory.name,
        max: newBudget.max,
        theme: newBudget.theme,
        spending: 0,
        transactions: [],
      };

      queryClient.setQueryData(["budgets"], (old = []) => [
        ...old,
        optimisticBudget,
      ]);

      return { previous };
    },

    onError: (err, newBudget, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  return (
    <Modal
      title="Add New Budget"
      description="Choose a category to set a spending budget."
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-4">
        <DropdownInput
          label="Budget Category"
          value={selectedCategory?.name}
          setValue={setSelectedCategory}
          options={availableCategories}
        />

        <div>
          <label className="mb-1 text-xs text-grey-500 font-bold">
            Maximum Spend
          </label>
          <div className="btn-basic px-5 py-3 flex items-center gap-3">
            <span className="text-sm text-beige-500">$</span>
            <input
              name="budget"
              type="number"
              min="0"
              max="1000000"
              step="0.01"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <DropdownInput
          type="theme"
          label="Theme"
          value={selectedTheme?.name}
          setValue={setSelectedTheme}
          options={availableThemes}
        />
      </div>

      <button
        type="submit"
        onClick={() =>
          addBudget.mutate({
            categoryId: selectedCategory.id,
            max: budget,
            theme: selectedTheme.id,
          })
        }
        // Add isPending and close modal later
        className="submit-btn"
      >
        Add Budget
      </button>
    </Modal>
  );
}
