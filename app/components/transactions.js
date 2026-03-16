import { CaretRight } from "./icons";
import Link from "next/link";
import Image from "next/image";

export default function Transactions() {
  return (
    <div
      id="transactions-card"
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="card-title">Transactions</h2>
        <Link href="/" className="card-link">
          <span>View All</span>
          <CaretRight />
        </Link>
      </div>

      <div className="mt-5">

        {/* Transaction Item */}
        <div className="pb-5 flex items-center justify-between border-b-1 border-grey-100">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/images/avatars/emma-richardson.jpg"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-bold">Emma Richardson</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-green font-bold">+$75.50</div>
            <span className="text-xs text-grey-500">19 Aug 2024</span>
          </div>
        </div>

      </div>
    </div>
  );
}
