"use client";

import { CaretRight } from "../icons";
import Link from "next/link";
import Category from "../category";
import DonutChart from "../donutChart";
import CategorySkeleton from "../skeleton/category";

import { groupBudgets } from "@/app/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";

export default function Budgets() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const res = await fetch("/api/budgets");
      return res.json();
    },
    select: (data) => groupBudgets(data, 4),
  });

  return (
    <div id="budgets-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Budgets</h2>
        <Link
          href="/budgets"
          className="card-link flex items-center gap-1 hover:underline"
        >
          <span>See Details</span>
          <CaretRight />
        </Link>
      </div>

      {/* Content */}
      <div className="mt-5 grid gap-8 items-center grid-cols-1 sm:grid-cols-[3fr_1.5fr] lg:flex justify-center flex-wrap xl:grid xl:grid-cols-[3fr_2fr]">
        {/* Chart */}
        <div className="flex justify-center">
          <DonutChart budgetsData={data} />
        </div>

        {/* Categories */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <CategorySkeleton />
            ) : data?.length > 0 ? (
              data.map((budget, index) => (
                <Category
                  index={index}
                  key={budget.id}
                  theme={budget.theme}
                  name={budget.categoryName}
                  customValue={budget.max}
                />
              ))
            ) : (
              <div className={`flex items-center gap-4`}>
                <div className={`min-w-1 h-full bg-beige-100 rounded-lg`} />

                <div
                  className={`flex gap-1 w-full flex-col items-start xl:flex-row xl:items-center justify-between`}
                >
                  <h3 className="text-sm text-grey-500">
                    Create a budget to start tracking
                  </h3>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
