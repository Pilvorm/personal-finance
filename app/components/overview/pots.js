import { CaretRight, PotsIconGreen } from "../icons";
import Link from "next/link";
import Category from "../category";
import { POTS_DATA } from "../../data";

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

      <div className="mt-5 flex gap-5 flex-col sm:flex-row flex-wrap">
        {/* Left */}
        <div className="flex-1 p-4 flex items-center gap-4 bg-beige-100 rounded-xl">
          <div className="w-10 h-10">
            <PotsIconGreen className={"mx-auto"} />
          </div>
          <div>
            <h3 className="text-grey-500">Total Saved</h3>
            <div className="mt-2 text-[32px] text-grey-900 font-bold">$850</div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {POTS_DATA.slice(0, 4).map((pot) => (
            <Category
              key={pot.label}
              theme={pot.color}
              name={pot.label}
              customValue={pot.totalSaved}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
