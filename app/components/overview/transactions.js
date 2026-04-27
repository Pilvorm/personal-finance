"use client";

import { CaretRight } from "../icons";
import Link from "next/link";
import Image from "next/image";
import TransactionItem from "../transactionItem";
import { useQuery } from "@tanstack/react-query";

export default function Transactions() {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch(`/api/transactions`);
      return res.json();
    },
    staleTime: 1000 * 60,
  });

  const transactionsData = data?.data;
  console.log(transactionsData);

  return (
    <div id="transactions-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Transactions</h2>
        <Link href="/transactions" className="card-link">
          <span>View All</span>
          <CaretRight />
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {transactionsData?.slice(0, 4).map((item, index) => (
          <TransactionItem
            key={item.id}
            avatar={item.avatar}
            name={item.name}
            amount={item.amount}
            date={item.date}
            className={`${index !== 3 && "pb-5 border-b-1 border-grey-100"}`}
          />
        ))}
      </div>
    </div>
  );
}
