"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/pageHeader";
import Search from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import Dropdown from "@/app/components/dropdowns/dropdown";
import { SORT_OPTIONS } from "@/app/data";
import { useDebounce, formatUSD, buildQueryParams } from "@/app/lib/helper";

import { useQuery } from "@tanstack/react-query";

export default function Transactions() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSort = searchParams.get("sort") || "latest";
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const [selectedSort, setSelectedSort] = useState(
    SORT_OPTIONS.find((opt) => opt.value === initialSort) ||
      SORT_OPTIONS[0],
  );

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(initialCategory);

  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const categoryOptions = useMemo(() => {
    return [
      { id: "all", name: "All Transactions" },
      ...(categoriesData ?? []),
    ];
  }, [categoriesData]);

  const selectedCategory =
    categoryOptions.find(
      (cat) => String(cat.id) === String(selectedCategoryId),
    ) || categoryOptions[0];

  const { data: transactionsData, isFetching } = useQuery({
    queryKey: [
      "transactions",
      {
        sort: selectedSort.value,
        category: selectedCategoryId,
        search: debouncedSearch,
      },
    ],
    queryFn: async () => {
      const params = buildQueryParams({
        sort: selectedSort.value,
        category: String(selectedCategoryId),
        search: debouncedSearch,
      });

      const res = await fetch(`/api/transactions?${params}`);
      return res.json();
    },
  });

  useEffect(() => {
    const params = buildQueryParams({
      sort: selectedSort.value,
      category: String(selectedCategoryId),
      search: debouncedSearch,
    });

    router.replace(`/transactions?${params}`);
  }, [selectedSort, selectedCategoryId, debouncedSearch, router]);

  return (
    <div id="transactions" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <PageHeader title="Transactions" />

      <main className="card my-8">
        <div className="flex max-md:flex-wrap items-center justify-between gap-6">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search transactions"
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

            {/* Category */}
            <Dropdown
              label="Category"
              value={selectedCategory}
              setValue={(val) => setSelectedCategoryId(val.id)}
              options={categoryOptions}
              type="filter"
            />
          </div>
        </div>

        {isFetching && (
          <div className="text-sm text-grey-500 mt-4">
            Updating results...
          </div>
        )}

        <table
          id="transactions-table"
          className="w-full"
        >
          <thead className="max-md:hidden text-grey-500 text-left text-xs border-b border-grey-100">
            <tr>
              <th>Recipient / Sender</th>
              <th>Category</th>
              <th>Transaction Date</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactionsData?.map((item) => {
              const isPositive = Number(item.amount) > 0;

              return (
                <tr
                  key={item.id}
                  className="block md:table-row border-b border-grey-100"
                >
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
                        <div className="text-sm font-bold">
                          {item.name}
                        </div>

                        <div className="mt-1 text-xs text-grey-500 md:hidden">
                          {item.categoryName || "General"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end md:hidden">
                      <div
                        className={`text-sm font-bold ${
                          isPositive && "text-green"
                        }`}
                      >
                        {formatUSD(item.amount)}
                      </div>

                      <span className="mt-1 text-xs text-grey-500">
                        {new Date(item.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </td>

                  <td className="hidden md:table-cell text-sm text-grey-500">
                    {item.categoryName || "General"}
                  </td>

                  <td className="hidden md:table-cell text-sm text-grey-500">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td
                    className={`hidden md:table-cell text-sm font-bold text-right ${
                      isPositive && "text-green"
                    }`}
                  >
                    {formatUSD(item.amount)}
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