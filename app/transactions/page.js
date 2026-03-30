"use client";

import { useState } from "react";
import PageHeader from "../components/pageHeader";
import Image from "next/image";
import Search from "../components/search";
import Pagination from "../components/pagination";
import Dropdown from "../components/dropdown";
import { SORT_OPTIONS } from "../data";

const categories = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
];

export default function Transactions() {
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [category, setCategory] = useState(categories[0]);

  return (
    <div id="transactions" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <PageHeader title="Transactions" />

      <main className="card my-8">
        <div className="flex max-md:flex-wrap items-center justify-between gap-6">
          <Search placeholder={"Search transactions"} />

          <div className="flex items-center gap-6">
            {/* Sort */}
            <Dropdown
              label={"Sort by"}
              value={sort}
              setValue={setSort}
              options={SORT_OPTIONS}
              type={"sort"}
            />

            {/* Category */}
            <Dropdown
              label={"Category"}
              value={sort}
              setValue={setSort}
              options={categories}
              type={"filter"}
            />
          </div>
        </div>

        <table id="transactions-table" className="w-full">
          <thead className="max-md:hidden text-grey-500 text-left text-xs">
            <tr>
              <th>Recipient / Sender</th>
              <th>Category</th>
              <th>Transaction Date</th>
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
                  <span className="mt-1 text-xs text-grey-500">
                    19 Aug 2024
                  </span>
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
