"use client";

import { CaretRight } from "../icons";
import Link from "next/link";
import Category from "../category";
import DonutChart from "../donutChart";
import { BUDGETS_DATA } from "../../data";
import { useQuery } from "@tanstack/react-query";

export default function Budgets() {
  const { status, data, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const res = await fetch("/api/budgets");
      return res.json();
    },
  });

  return (
    <div id="budgets-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Budgets</h2>
        <Link href="/" className="card-link flex items-center gap-1">
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
          {data?.map((budget) => (
            <Category
              key={budget.categoryName}
              theme={budget.theme}
              name={budget.categoryName}
              customValue={budget.max}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
