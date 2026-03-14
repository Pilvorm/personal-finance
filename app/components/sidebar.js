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
    <nav className="w-[300px] h-full fixed top-0 left-0 flex flex-col pb-6 bg-grey-900 text-grey-300 rounded-r-2xl">
      <div className="px-8 py-10">
        <Image src={Logo} height="22" alt="finance Logo" className="w-auto" />
      </div>

      <div className="mt-6 flex flex-col gap-1 pr-6">
        {SidebarMenu.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname == menu.href;

          return (
            <Link
              key={menu.id}
              href={menu.href}
              className={`relative px-8 py-4 flex items-center gap-4 text-base font-bold ${isActive && "bg-beige-100 text-grey-900 rounded-r-xl"}`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 w-[6px] h-full bg-green"></div>
              )}
              <Icon className={`${isActive && "text-green"}`} />
              <div>{menu.label}</div>
            </Link>
          );
        })}
      </div>

      <button className="px-8 py-4 mt-auto flex items-center gap-4">
        <MinimizeMenuIcon />
        <span>Minimize Menu</span>
      </button>
    </nav>
  );
};

export default Sidebar;
