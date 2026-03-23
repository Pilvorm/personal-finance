"use client";

import { useState } from "react";
import { SearchIcon, CaretDown, Sort, Filter } from "./icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const sortOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

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

export default function Search({ placeholder }) {
  const [sort, setSort] = useState(sortOptions[0]);
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="flex max-md:flex-wrap items-center justify-between gap-6">
      <div className="btn-basic w-fit md:w-[320px] px-5 py-3 flex items-center justify-between">
        <input
          type="text"
          placeholder={placeholder}
          className="w-fit focus:outline-none"
        />
        <SearchIcon />
      </div>

      <div className="flex items-center gap-6">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <div className="max-md:hidden text-sm text-grey-500">Sort by</div>
          <Menu>
            <MenuButton>
              <div className="btn-basic cursor-pointer px-5 py-3 hidden md:flex items-center gap-4 text-sm outline-none">
                {sort}
                <CaretDown />
              </div>
              <Sort className="md:hidden"/>
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="menu-items w-32 px-1 py-3 text-sm origin-top-right rounded-lg bg-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              {sortOptions.map((option, idx) => (
                <MenuItem key={option} onClick={() => setSort(option)}>
                  <button
                    className={`group cursor-pointer capitalize flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition duration-50 ease-out data-focus:bg-beige-100 ${option == sort && "font-bold"}`}
                  >
                    {option}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <div className="max-md:hidden text-sm text-grey-500">Category</div>
          <Menu>
            <MenuButton>
              <div className="btn-basic cursor-pointer px-5 py-3 hidden md:flex items-center gap-4 text-sm outline-none">
                {category}
                <CaretDown />
              </div>
              <Filter className="md:hidden"/>
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="menu-items w-48 px-1 py-3 text-sm origin-top-right rounded-lg bg-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              {categories.map((option, idx) => (
                <MenuItem key={option} onClick={() => setSort(option)}>
                  <button
                    className={`group cursor-pointer capitalize truncate flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition duration-50 ease-out data-focus:bg-beige-100 ${option == category && "font-bold"}`}
                  >
                    {option}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
