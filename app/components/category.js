export default function Category({ color, label, limit, row, spending, className }) {
  const colorMap = {
    /* Primary palette */
    green: "bg-green",
    yellow: "bg-yellow",
    cyan: "bg-cyan",
    navy: "bg-navy",
    red: "bg-red",
    purple: "bg-purple",

    /* Other colors */
    "purple-light": "bg-purple-light",
    turquoise: "bg-turquoise",
    brown: "bg-brown",  
    magenta: "bg-magenta",
    blue: "bg-blue",
    "navy-grey": "bg-navy-grey",
    "army-green": "bg-army-green",
    gold: "bg-gold",
    orange: "bg-orange",
  };

  return (
    <div className={`pots-category flex items-center gap-4 ${className || ""}`}>
      <div className={`min-w-[4px] h-full rounded-lg ${colorMap[color]}`} />

      <div className={`flex gap-1 ${row ? "w-full items-center justify-between" : "flex-col"}`}>
        <h3 className="text-grey-500">{label}</h3>
        <div className="text-sm font-bold">${limit}</div>
      </div>
    </div>
  );
}
