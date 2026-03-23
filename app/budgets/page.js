import DonutChart from "../components/donutChart";
import Category from "../components/category";
import { BUDGETS_DATA } from "../data";

export default function Budgets() {
  return (
    <div id="budgets" className="px-4 pt-8 pb-24 md:px-10 md:py-8">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Budgets</h1>
        <button className="p-4 bg-grey-900 rounded-lg text-white text-sm font-bold">
          + Add New Budget
        </button>
      </div>

      <main className="my-8 flex flex-col lg:grid grid-cols-12 gap-6">
        <div className="card col-span-5 flex flex-col md:grid grid-cols-2 lg:flex items-center justify-center gap-12">
          <div className="flex justify-center">
            <DonutChart />
          </div>

          {/* Categories */}
          <div className="w-full">
            <h2 className="card-title">Spending Summary</h2>
            <div className="mt-6 w-full grid gap-4 grid-cols-1">
              {BUDGETS_DATA.map((budget, index) => (
                <Category
                  key={budget.label}
                  color={budget.tagColor}
                  label={budget.label}
                  limit={budget.limit}
                  row={true}
                  className={
                    index !== BUDGETS_DATA.length - 1 &&
                    "pb-4 border-b-1 border-grey-100"
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-7">
            <div className="card">

            </div>
        </div>
      </main>
    </div>
  );
}
