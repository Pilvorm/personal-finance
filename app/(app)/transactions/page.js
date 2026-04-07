"use client";

import { useState } from "react";
import PageHeader from "../../components/pageHeader";
import Image from "next/image";
import Search from "../../components/search";
import Pagination from "../../components/pagination";
import Dropdown from "../../components/dropdowns/dropdown";
import { SORT_OPTIONS } from "../../data";

import { useQuery } from "@tanstack/react-query";

export default function Transactions() {
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState("All Transactions");

  const { data: transactionsData } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      return res.json();
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      return res.json();
    },
  });

  const categoryOptions = [
    { id: "all", name: "All Transactions" },
    ...(categoriesData ?? []),
  ];

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
              value={selectedCategory}
              setValue={setSelectedCategory}
              options={categoryOptions.map((option) => option.name)}
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
            {transactionsData?.map((item) => {
              const isPositive = Number(item.amount) > 0;

              return (
                <tr
                  key={item.id}
                  className="block md:table-row border-b border-grey-100"
                >
                  {/* Recipient */}
                  <td className="flex items-center justify-between md:table-cell">
                    <div className="flex items-center gap-4">
                      <Image
                        src={`/assets/images/avatars/${item.avatar}`}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="text-sm font-bold">{item.name}</div>

                        {/* Mobile category */}
                        <div className="mt-1 text-xs text-grey-500 md:hidden">
                          {item.categoryName || "General"}
                        </div>
                      </div>
                    </div>

                    {/* Mobile amount + date */}
                    <div className="flex flex-col items-end md:hidden">
                      <div
                        className={`text-sm font-bold ${
                          isPositive && "text-green"
                        }`}
                      >
                        {isPositive ? "+" : "-"}$
                        {Math.abs(Number(item.amount)).toFixed(2)}
                      </div>

                      <span className="mt-1 text-xs text-grey-500">
                        {new Date(item.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Desktop category */}
                  <td className="hidden md:table-cell text-sm text-grey-500">
                    {item.categoryName || "General"}
                  </td>

                  {/* Desktop date */}
                  <td className="hidden md:table-cell text-sm text-grey-500">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Desktop amount */}
                  <td
                    className={`hidden md:table-cell text-sm font-bold text-right ${
                      isPositive && "text-green"
                    }`}
                  >
                    {isPositive ? "+" : "-"}$
                    {Math.abs(Number(item.amount)).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination />
      </main>
    </div>
  );
}
