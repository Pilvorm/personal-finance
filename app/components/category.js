export default function Category({ color, label, amount }) {
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
    <div className="pots-category flex items-center gap-4">
      <div className={`min-w-[4px] h-full rounded-lg ${colorMap[color]}`} />

      <div>
        <h3 className="text-grey-500">{label}</h3>
        <div className="mt-1 text-sm font-bold">${amount}</div>
      </div>
    </div>
  );
}
