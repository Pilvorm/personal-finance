"use client";

import { useState } from "react";
import Modal from "./modal";
import DropdownInput from "../dropdowns/dropdownInput";
import { useQuery } from "@tanstack/react-query";
import { THEMES } from "@/app/data";

export default function BudgetModal({ setIsOpen }) {
  const { status, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      return res.json();
    },
  });

  const [selectedCategory, setSelectedCategory] = useState(
    data ? data[0].name : "Select Category",
  );
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].label);

  return (
    <Modal
      title="Add New Budget"
      description="Choose a category to set a spending budget. These categories can help you monitor spending."
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-4">
        <DropdownInput
          label="Budget Category"
          value={selectedCategory}
          setValue={setSelectedCategory}
          options={data ? data.map((category) => category.name) : []}
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
              step="0.01"
              className="w-full outline-none"
            />
          </div>
        </div>
        <DropdownInput
          type={"theme"}
          label="Theme"
          value={selectedTheme}
          setValue={setSelectedTheme}
          options={THEMES.map((theme) => theme.label)}
        />
      </div>
      <button type="submit" className="submit-btn">
        Add Budget
      </button>
    </Modal>
  );
}
