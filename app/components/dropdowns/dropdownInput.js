"use client";

import { CaretDown, Sort, Filter } from "../icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { DROPDOWN_ANIMATION } from "@/app/data";

export default function DropdownInput({
  label,
  value,
  setValue,
  options,
  type,
}) {
  return (
    <div className="">
      <div className="mb-1 text-xs text-grey-500 font-bold">{label}</div>

      <Menu>
        {({ open }) => (
          <>
            <MenuButton className="w-full">
              <div className="btn-basic cursor-pointer px-5 py-3 flex items-center justify-between gap-4 text-sm outline-none">
                {type == "theme" ? (
                  <div className="flex items-center gap-3">
                    <div
                      className={`bg-${value.toLowerCase()} w-4 h-4 rounded-full`}
                    ></div>
                    <div>{value}</div>
                  </div>
                ) : (
                  <div>{value}</div>
                )}
                <CaretDown />
              </div>
            </MenuButton>

            <AnimatePresence>
              {open && (
                <MenuItems
                  static
                  as={motion.div}
                  variants={DROPDOWN_ANIMATION}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition="transition"
                  anchor="bottom start"
                  className="menu-items w-(--button-width) h-75 px-1 py-3 text-sm origin-top-right rounded-lg bg-white focus:outline-none"
                >
                  {options.map((option) => (
                    <MenuItem key={option}>
                      <button
                        onClick={() => setValue(option)}
                        className={`hover-option cursor-pointer capitalize text-left flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ${option === value ? "font-bold" : ""}`}
                      >
                        {type == "theme" ? (
                          <div className="flex items-center gap-3">
                            <div
                              className={`bg-${option.toLowerCase()} w-4 h-4 rounded-full`}
                            ></div>
                            <div>{option}</div>
                          </div>
                        ) : (
                          <div>{option}</div>
                        )}
                      </button>
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
