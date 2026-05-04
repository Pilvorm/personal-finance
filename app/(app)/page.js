"use client";

import PageHeader from "../components/pageHeader";
import Summary from "../components/overview/summary";
import Pots from "../components/overview/pots";
import Transactions from "../components/overview/transactions";
import Budgets from "../components/overview/budgets";
import RecurringBills from "../components/overview/recurringBills";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      return res.json();
    },
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch(`/api/transactions`);
      return res.json();
    },
    staleTime: 1000 * 60,
  });

  const transactionsData = transactions?.data;
  const transactionSummary = transactions?.summary;

  return (
    <div id="overview" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <PageHeader title="Overview" />
      <Summary
        balance={userData?.balance}
        transactionSummary={transactionSummary}
      />

      <main className="flex flex-col md:flex-row flex-wrap lg:grid grid-cols-12 gap-6">
        {/* left */}
        <div className="w-full col-span-7 flex flex-col gap-6">
          <Pots />
          <Transactions transactionsData={transactionsData} />
        </div>

        <div className="w-full col-span-5 flex flex-col gap-6">
          <Budgets />
          <RecurringBills />
        </div>
      </main>
    </div>
  );
}
