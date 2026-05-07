"use client";

import { CaretRight } from "../icons";
import Link from "next/link";
import TransactionItem from "../transactionItem";
import { TransactionsOverviewSkeleton } from "../skeleton/transactions";
import { AnimatePresence, motion } from "motion/react";

export default function Transactions({ transactionsData = [], isLoadingTxs }) {
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
        <AnimatePresence mode="wait">
          {isLoadingTxs ? (
            <TransactionsOverviewSkeleton />
          ) : (
            transactionsData
              ?.slice(0, 4)
              .map((item, index) => (
                <TransactionItem
                  key={item.id}
                  index={index}
                  avatar={item.avatar}
                  name={item.name}
                  type={item.type}
                  amount={item.amount}
                  date={item.date}
                  className={`${
                    index !== 3 && "pb-5 border-b-1 border-grey-100"
                  }`}
                />
              ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
