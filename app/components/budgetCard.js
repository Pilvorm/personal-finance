import Link from "next/link";
import { CaretRight } from "./icons";
import Category from "./category";
import CategoryHeader from "./categoryHeader";
import TransactionItem from "./transactionItem";
import { AnimatePresence, motion } from "motion/react";

export default function BudgetCard({
  id,
  theme,
  name,
  spending,
  max,
  spendingList,
  onDelete,
}) {
  const safeSpending = Number(spending ?? 0);
  const safeMax = Number(max ?? 0);

  const percent = Math.min((safeSpending / safeMax) * 100, 100);
  const spendingVal = safeSpending.toFixed(2);
  const maxVal = safeMax.toFixed(2);
  const remaining = Math.max(safeMax - safeSpending, 0).toFixed(2);

  const budgetCardAnimation = {
    initial: { opacity: 0, y: -10, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      layout
      layoutId={id}
      key={id}
      variants={budgetCardAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="card"
    >
      <CategoryHeader
        type={"Budget"}
        theme={theme}
        name={name}
        del={onDelete}
      />

      {/* Spending and Remaining */}
      <div className="mt-5 flex flex-col gap-4">
        <div className="text-sm text-grey-500">Maximum of ${maxVal}</div>

        {/* Bar */}
        <div className="p-1 w-full h-8 bg-beige-100 rounded-sm">
          <div
            style={{ width: `${percent}%` }}
            className={`h-full bg-${theme} rounded-sm`}
          ></div>
        </div>

        <div className="grid grid-cols-2">
          <Category theme={theme} name="Spent" customValue={spendingVal} />
          <Category theme="beige" name="Remaining" customValue={remaining} />
        </div>
      </div>

      {/* Latest Spending */}
      <div className="mt-5 p-5 rounded-xl bg-beige-100">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Latest Spending</h2>
          <Link href="/" className="card-link flex items-center gap-1">
            <span>See All</span>
            <CaretRight />
          </Link>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {spendingList.map((spending, index) => (
            <TransactionItem
              key={spending.id}
              avatar={spending.avatar}
              name={spending.name}
              amount={spending.amount}
              date={spending.date}
              className={`${index !== spendingList.length - 1 && "pb-5 border-b-1 border-grey-500/15"}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
