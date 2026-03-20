"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "./icons";

export default function Pagination({}) {
  return (
    <div className="flex items-center justify-between my-8">
      <button className="btn-basic w-25 h-10 px-5 py-3 flex items-center justify-center gap-4 text-sm">
        <CaretLeft />
        Prev
      </button>

      <div className="flex gap-2">
        <button className="btn-basic cursor-pointer w-10 h-10 p-5 flex items-center justify-center gap-4 text-sm hover:bg-grey-900 hover:text-white transition duration-100 ease-in-out">
          1
        </button>
        <button className="btn-basic w-10 h-10 p-5 flex items-center justify-center gap-4 text-sm">
          2
        </button>
      </div>

      <button className="btn-basic w-25 h-10 px-5 py-3 flex items-center justify-center gap-4 text-sm">
        Next
        <CaretRight />
      </button>
    </div>
  );
}
