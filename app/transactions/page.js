import Image from "next/image";
import Search from "../components/search";
import Pagination from "../components/pagination";

export default function Transactions() {
  return (
    <div id="transactions" className="px-4 pt-8 pb-24 md:px-10 md:py-8">
      <h1 className="page-title">Transactions</h1>
      <main className="card my-8">
        <Search placeholder={"Search transactions"} />

        <table id="transaction-table" className="w-full">

          <thead className="max-md:hidden text-grey-500 text-left text-xs">
            <tr>
              <th >Recipient / Sender</th>
              <th >Category</th>
              <th >Transaction Date</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody className="">
            <tr className="block md:table-row border-b border-grey-100">
              {/* Recipient */}
              <td className="flex items-center justify-between md:table-cell">
                <div className="flex items-center gap-4">
                  <Image
                    src="/assets/images/avatars/emma-richardson.jpg"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm font-bold">Emma Richardson</div>
                    {/* Category shown only on mobile */}
                    <div className="mt-1 text-xs text-grey-500 md:hidden">
                      General
                    </div>
                  </div>
                </div>

                {/* Amount + date (mobile) */}
                <div className="flex flex-col items-end md:hidden">
                  <div className="text-sm text-green font-bold">+$75.50</div>
                  <span className="mt-1 text-xs text-grey-500">19 Aug 2024</span>
                </div>
              </td>

              {/* Desktop-only columns */}
              <td className="hidden md:table-cell text-sm text-grey-500">
                General
              </td>

              <td className="hidden md:table-cell text-sm text-grey-500">
                19 Aug 2024
              </td>

              <td className="hidden md:table-cell text-sm font-bold text-green text-right">
                +$75.50
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </main>
    </div>
  );
}
