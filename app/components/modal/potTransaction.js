"use client";

import { useState } from "react";

import Modal from "./modal";
import { formatUSD } from "@/app/lib/helper";

export default function PotTransaction({ type, pot, setIsOpen }) {
  const [amount, setAmount] = useState("");

  const totalSaved = Number(pot.totalSaved);
  const numericAmount = Number(amount);

  const rawTotal =
    type === "add" ? totalSaved + numericAmount : totalSaved - numericAmount;

  const newTotal = Math.round(rawTotal * 100) / 100;
  const newPercent = Math.min((newTotal / pot.target) * 100, 100).toFixed(2);

  return (
    <Modal
      title={`${type == "add" ? "Add to" : "Withdraw"} '${pot.name}' ?`}
      description={
        type == "add"
          ? `Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.`
          : `Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.`
      }
      setIsOpen={setIsOpen}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="text-sm text-grey-500">New Amount</div>
          <div className="text-[32px] font-bold">{formatUSD(newTotal)}</div>
        </div>

        <div className="mt-4">
          {/* Bar */}
          <div className="w-full h-2 flex gap-[2px] bg-beige-100 rounded-sm">
            <div
              style={{ width: `${pot.percent}%` }}
              className={`h-full bg-grey-900 ${amount ? "rounded-l-sm" : "rounded-sm"}`}
            ></div>
            <div
              style={{
                width: `${newPercent - pot.percent}%`,
                backgroundColor: pot.theme,
              }}
              className={`h-full rounded-r-sm`}
            ></div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-grey-500">
            <div
              className={`font-bold ${amount ? (type == "add" ? "text-green" : "text-red") : ""}`}
            >
              {newPercent}%
            </div>
            <div className="">Target of {formatUSD(pot.target, 0)}</div>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 text-xs text-grey-500 font-bold">
          {`Amount to ${type == "add" ? "Add" : "Withdraw"}`}
        </label>
        <div className="btn-basic px-5 py-3 flex items-center gap-3">
          <span className="text-sm text-beige-500">$</span>
          <input
            type="number"
            value={amount}
            min="0.01"
            max="1000000"
            step="0.01"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      <button
        disabled={!amount}
        // onClick={() =>
        //   saveBudget.mutate({
        //     categoryId: selectedCategory.id,
        //     max: budget,
        //     theme: selectedTheme.id,
        //   })
        // }
        className="submit-btn"
      >
        {type == "add" ? "Confirm Addition" : "Confirm Withdrawal"}
      </button>
    </Modal>
  );
}
