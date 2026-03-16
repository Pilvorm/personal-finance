"use client";

import Image from "next/image";
import Logo from "@/public/assets/images/logo-large.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  OverviewIcon,
  TransactionsIcon,
  BudgetsIcon,
  PotsIcon,
  RecurringBillsIcon,
  MinimizeMenuIcon,
} from "./icons";

const SidebarMenu = [
  { id: "overview", label: "Overview", href: "/", icon: OverviewIcon },
  {
    id: "transactions",
    label: "Transactions",
    href: "/transactions",
    icon: TransactionsIcon,
  },
  { id: "budgets", label: "Budgets", href: "/budgets", icon: BudgetsIcon },
  { id: "pots", label: "Pots", href: "/pots", icon: PotsIcon },
  {
    id: "recurring-bills",
    label: "Recurring Bills",
    href: "/recurring-bills",
    icon: RecurringBillsIcon,
  },
];

const Sidebar = ({}) => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 md:top-0 left-0 w-full md:w-[300px] md:h-full px-4 sm:px-10 md:px-0 md:pb-6 flex flex-col bg-grey-900 text-grey-300 max-md:rounded-t-2xl md:rounded-r-2xl">
      <div className="hidden md:block px-8 py-10">
        <Image src={Logo} height="22" alt="finance Logo" className="w-auto" />
      </div>

      <div className="mt-2 md:mt-6 md:pr-6 flex md:flex-col justify-between sm:gap-1">
        {SidebarMenu.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname == menu.href;

          return (
            <Link
              key={menu.id}
              href={menu.href}
              className={`relative w-full max-md:w-[104px] pt-2 pb-3 md:py-4 md:px-8 flex max-md:flex-col items-center justify-center sm:justify-end md:justify-start gap-1 md:gap-4 text-base font-bold ${
                isActive &&
                "bg-beige-100 text-grey-900 max-md:rounded-t-xl md:rounded-r-xl"
              }`}
            >
              {isActive && (
                <div className="absolute bottom-0 md:top-0 left-0 w-full h-[6px] md:w-[6px] md:h-full bg-green"></div>
              )}

              <Icon className={`${isActive && "text-green"}`} />

              <div className="hidden sm:block text-xs md:text-base max-md:text-center">
                {menu.label}
              </div>
            </Link>
          );
        })}
      </div>

      <button className="hidden md:flex mt-auto px-8 py-4 items-center gap-4">
        <MinimizeMenuIcon />
        <span>Minimize Menu</span>
      </button>
    </nav>
  );
};

export default Sidebar;
