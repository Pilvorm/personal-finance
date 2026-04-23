"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "./icons";

function getPages(current, total) {
  const pages = [];

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({ page, setPage, totalPages }) {
  const pages = getPages(page, totalPages);

  return (
    <div className="flex items-center justify-between my-8">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn-basic hover-basic group w-25 h-10 px-5 py-3 flex items-center justify-center gap-4 text-sm"
      >
        <CaretLeft
          dynamic={true}
          className="text-[#696868] group-hover:text-white transition duration-100 ease-in-out"
        />
        Prev
      </button>

      {/* Pages */}
      <div className="flex gap-2">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-grey-500">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg border
                ${
                  p === page
                    ? "bg-grey-900 text-white"
                    : "btn-basic hover-basic"
                }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="btn-basic hover-basic group w-25 h-10 px-5 py-3 flex items-center justify-center gap-4 text-sm"
      >
        Next
        <CaretRight
          dynamic={true}
          className="text-[#696868] group-hover:text-white transition duration-100 ease-in-out"
        />
      </button>
    </div>
  );
}
