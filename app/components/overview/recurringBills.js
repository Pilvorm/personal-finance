import { CaretRight } from "../icons";
import Link from "next/link";

export default function RecurringBills() {
  return (
    <div
      id="recurring-bills-card"
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Recurring Bills</h2>
        <Link href="/" className="card-link">
          <span>See Details</span>
          <CaretRight/>
        </Link>
      </div>

      <div className="mt-5">
        <div className="w-full px-4 py-5 flex items-center justify-between bg-beige-100 rounded-xl border-l-5 border-green">
            <h3 className="text-sm text-grey-500">Paid Bills</h3>
            <div className="text-sm font-bold">$190.00</div>
        </div>
      </div>
    </div>
  );
}
