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
          ${isMenuOpen ? "lg:ml-[300px]" : "lg:ml-[112px]"}
        `}
      >
        {children}
      </div>
    </>
  );
}