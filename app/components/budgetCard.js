import Link from "next/link";
import { Ellipsis, CaretRight } from "./icons";
import Category from "./category";
import CategoryHeader from "./categoryHeader";
import TransactionItem from "./transactionItem";

export default function BudgetCard({
  color,
  label,
  spending,
  limit,
  spendingList,
}) {
  const percent = Math.min((spending / limit) * 100, 100);
  const spendingVal = spending.toFixed(2);
  const limitVal = limit.toFixed(2);
  const remaining = Math.max(limitVal - spendingVal, 0).toFixed(2);

  return (
    <div className="card">
      <CategoryHeader color={color} label={label}/>

      {/* Spending and Remaining */}
      <div className="mt-5 flex flex-col gap-4">
        <div className="text-sm text-grey-500">Maximum of ${limitVal}</div>

        {/* Bar */}
        <div className="p-1 w-full h-8 bg-beige-100 rounded-sm">
          <div
            style={{ width: `${percent}%` }}
            className={`h-full bg-${color} rounded-sm`}
          ></div>
        </div>

        <div className="grid grid-cols-2">
          <Category color={color} label="Spent" customValue={spendingVal} />
          <Category color="beige" label="Remaining" customValue={remaining} />
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

        <div className="mt-5">
          <TransactionItem className="pb-5 border-b-1 border-grey-500/15" />
        </div>
      </div>
    </div>
  );
}
