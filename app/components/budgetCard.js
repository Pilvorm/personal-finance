import Link from "next/link";
import { CaretRight } from "./icons";
import Category from "./category";
import CategoryHeader from "./categoryHeader";
import TransactionItem from "./transactionItem";

export default function BudgetCard({
  theme,
  category,
  spending,
  max,
  spendingList,
}) {

  const percent = Math.min((spending / Number(max)) * 100, 100);
  const spendingVal = spending.toFixed(2);
  const maxVal = Number(max).toFixed(2);
  const remaining = Math.max(maxVal - spendingVal, 0).toFixed(2);

  return (
    <div className="card">
      <CategoryHeader theme={theme} category={category} />

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
    </div>
  );
}
