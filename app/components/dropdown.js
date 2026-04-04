"use client";

import { CaretDown, Sort, Filter } from "./icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({ label, value, setValue, options, type }) {
  return (
    <div className="flex items-center gap-2">
      <div className="max-md:hidden text-sm text-grey-500">{label}</div>

      <Menu>
        {({ open }) => (
          <>
            <MenuButton>
              <div className="btn-basic cursor-pointer px-5 py-3 hidden md:flex items-center gap-4 text-sm outline-none">
                {value}
                <CaretDown />
              </div>

              {type === "sort" ? (
                <Sort className="md:hidden" />
              ) : (
                <Filter className="md:hidden" />
              )}
            </MenuButton>

            <AnimatePresence>
              {open && (
                <MenuItems
                  static
                  as={motion.div}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  anchor="bottom end"
                  className="menu-items w-32 px-1 py-3 text-sm origin-top-right rounded-lg bg-white focus:outline-none"
                >
                  {options.map((option) => (
                    <MenuItem key={option}>
                      {({ active }) => (
                        <button
                          onClick={() => setValue(option)}
                          className={`cursor-pointer capitalize text-left flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition duration-75 ${
                            active ? "bg-beige-100" : ""
                          } ${option === value ? "font-bold" : ""}`}
                        >
                          {option}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
}
