"use client";

import Image from "next/image";
import { formatUSD } from "../lib/helper";
import { motion } from "motion/react";

export default function TransactionItem({
  index,
  avatar,
  name,
  type,
  amount,
  date,
  className,
}) {
  const isPositive = type === "income";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={`/assets/images/avatars/${avatar}`}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm font-bold">{name}</span>
      </div>
      <div className="flex flex-col items-end">
        <div className={`text-sm font-bold ${isPositive && "text-green"}`}>
          {isPositive ? "+" : "-"}
          {formatUSD(amount)}
        </div>
        <span className="mt-1 text-xs text-grey-500">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </motion.div>
  );
}
