import { CaretRight } from "./icons";
import Link from "next/link";
import Category from "./category";

const budgetsData = [
  { label: "Entertainment", amount: 50, color: "#2F7F73", tagColor: "green" },
  { label: "Bills", amount: 750, color: "#7DB9C8", tagColor: "cyan" },
  { label: "Dining", amount: 75, color: "#E6C29F", tagColor: "yellow" },
  { label: "Personal", amount: 100, color: "#6B6A77", tagColor: "navy" },
];

export default function Budgets() {
  const total = budgetsData.reduce((acc, item) => acc + item.amount, 0);

  let current = 0;

  const gradient = budgetsData
    .map((item) => {
      const start = current;
      const percent = (item.amount / total) * 100;
      current += percent;
      return `${item.color} ${start}% ${current}%`;
    })
    .join(", ");

  return (
    <div id="budgets-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Budgets</h2>
        <Link href="/" className="card-link">
          <span>See Details</span>
          <CaretRight />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-[3fr_2fr] justify-between gap-8">
        {/* Chart */}
        <div
          className="donut flex items-center justify-center"
          style={{ "--segments": gradient }}
        >
          <div className="z-10">
            <div className="text-[32px] font-bold">$338</div>
            <span className="mt-2 text-sm text-grey-500">of $975 limit</span>
          </div>
        </div>

        {/* Legend/Categories */}
        <div className="flex flex-col gap-4 justify-center">
            {budgetsData.map((budget) => (
                <Category key={budget.label} color={budget.tagColor} label={budget.label} amount={budget.amount}/>
            ))}
        </div>
      </div>
    </div>
  );
}
