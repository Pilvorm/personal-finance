"use client";

import { useState } from "react";
import Sidebar from "./sidebar";

export default function LayoutClient({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div
        className={`
          transition-all duration-300
          ${isMenuOpen ? "md:ml-[300px]" : "md:ml-[112px]"}
        `}
      >
        {children}
      </div>
    </>
  );
}