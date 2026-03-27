import { CaretRight } from "../icons";
import Link from "next/link";
import Category from "../category";
import DonutChart from "../donutChart";
import { BUDGETS_DATA } from "../../data";

export default function Budgets() {
  return (
    <div id="budgets-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Budgets</h2>
        <Link href="/" className="card-link flex items-center gap-1">
          <span>See Details</span>
          <CaretRight/>
        </Link>
      </div>

      {/* Content */}
      <div className="mt-5 grid gap-8 items-center grid-cols-1 sm:grid-cols-[3fr_1.5fr] lg:flex justify-center flex-wrap xl:grid xl:grid-cols-[3fr_2fr]">
        
        {/* Chart */}
        <div className="flex justify-center">
          <DonutChart />
        </div>

        {/* Categories */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
          {BUDGETS_DATA.map((budget) => (
            <Category
              key={budget.label}
              color={budget.tagColor}
              label={budget.label}
              limit={budget.limit}
            />
          ))}
        </div>

      </div>
    </div>
  );
}