"use client";

import { useState } from "react";

import Modal from "./modal";
import Input from "../input";
import ButtonLoader from "../buttonLoader";

import { formatUSD } from "@/app/lib/helper";
import { getColor } from "@/app/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { usePotTransactionMutation } from "@/app/lib/mutations/usePotMutation";

export default function PotTransaction({ type, pot, setIsOpen }) {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      return res.json();
    },
  });

  const [amount, setAmount] = useState("");

  const totalSaved = pot.totalSaved;
  const numericAmount = Number(amount);

  const rawTotal =
    type === "add" ? totalSaved + numericAmount : totalSaved - numericAmount;

  const newTotal = Math.max(0, Math.round(rawTotal * 100) / 100);
  const newPercent = Math.min((newTotal / pot.target) * 100, 100);

  const baseWidth = type === "add" ? pot.percent : newPercent;

  const diffWidth =
    type === "add" ? newPercent - pot.percent : pot.percent - newPercent;

  const [errors, setErrors] = useState({});

  const savePot = usePotTransactionMutation({
    editData: pot,
    setIsOpen,
  });

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
            {totalSaved > 0 && (
              <div
                style={{ width: `${baseWidth}%` }}
                className={`h-full bg-grey-900 transition-all duration-300 ${amount ? "rounded-l-sm" : "rounded-sm"}`}
              ></div>
            )}
            {amount && (
              <div
                style={{
                  width: `${diffWidth}%`,
                  backgroundColor:
                    type == "add" ? getColor("green") : getColor("red"),
                }}
                className={`h-full transition-all duration-300 ${
                  (type === "withdraw" && numericAmount >= totalSaved) ||
                  totalSaved == 0
                    ? "rounded-sm"
                    : "rounded-r-sm"
                }`}
              ></div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-grey-500">
            <div
              className={`font-bold ${amount ? (type == "add" ? "text-green" : "text-red") : ""}`}
            >
              {newPercent.toFixed(2)}%
            </div>
            <div className="">Target of {formatUSD(pot.target, 0)}</div>
          </div>
        </div>
      </div>

      <Input
        label={`Amount to ${type == "add" ? "Add" : "Withdraw"}`}
        icon="$"
        type="number"
        min="0.01"
        max={type === "add" ? userData?.balance : totalSaved}
        step="0.01"
        value={amount}
        onChange={(e) => {
          const val = Number(e.target.value);

          if (type === "withdraw" && val > totalSaved) return;
          if (type === "add" && val > Number(userData?.balance)) return;

          setAmount(e.target.value);
        }}
        error={errors.amount}
      />

      <button
        type="submit"
        disabled={savePot.isPending}
        onClick={() => {
          const newErrors = {};

          if (!amount || Number(amount) <= 0) {
            newErrors.amount = "Amount is required";
          }

          if (type === "add" && Number(amount) > Number(userData?.balance)) {
            newErrors.amount = "Amount exceeds current balance";
          }

          if (type === "withdraw" && Number(amount) > totalSaved) {
            newErrors.amount = "Amount exceeds pot balance";
          }

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          }

          setErrors({});
          savePot.mutate({
            type,
            amount,
          });
        }}
        className="submit-btn"
      >
        <ButtonLoader
          isPending={savePot.isPending}
          label={type == "add" ? "Confirm Addition" : "Confirm Withdrawal"}
        />
      </button>
    </Modal>
  );
}
