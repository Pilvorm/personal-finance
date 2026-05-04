"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./modal";
import Input from "../input";
import DropdownInput from "../dropdowns/dropdownInput";
import { useQuery } from "@tanstack/react-query";
import { THEMES, THEMES_MAP, EXCLUDED_THEMES } from "@/app/data";
import {
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
} from "@/app/lib/mutations/useBudgetMutation";

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

  // Prefill form fields when editing
  useEffect(() => {
    if (editData && categoriesData.length) {
      const foundCategory = categoriesData.find(
        (c) => c.name === editData.categoryName,
      );

      const foundTheme = editData.theme
        ? {
            id: editData.theme,
            ...THEMES_MAP[editData.theme],
          }
        : null;

      setSelectedCategory(foundCategory || null);
      setSelectedTheme(foundTheme || null);
      setBudget(editData.max);
    }
  }, [editData, categoriesData]);

  const [errors, setErrors] = useState({});

  const createBudget = useCreateBudgetMutation({ setIsOpen });
  const updateBudget = useUpdateBudgetMutation({ editData, setIsOpen });
  const saveBudget = isEdit ? updateBudget : createBudget;

  return (
    <Modal
      title={isEdit ? "Edit Budget" : "Add New Budget"}
      description={
        isEdit
          ? "As your budgets change, feel free to update your spending limits."
          : "Choose a category to set a spending budget."
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

        <Input
          label="Maximum Spend"
          type="number"
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
            setErrors((prev) => ({ ...prev, budget: "" }));
          }}
          error={errors.budget}
        />

        <DropdownInput
          type="theme"
          label="Theme"
          value={selectedTheme}
          setValue={setSelectedTheme}
          options={availableThemes}
        />
      </div>

      <button
        onClick={() => {
          const newErrors = {};

          if (!budget || Number(budget) <= 0) {
            newErrors.budget = "Maximum spend is required";
          }

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          }

          setErrors({});
          saveBudget.mutate({
            categoryId: selectedCategory.id,
            max: budget,
            theme: selectedTheme.id,
          });
        }}
        className="submit-btn"
      >
        {isEdit ? "Save Changes" : "Add Budget"}
      </button>
    </Modal>
  );
}
