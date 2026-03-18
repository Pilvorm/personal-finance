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
        <Link href="/" className="card-link flex items-center gap-1">
          <span>See Details</span>
          <CaretRight />
        </Link>
      </div>

      {/* Content */}
      <div className="mt-5 grid gap-8 items-center grid-cols-1 sm:grid-cols-[3fr_1fr] xl:grid-cols-[3fr_2fr]">
        
        {/* Chart */}
        <div className="flex justify-center">
          <div
            className="donut flex items-center justify-center"
            style={{ "--segments": gradient }}
          >
            <div className="z-10 text-center">
              <div className="text-[32px] font-bold">$338</div>
              <span className="mt-2 block text-sm text-grey-500">
                of $975 limit
              </span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1">
          {budgetsData.map((budget) => (
            <Category
              key={budget.label}
              color={budget.tagColor}
              label={budget.label}
              amount={budget.amount}
            />
          ))}
        </div>

      </div>
    </div>
  );
}