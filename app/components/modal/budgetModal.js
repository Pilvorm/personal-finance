"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./modal";
import DropdownInput from "../dropdowns/dropdownInput";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { THEMES, EXCLUDED_THEMES } from "@/app/data";

export default function BudgetModal({
  setIsOpen,
  usedCategories = new Set(),
  usedThemes = new Set(),
  editData = null,
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

  const isEdit = !!editData;

  const availableCategories = useMemo(
    () =>
      categoriesData.filter(
        (c) => !usedCategories.has(c.name) || c.name === editData?.categoryName,
      ),
    [categoriesData, usedCategories, editData],
  );

  const availableThemes = useMemo(
    () =>
      THEMES.filter(
        (t) =>
          !EXCLUDED_THEMES.has(t.id) &&
          (!usedThemes.has(t.id) || t.id === editData?.theme),
      ),
    [usedThemes, editData],
  );

  useEffect(() => {
    if (!isEdit && availableCategories.length && !selectedCategory) {
      setSelectedCategory(availableCategories[0]);
    }
  }, [availableCategories, selectedCategory, isEdit]);

  useEffect(() => {
    if (!isEdit && availableThemes.length && !selectedTheme) {
      setSelectedTheme(availableThemes[0]);
    }
  }, [availableThemes, selectedTheme, isEdit]);

  //  Prefill for editing
  useEffect(() => {
    if (editData && categoriesData.length) {
      const foundCategory = categoriesData.find(
        (c) => c.name === editData.categoryName,
      );
      const foundTheme = THEMES.find((t) => t.id === editData.theme);

      setSelectedCategory(foundCategory || null);
      setSelectedTheme(foundTheme || null);
      setBudget(editData.max);
    }
  }, [editData, categoriesData]);

  const queryClient = useQueryClient();

  const saveBudget = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(
        isEdit ? `/api/budgets/${editData.id}` : "/api/budgets",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      return res.json();
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      const previous = queryClient.getQueryData(["budgets"]);

      // Optimistic data must match server response shape 1:1
      queryClient.setQueryData(["budgets"], (old = []) => {
        if (isEdit) {
          return old.map((b) =>
            b.id === editData.id
              ? {
                  ...b,
                  categoryId: payload.categoryId,
                  categoryName: selectedCategory.name,
                  max: payload.max,
                  theme: payload.theme,
                }
              : b,
          );
        }

        // Create
        const optimisticBudget = {
          id: Date.now(),
          categoryId: payload.categoryId,
          categoryName: selectedCategory.name,
          max: payload.max,
          theme: payload.theme,
          spending: 0,
          transactions: [],
        };

        return [...old, optimisticBudget];
      });

      return { previous };
    },

    onError: (err, payload, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsOpen(); // close modal
    },
  });

  return (
    <Modal
      title={isEdit ? "Edit Budget" : "Add New Budget"}
      description={
        isEdit
          ? "As your budgets change, feel free to update your spending limits."
          : "Choose a category to set a spending budget. These categories can help you monitor spending."
      }
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
        disabled={!selectedCategory || !budget || !selectedTheme}
        onClick={() =>
          saveBudget.mutate({
            categoryId: selectedCategory.id,
            max: budget,
            theme: selectedTheme.id,
          })
        }
        className="submit-btn"
      >
        {isEdit ? "Save Changes" : "Add Budget"}
      </button>
    </Modal>
  );
}
