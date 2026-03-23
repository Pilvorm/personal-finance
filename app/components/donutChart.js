import { BUDGETS_DATA } from "../data";

export default function DonutChart() {
  const total = BUDGETS_DATA.reduce((acc, item) => acc + item.limit, 0);

  let current = 0;

  const gradient = BUDGETS_DATA
    .map((item) => {
      const start = current;
      const percent = (item.limit / total) * 100;
      current += percent;
      return `${item.color} ${start}% ${current}%`;
    })
    .join(", ");

  return (
    <div
      className="donut flex items-center justify-center"
      style={{ "--segments": gradient }}
    >
      <div className="z-10 text-center">
        <div className="text-[32px] font-bold">$338</div>
        <span className="mt-2 block text-sm text-grey-500">of $975 limit</span>
      </div>
    </div>
  );
}
