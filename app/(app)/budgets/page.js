"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretRight } from "@/app/components/icons";
import PageHeader from "@/app/components/pageHeader";
import DonutChart from "@/app/components/donutChart";
import Category from "@/app/components/category";
import CategoryHeader from "@/app/components/categoryHeader";
import TransactionItem from "@/app/components/transactionItem";
import BudgetModal from "@/app/components/modal/budgetModal";
import ConfirmDelete from "@/app/components/modal/confirmDelete";

import { getColor } from "@/app/lib/helper";
import { formatUSD } from "@/app/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

const BudgetCard = ({
  id,
  theme,
  categoryId,
  name,
  spending,
  max,
  spendingList,
  onEdit,
  onDelete,
}) => {
  const safeSpending = Number(spending ?? 0);
  const safeMax = Number(max ?? 0);

  const percent = Math.min((safeSpending / safeMax) * 100, 100);
  const remaining = Math.max(safeMax - safeSpending, 0);

  const budgetCardAnimation = {
    initial: { opacity: 0, y: -10, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const color = getColor(theme);

  return (
    <motion.div
      layout
      layoutId={id}
      key={id}
      variants={budgetCardAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="card"
    >
      <CategoryHeader
        type={"Budget"}
        theme={theme}
        name={name}
        edit={onEdit}
        del={onDelete}
      />

      {/* Spending and Remaining */}
      <div className="mt-5 flex flex-col gap-4">
        <div className="text-sm text-grey-500">Maximum of {formatUSD(max)}</div>

        {/* Bar */}
        <div className="p-1 w-full h-8 bg-beige-100 rounded-sm">
          <div
            style={{ width: `${percent}%`, backgroundColor: color }}
            className={`h-full rounded-sm`}
          ></div>
        </div>

        <div className="grid grid-cols-2">
          <Category theme={theme} name="Spent" customValue={spending} />
          <Category theme="beige" name="Remaining" customValue={remaining} />
        </div>
      </div>

      {/* Latest Spending */}
      <div className="mt-5 p-5 rounded-xl bg-beige-100">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Latest Spending</h2>
          <Link
            href={`/transactions?sort=latest&category=${categoryId}`}
            className="card-link flex items-center gap-1"
          >
            <span>See All</span>
            <CaretRight />
          </Link>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {spendingList.map((spending, index) => (
            <TransactionItem
              key={spending.id}
              avatar={spending.avatar}
              name={spending.name}
              type={spending.type}
              amount={spending.amount}
              date={spending.date}
              className={`${index !== spendingList.length - 1 && "pb-5 border-b-1 border-grey-100"}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Budgets() {
  const [isOpen, setIsOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { status, data, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const res = await fetch("/api/budgets");

      if (!res.ok) {
        throw new Error("Failed to fetch budgets");
      }

      const json = await res.json();
      return Array.isArray(json) ? json : [];
    },
  });

  const budgets = Array.isArray(data) ? data : [];

  const usedCategories = new Set(budgets.map((c) => c.categoryName));
  const usedThemes = new Set(budgets.map((t) => t.theme));

  return (
    <div id="budgets" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <AnimatePresence>
        {(isOpen || editTarget) && (
          <BudgetModal
            setIsOpen={() => {
              setIsOpen(false);
              setEditTarget(null);
            }}
            editData={editTarget}
            usedCategories={usedCategories}
            usedThemes={usedThemes}
          />
        )}
      </AnimatePresence>

      {/* Delete Budget */}
      <AnimatePresence>
        {deleteTarget && (
          <ConfirmDelete
            type={"budget"}
            id={deleteTarget.id}
            name={deleteTarget.name}
            setIsOpen={() => setDeleteTarget(null)}
          />
        )}
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
            <DonutChart budgetsData={budgets} />
          </div>

          {/* Categories */}
          <div className="w-full">
            <h2 className="card-title">Spending Summary</h2>
            <div className="mt-6 w-full grid gap-4 grid-cols-1">
              {budgets?.map((budget, index) => (
                <Category
                  key={budget.id}
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
            {budgets?.map((budget, index) => (
              <BudgetCard
                key={budget.id}
                id={budget.id}
                theme={budget.theme}
                categoryId={budget.categoryId}
                name={budget.categoryName}
                spending={budget.spending}
                max={budget.max}
                spendingList={budget.transactions}
                onEdit={() => setEditTarget(budget)}
                onDelete={() =>
                  setDeleteTarget({
                    id: budget.id,
                    name: budget.categoryName,
                  })
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
