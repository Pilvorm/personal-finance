"use client";

import { useMemo } from "react";
import { CaretRight } from "../icons";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBillsSummary, formatUSD } from "@/app/lib/helper";

export default function RecurringBills() {
  const { data: billsData, isFetching } = useQuery({
    queryKey: ["recurring-bills"],
    queryFn: async () => {
      const res = await fetch(`/api/recurring-bills`);
      return res.json();
    },
  });

  const summary = useMemo(() => getBillsSummary(billsData), [billsData]);

  return (
    <div id="recurring-bills-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Recurring Bills</h2>
        <Link href="/recurring-bills" className="card-link">
          <span>See Details</span>
          <CaretRight />
        </Link>
      </div>

      <div className="mt-5">
        <div className="w-full px-4 py-5 flex items-center justify-between bg-beige-100 rounded-xl border-l-5 border-green">
          <h3 className="text-sm text-grey-500">Paid Bills</h3>
          <div className="text-sm font-bold">{formatUSD(summary.paid.total)}</div>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full px-4 py-5 flex items-center justify-between bg-beige-100 rounded-xl border-l-5 border-yellow">
          <h3 className="text-sm text-grey-500">Total Upcoming</h3>
          <div className="text-sm font-bold">{formatUSD(summary.upcoming.total)}</div>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full px-4 py-5 flex items-center justify-between bg-beige-100 rounded-xl border-l-5 border-cyan">
          <h3 className="text-sm text-grey-500">Due Soon</h3>
          <div className="text-sm font-bold">{formatUSD(summary.due.total)}</div>
        </div>
      </div>
    </div>
  );
}
