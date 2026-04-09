const colorMap = {
  /* Primary palette */
  green: "bg-green",
  yellow: "bg-yellow",
  cyan: "bg-cyan",
  navy: "bg-navy",
  red: "bg-red",
  purple: "bg-purple",
  beige: "bg-beige-100",

  /* Other colors */
  "purple-light": "bg-purple-light",
  turquoise: "bg-turquoise",
  brown: "bg-brown",
  magenta: "bg-magenta",
  blue: "bg-blue",
  "navy-grey": "bg-navy-grey",
  army: "bg-army",
  gold: "bg-gold",
  orange: "bg-orange",
};

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

  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <div className={`min-w-1 h-full rounded-lg ${colorMap[theme]}`} />

      <div
        className={`flex gap-1 ${row ? "w-full items-center justify-between" : "flex-col"}`}
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
