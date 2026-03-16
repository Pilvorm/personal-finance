import { CaretRight, PotsIconGreen } from "./icons";
import Link from "next/link";

const potsList = [
  {
    id: "savings",
    label: "Savings",
    amount: 159,
    color: "bg-green",
  },
  {
    id: "gift",
    label: "Gift",
    amount: 40,
    color: "bg-cyan",
  },
  {
    id: "concert-ticket",
    label: "Concert Ticket",
    amount: 110,
    color: "bg-navy",
  },
  {
    id: "new-laptop",
    label: "New Laptop",
    amount: 10,
    color: "bg-yellow",
  },
];

export default function Pots() {
  return (
    <div id="pots-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Pots</h2>
        <Link href="/" className="card-link">
          <span>See Details</span>
          <CaretRight />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        {/* Left */}
        <div className="p-4 flex items-center gap-4 bg-beige-100 rounded-xl">
          <div className="w-10 h-10">
            <PotsIconGreen className={"mx-auto"} />
          </div>
          <div>
            <h3 className="text-grey-500">Total Saved</h3>
            <div className="mt-2 text-[32px] text-grey-900 font-bold">$850</div>
          </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-4">
          {potsList.map((pot) => (
            <div key={pot.id} className="pots-category flex items-center gap-4">
              <div className={`w-[4px] h-full rounded-lg ${pot.color}`} />

              <div>
                <h3 className="text-grey-500">{pot.label}</h3>
                <div className="mt-1 text-sm font-bold">${pot.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
