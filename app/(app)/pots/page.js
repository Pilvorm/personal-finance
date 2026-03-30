import PageHeader from "../../components/pageHeader";
import CategoryHeader from "../../components/categoryHeader";
import { POTS_DATA } from "../../data";

const PotsCard = ({ color, label, totalSaved, target }) => {
  const percent = Math.min((totalSaved / target) * 100, 100);
  const savedVal = totalSaved.toFixed(2);
  const targetVal = target.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});;

  return (
    <div className="card flex flex-col gap-6">
      <CategoryHeader color={color} label={label} />

      <div className="">
        <div className="flex items-center justify-between">
          <div className="text-sm text-grey-500">Total Saved</div>
          <div className="text-[32px] font-bold">${savedVal}</div>
        </div>

        <div className="mt-4">
          {/* Bar */}
          <div className="w-full h-2 bg-beige-100 rounded-sm">
            <div
              style={{ width: `${percent}%` }}
              className={`h-full bg-${color} rounded-sm`}
            ></div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-grey-500">
            <div className="font-bold">
              {percent.toFixed(1)}%
            </div>
            <div className="">Target of {targetVal}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="hover-basic cursor-pointer p-4 text-sm font-bold bg-beige-100 rounded-lg">
          + Add Money
        </button>
        <button className="hover-basic cursor-pointer p-4 text-sm font-bold bg-beige-100 rounded-lg">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default function Pots() {
  return (
    <div id="pots" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <PageHeader title="Pots" action="+ Add New Pots" />

      <main className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {POTS_DATA.map((pot) => (
          <PotsCard
            key={pot.label}
            color={pot.color}
            label={pot.label}
            totalSaved={pot.totalSaved}
            target={pot.target}
          />
        ))}
      </main>
    </div>
  );
}
