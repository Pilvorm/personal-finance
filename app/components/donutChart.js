import { getColor } from "../lib/helper";

export default function DonutChart({ budgetsData = [] }) {
  const total = budgetsData.reduce((acc, item) => acc + Number(item.max), 0);

  const totalSpent = budgetsData.reduce((acc, item) => acc + item.spending, 0);

  let current = 0;

  const gradient = budgetsData
    .map((item) => {
      const start = current;
      const percent = (Number(item.max) / total) * 100;
      current += percent;

      return `${getColor(item.theme)} ${start}% ${current}%`;
    })
    .join(", ");

  return (
    <div
      className="donut flex items-center justify-center"
      style={{ "--segments": gradient }}
    >
      <div className="z-10 text-center">
        <div className="text-[32px] font-bold">${totalSpent}</div>
        <span className="mt-2 block text-sm text-grey-500">
          of ${total} limit
        </span>
      </div>
    </div>
  );
}
