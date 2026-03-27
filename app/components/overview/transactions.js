import { CaretRight } from "../icons";
import Link from "next/link";
import Image from "next/image";
import TransactionItem from "../transactionItem";

export default function Transactions() {
  return (
    <div id="transactions-card" className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Transactions</h2>
        <Link href="/" className="card-link">
          <span>View All</span>
          <CaretRight />
        </Link>
      </div>

      <div className="mt-5">
        <TransactionItem className="pb-5 border-b-1 border-grey-100" />
      </div>
    </div>
  );
}
