"use client";

import Image from "next/image";
import Logo from "@/public/assets/images/logo-large.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { MinimizeMenuIcon } from "./icons";
import { SIDEBAR_MENU } from "../data";

const visibility = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed bottom-0 md:top-0 left-0 w-full md:h-full ${isMenuOpen ? "md:w-[300px]" : "md:w-[112px]"} transition-all duration-300 px-4 sm:px-10 md:px-0 md:pb-6 flex flex-col bg-grey-900 text-grey-300 max-md:rounded-t-2xl md:rounded-r-2xl z-10`}
    >
      <div className="hidden md:block px-8 py-10 w-max h-[22px]">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={visibility}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image src={Logo} width={122} height={22} alt="finance Logo" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2 md:mt-6 md:pr-6 flex md:flex-col justify-between sm:gap-1">
        {SIDEBAR_MENU.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname == menu.href;

          return (
            <Link
              key={menu.id}
              href={menu.href}
              className={`relative group w-full max-md:w-[104px] pt-2 pb-3 md:py-4 md:px-8 flex max-md:flex-col items-center justify-center sm:justify-end md:justify-start gap-1 md:gap-4 text-base font-bold transition-all ease-out duration-100 ${isActive ? "bg-beige-100 text-grey-900 max-md:rounded-t-xl md:rounded-r-xl" : ""} hover:bg-beige-100 hover:text-grey-900 max-md:hover:rounded-t-xl md:hover:rounded-r-xl`}
            >
              {isActive && (
                <div className="absolute bottom-0 md:top-0 left-0 w-full h-[6px] md:w-[6px] md:h-full bg-green"></div>
              )}
              <Icon
                className={`shrink-0 w-6 h-6 transition-all ease-out duration-100 ${isActive ? "text-green" : "group-hover:text-green"}`}
              />
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    variants={visibility}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="hidden sm:block text-xs md:text-base whitespace-nowrap"
                  >
                    {menu.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="cursor-pointer hidden md:flex mt-auto px-8 py-4 items-center gap-4"
      >
        <MinimizeMenuIcon className="shrink-0 w-6 h-6" />
        <AnimatePresence>
          {isMenuOpen && (
            <motion.span
              variants={visibility}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-nowrap"
            >
              Minimize Menu
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </nav>
  );
};

export default Sidebar;
