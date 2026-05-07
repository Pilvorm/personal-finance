"use client";

import { getColor } from "../lib/helper";
import { formatUSD } from "../lib/helper";
import { motion } from "motion/react";

export default function Category({
  index = 0,
  theme,
  name,
  max,
  customValue,
  row,
  spending,
  className,
}) {
  const color = getColor(theme);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-center gap-4 ${className || ""}`}
    >
      <div
        style={{ backgroundColor: color }}
        className={`min-w-1 h-full rounded-lg`}
      />

      <div
        className={`flex gap-1 ${row ? "w-full flex-col items-start xl:flex-row xl:items-center justify-between" : "flex-col"}`}
      >
        <h3 className="text-grey-500">{name}</h3>
        {spending ? (
          <div className="flex items-center gap-2">
            <div className="font-bold">{formatUSD(spending)}</div>
            <div className="text-xs text-grey-500">of {formatUSD(max)}</div>
          </div>
        ) : (
          <div className="text-sm font-bold">{formatUSD(customValue, 0)}</div>
        )}
      </div>
    </motion.div>
  );
}
