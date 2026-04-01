import { CaretDown, Sort, Filter } from "./icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Dropdown({ label, value, setValue, options, type }) {
  return (
    <div className="flex items-center gap-2">
      <div className="max-md:hidden text-sm text-grey-500">{label}</div>
      <Menu>
        <MenuButton>
          <div className="btn-basic cursor-pointer px-5 py-3 hidden md:flex items-center gap-4 text-sm outline-none">
            {value}
            <CaretDown />
          </div>
          {type == "sort" ? (
            <Sort className="md:hidden" />
          ) : (
            <Filter className="md:hidden" />
          )}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="menu-items w-32 px-1 py-3 text-sm origin-top-right rounded-lg bg-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          {options.map((option, idx) => (
            <MenuItem key={option} onClick={() => setValue(option)}>
              <button
                className={`group cursor-pointer capitalize text-left flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition duration-50 ease-out data-focus:bg-beige-100 ${option == value && "font-bold"}`}
              >
                {option}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
