"use client";

import { useState } from "react";

import PageHeader from "@/app/components/pageHeader";
import DonutChart from "@/app/components/donutChart";
import Category from "@/app/components/category";
import BudgetCard from "@/app/components/budgetCard";
import { AnimatePresence } from "motion/react";
import BudgetModal from "@/app/components/modal/budgetModal";
import { useQuery } from "@tanstack/react-query";

export default function Budgets() {
  const [isOpen, setIsOpen] = useState(false);

  const { status, data, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const res = await fetch("/api/budgets");
      return res.json();
    },
  })

  return (
    <div id="budgets" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <AnimatePresence>
        {isOpen && <BudgetModal setIsOpen={setIsOpen} />}
      </AnimatePresence>

      <PageHeader
        title="Budgets"
        action="+ Add New Budget"
        fn={() => setIsOpen(true)}
      />

      <main className="my-8 flex flex-col lg:grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="card lg:sticky lg:top-6 h-fit col-span-5 flex flex-col md:grid grid-cols-2 lg:flex items-center justify-center gap-12">
          <div className="flex justify-center">
            <DonutChart budgetsData={data} />
          </div>

          {/* Categories */}
          <div className="w-full">
            <h2 className="card-title">Spending Summary</h2>
            <div className="mt-6 w-full grid gap-4 grid-cols-1">
              {data?.map((budget, index) => (
                <Category
                  key={budget.categoryName}
                  theme={budget.theme}
                  name={budget.categoryName}
                  spending={budget.spending}
                  max={budget.max}
                  row={true}
                  className={
                    index !== data.length - 1 &&
                    "pb-4 border-b-1 border-grey-100"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-7 flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {data?.map((budget, index) => (
              <BudgetCard
                key={budget.categoryName}
                id={budget.id}
                theme={budget.theme}
                name={budget.categoryName}
                spending={budget.spending}
                max={budget.max}
                spendingList={budget.transactions}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
