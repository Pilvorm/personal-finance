"use client";

import { useState } from "react";
import Image from "next/image";
import PageHeader from "../../components/pageHeader";
import { RecurringBillsOutline } from "../../components/icons";
import Search from "../../components/search";
import Dropdown from "../../components/dropdowns/dropdown";
import { SORT_OPTIONS } from "../../data";

export default function RecurringBills() {
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  return (
    <div id="recurringBills" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <PageHeader title="Recurring Bills" />

      <main className="my-8 flex flex-col lg:grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-4">
          <div className="p-6 flex flex-col gap-8 text-white bg-grey-900 rounded-xl">
            <RecurringBillsOutline />
            <div>
              <div>Total Bills</div>
              <div className="mt-3 text-[32px] font-bold">$384.98</div>
            </div>
          </div>

          <div className="card mt-6">
            <h2 className="card-title">Summary</h2>
            <div className="mt-5">
              <div className="pb-4 flex items-center justify-between border-b border-grey-100">
                <div className="text-grey-500">Paid Bills</div>
                <div className="font-bold">4 ($190.00)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-8 card h-fit">
          <div className="flex max-md:flex-wrap items-center justify-between gap-6">
            <Search placeholder={"Search bills"} />

            <div className="flex items-center gap-6">
              {/* Sort */}
              <Dropdown
                label={"Sort by"}
                value={sort}
                setValue={setSort}
                options={SORT_OPTIONS}
                type={"sort"}
              />
            </div>
          </div>

          <table id="transactions-table" className="w-full">
            <thead className="max-md:hidden text-grey-500 text-left text-xs">
              <tr>
                <th>Bill Title</th>
                <th>Due Date</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>

            <tbody className="">
              <tr className="block md:table-row border-b border-grey-100">
                {/* Recipient */}
                <td className="flex items-end md:items-center justify-between md:table-cell">
                  <div>
                    <div className="flex items-center gap-4">
                      <Image
                        src="/assets/images/avatars/emma-richardson.jpg"
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />

                      <div className="text-sm font-bold">Emma Richardson</div>
                    </div>
                    <div className="mt-2 text-xs text-grey-500 md:hidden">
                      Monthly-1st
                    </div>
                  </div>

                  {/* Amount + date (mobile) */}
                  <div className="md:hidden text-sm text-green font-bold">
                    $100.00
                  </div>
                </td>

                {/* Desktop-only columns */}
                <td className="hidden md:table-cell text-xs text-grey-500">
                  Monthly-1st
                </td>

                <td className="hidden md:table-cell text-sm font-bold text-green text-right">
                  $100.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
