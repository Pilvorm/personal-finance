"use client";

import { useEffect, useState } from "react";

import { getColor } from "../lib/helper";
import { motion, useMotionValue, animate } from "framer-motion";

const fallbackData = [
  {
    max: 1,
    spending: 0,
    theme: "beige",
  },
];

export default function DonutChart({ budgetsData = [] }) {
  const isEmpty = budgetsData.length === 0;
  const data = isEmpty ? fallbackData : budgetsData;

  const total = budgetsData.reduce((acc, item) => acc + Number(item.max), 0);
  const totalSpent = budgetsData.reduce(
    (acc, item) => acc + Number(item.spending),
    0,
  );

  const progress = useMotionValue(0);
  const [renderProgress, setRenderProgress] = useState(0);

  useEffect(() => {
    progress.set(0);

    const controls = animate(progress, 100, {
      duration: 1.5,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    });

    const unsubscribe = progress.on("change", (v) => {
      setRenderProgress(v);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [budgetsData]);

  let current = 0;

  const gradient = data
    .map((budget) => {
      const start = current;
      const percent =
        (Number(budget.max) / data.reduce((a, i) => a + Number(i.max), 0)) *
        renderProgress;
      current += percent;

      return `${getColor(budget.theme)} ${start}% ${current}%`;
    })
    .join(", ");

  return (
    <div
      className="donut flex items-center justify-center"
      style={{ "--segments": gradient }}
    >
      <div className="z-10 text-center">
        <div className="text-[32px] font-bold">${totalSpent}</div>
        <span className="mt-2 block text-sm text-grey-500">
          of ${isEmpty ? 0 : total} limit
        </span>
      </div>
    </div>
  );
}
