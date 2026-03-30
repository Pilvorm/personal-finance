"use client";

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
      className={`fixed bottom-0 lg:top-0 left-0 w-full lg:h-full ${isMenuOpen ? "lg:w-[300px]" : "lg:w-[112px]"} transition-all duration-300 px-4 sm:px-10 lg:px-0 lg:pb-6 flex flex-col bg-grey-900 text-grey-300 max-lg:rounded-t-2xl lg:rounded-r-2xl z-10`}
    >
      <div className="hidden lg:block px-8 py-10 w-max h-[22px]">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={visibility}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <img
                src="/assets/images/logo-large.svg"
                alt="finance Logo"
                className="w-[122px] h-[22px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2 lg:mt-6 lg:pr-6 flex lg:flex-col justify-between sm:gap-1">
        {SIDEBAR_MENU.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname == menu.href;

          return (
            <Link
              key={menu.id}
              href={menu.href}
              className={`relative group w-full max-lg:w-[104px] pt-2 pb-3 lg:py-4 lg:px-8 flex max-lg:flex-col items-center justify-center sm:justify-end lg:justify-start gap-1 lg:gap-4 text-base font-bold transition-all ease-out duration-100 ${isActive ? "bg-beige-100 text-grey-900 max-lg:rounded-t-xl lg:rounded-r-xl" : ""} hover:bg-beige-100 hover:text-grey-900 max-lg:hover:rounded-t-xl lg:hover:rounded-r-xl`}
            >
              {isActive && (
                <div className="absolute bottom-0 lg:top-0 left-0 w-full h-[6px] lg:w-[6px] lg:h-full bg-green"></div>
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
                    className="hidden sm:block text-xs lg:text-base whitespace-nowrap"
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
        className="cursor-pointer hidden lg:flex mt-auto px-8 py-4 items-center gap-4"
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
