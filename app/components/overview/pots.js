"use client";

import { CaretRight, PotsIconGreen } from "../icons";
import Link from "next/link";
import Category from "../category";
import CategorySkeleton from "../skeleton/category";

import { useQuery } from "@tanstack/react-query";
import { formatUSD } from "@/app/lib/helper";
import { AnimatePresence } from "motion/react";

export default function Pots() {
  const { data, isLoading } = useQuery({
    queryKey: ["pots"],
    queryFn: async () => {
      const res = await fetch("/api/pots");
      return res.json();
    },
  });

  const potsData = data?.data;
  const grandTotalSaved = data?.grandTotalSaved ?? 0;

  return (
    <div id="pots-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Pots</h2>
        <Link href="/pots" className="card-link">
          <span>See Details</span>
          <CaretRight />
        </Link>
      </div>

      <div className="mt-5 flex gap-5 flex-col sm:flex-row flex-wrap">
        {/* Left */}
        <div className="flex-1 p-4 flex items-center gap-4 bg-beige-100 rounded-xl">
          <div className="w-10 h-10">
            <PotsIconGreen className={"mx-auto"} />
          </div>
          <div>
            <h3 className="text-grey-500">Total Saved</h3>
            <div className="mt-2 text-[32px] text-grey-900 font-bold">
              {formatUSD(grandTotalSaved, 0)}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <CategorySkeleton />
            ) : (
              potsData
                ?.slice(0, 4)
                .map((pot, index) => (
                  <Category
                    index={index}
                    key={pot.name}
                    theme={pot.theme}
                    name={pot.name}
                    customValue={pot.totalSaved}
                  />
                ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
