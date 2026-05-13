import { Ellipsis } from "./icons";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { getColor } from "../lib/helper";

import { DROPDOWN_ANIMATION } from "../data";

export default function CategoryHeader({ theme, name, type, edit, del }) {

  const color = getColor(theme);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          style={{ backgroundColor: color }}
          className={`w-4 h-4 rounded-full`}
        ></div>
        <span className="text-xl font-bold">{name}</span>
      </div>

      <Menu>
        {({ open }) => (
          <>
            <MenuButton className="hover-btn cursor-pointer w-8 h-8 flex items-center justify-center rounded-full">
              <Ellipsis />
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
                  anchor="bottom end"
                  className="menu-items w-32 h-fit px-1 py-3 text-sm origin-top-right rounded-lg bg-white focus:outline-none"
                >
                  <MenuItem>
                    <button
                      type="button"
                      onClick={edit}
                      className="hover-option cursor-pointer w-full px-3 py-1.5 text-left rounded-lg transition duration-75"
                    >
                      Edit {type}
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={del}
                      className="hover-option cursor-pointer w-full px-3 py-1.5 text-left text-red rounded-lg transition duration-75 "
                    >
                      Delete {type}
                    </button>
                  </MenuItem>
                </MenuItems>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
}
