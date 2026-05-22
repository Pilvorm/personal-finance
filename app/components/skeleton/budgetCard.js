import CategorySkeleton from "./category";

export default function BudgetCardSkeleton() {
  return (
    <div className="card">
      <div className="animate-pulse">
        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 bg-grey-100 rounded-full`}></div>
          {/* Card Name */}
          <div className="w-34 h-7 bg-grey-100 rounded-sm" />
        </div>

        {/* Spending and Remaining */}
        <div className="mt-5 flex flex-col gap-4">
          {/* Maximum */}
          <div className="w-30 h-5 bg-grey-100 rounded-sm" />

          {/* Bar */}
          <div className="p-1 w-full h-8 bg-beige-100 rounded-sm"></div>

          {/* Comparison */}
          <div className="grid grid-cols-2">
            <CategorySkeleton itemAmount={2} />
          </div>
        </div>

        {/* Latest Spending */}
        <div className="mt-5 h-[204px] rounded-xl bg-beige-100"></div>
      </div>
    </div>
  );
}
