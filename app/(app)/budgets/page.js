"use client";

import { useState } from "react";

import PageHeader from "../../components/pageHeader";
import DonutChart from "../../components/donutChart";
import Category from "../../components/category";
import BudgetCard from "../../components/budgetCard";
import Modal from "../../components/modal";
import { BUDGETS_DATA } from "../../data";
import { AnimatePresence, motion } from "motion/react";

export default function Budgets() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="budgets" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <AnimatePresence>
        {isOpen && (
          <Modal
            title="Add New Budget"
            description="Choose a category to set a spending budget. These categories can help you monitor spending."
            fn={() => setIsOpen(false)}
          >
            <p>Lorem</p>
          </Modal>
        )}
      </AnimatePresence>

      <PageHeader title="Budgets" action="+ Add New Budget" fn={() => setIsOpen(true)} />

      <main className="my-8 flex flex-col lg:grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="card lg:sticky lg:top-6 h-fit col-span-5 flex flex-col md:grid grid-cols-2 lg:flex items-center justify-center gap-12">
          <div className="flex justify-center">
            <DonutChart />
          </div>

          {/* Categories */}
          <div className="w-full">
            <h2 className="card-title">Spending Summary</h2>
            <div className="mt-6 w-full grid gap-4 grid-cols-1">
              {BUDGETS_DATA.map((budget, index) => (
                <Category
                  key={budget.label}
                  color={budget.tagColor}
                  label={budget.label}
                  spending={budget.spending}
                  limit={budget.limit}
                  row={true}
                  className={
                    index !== BUDGETS_DATA.length - 1 &&
                    "pb-4 border-b-1 border-grey-100"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-7 flex flex-col gap-6">
          {BUDGETS_DATA.map((budget, index) => (
            <BudgetCard
              key={budget.label}
              color={budget.tagColor}
              label={budget.label}
              spending={budget.spending}
              limit={budget.limit}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
