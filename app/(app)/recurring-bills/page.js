"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { BillPaid, BillDue } from "@/app/components/icons";
import PageHeader from "@/app/components/pageHeader";
import Search from "@/app/components/search";
import { RecurringBillsOutline } from "@/app/components/icons";
import Dropdown from "@/app/components/dropdowns/dropdown";
import { SORT_OPTIONS } from "@/app/data";
import { useDebounce, formatUSD, buildQueryParams } from "@/app/lib/helper";
import { getOrdinal } from "@/app/lib/helper";

import { useQuery } from "@tanstack/react-query";

function getBillStatus(dueDay) {
  const today = new Date().getDate();

  if (today > dueDay) return "paid";
  if (dueDay - today <= 3) return "due";
  return "upcoming";
}

export default function RecurringBills() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSort = searchParams.get("sort") || "latest";
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const [selectedSort, setSelectedSort] = useState(
    SORT_OPTIONS.find((opt) => opt.value === initialSort) || SORT_OPTIONS[0],
  );

  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: billsData, isFetching } = useQuery({
    queryKey: [
      "recurring-bills",
      {
        sort: selectedSort.value,
        search: debouncedSearch,
      },
    ],
    queryFn: async () => {
      const params = buildQueryParams({
        sort: selectedSort.value,
        search: debouncedSearch,
      });

      const res = await fetch(`/api/recurring-bills?${params}`);
      return res.json();
    },
  });

  useEffect(() => {
    const params = buildQueryParams({
      sort: selectedSort.value,
      search: debouncedSearch,
    });

    router.replace(`/recurring-bills?${params}`);
  }, [selectedSort, debouncedSearch, router]);

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
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search bills"
            />

            <div className="flex items-center gap-6">
              {/* Sort */}
              <Dropdown
                label="Sort by"
                value={selectedSort}
                setValue={setSelectedSort}
                options={SORT_OPTIONS}
                type="sort"
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
              {billsData?.map((item) => {
                const status = getBillStatus(item.dueDate);
                const dateColor =
                  status == "paid"
                    ? "text-green"
                    : status == "due"
                      ? "text-red"
                      : "text-grey-500";

                return (
                  <tr
                    key={item.id}
                    className="block md:table-row border-b border-grey-100"
                  >
                    {/* Recipient */}
                    <td className="flex items-end md:items-center justify-between md:table-cell">
                      <div>
                        <div className="flex items-center gap-4">
                          <Image
                            src={`/assets/images/avatars/${item.avatar}`}
                            alt={item.title}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />

                          <div className="text-sm font-bold">{item.title}</div>
                        </div>
                        <div
                          className={`mt-2 text-xs md:hidden flex gap-2 ${dateColor}`}
                        >
                          Monthly-{getOrdinal(item.dueDate)}
                          {status == "paid" ? (
                            <BillPaid />
                          ) : (
                            status == "due" && <BillDue />
                          )}
                        </div>
                      </div>

                      {/* Amount + date (mobile) */}
                      <div className="md:hidden text-sm font-bold">
                        {formatUSD(item.amount)}
                      </div>
                    </td>

                    {/* Desktop-only columns */}
                    <td className={`hidden md:table-cell text-xs ${dateColor}`}>
                      <div className="flex items-center gap-2">
                        Monthly-{getOrdinal(item.dueDate)}
                        {status == "paid" ? (
                          <BillPaid />
                        ) : (
                          status == "due" && <BillDue />
                        )}
                      </div>
                    </td>

                    <td
                      className={`hidden md:table-cell text-sm font-bold text-right ${status == "due" && "text-red"}`}
                    >
                      {formatUSD(item.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
