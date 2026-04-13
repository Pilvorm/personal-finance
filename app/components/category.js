import { getColor } from "../lib/helper";

export default function Category({
  theme,
  name,
  max,
  customValue,
  row,
  spending,
  className,
}) {
  const spendingVal = spending?.toFixed(2);
  const maxVal = Number(max)?.toFixed(2);
  const customVal = Number(customValue)?.toFixed(2);
  const color = getColor(theme);

  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <div
        style={{ backgroundColor: color }}
        className={`min-w-1 h-full rounded-lg`}
      />

      <div
        className={`flex gap-1 ${row ? "w-full flex-col items-start xl:flex-row xl:items-center justify-between" : "flex-col"}`}
      >
        <h3 className="text-grey-500">{name}</h3>
        {spending ? (
          <div className="flex items-center gap-2">
            <div className="font-bold">${spendingVal}</div>
            <div className="text-xs text-grey-500">of ${maxVal}</div>
          </div>
        ) : (
          <div className="text-sm font-bold">${customVal}</div>
        )}
      </div>
    </div>
  );
}
