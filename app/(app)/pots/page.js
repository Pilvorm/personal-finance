"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import PageHeader from "../../components/pageHeader";
import CategoryHeader from "../../components/categoryHeader";
import PotModal from "@/app/components/modal/potModal";
import ConfirmDelete from "@/app/components/modal/confirmDelete";
import PotTransaction from "@/app/components/modal/potTransaction";

import { getColor } from "@/app/lib/helper";
import { formatUSD } from "@/app/lib/helper";
import { useQuery } from "@tanstack/react-query";

const PotsCard = ({
  index,
  id,
  name,
  totalSaved,
  theme,
  target,
  setTransaction,
  onEdit,
  onDelete,
}) => {
  const percent = Math.min((totalSaved / target) * 100, 100).toFixed(2);

  const color = getColor(theme);

  const potData = {
    id,
    name,
    totalSaved,
    theme: color,
    percent,
    target,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10, }}
      animate={{ opacity: 1, x: 0, }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card flex flex-col gap-6"
    >
      <CategoryHeader
        type={"Pot"}
        theme={theme}
        name={name}
        edit={onEdit}
        del={onDelete}
      />

      <div className="">
        <div className="flex items-center justify-between">
          <div className="text-sm text-grey-500">Total Saved</div>
          <div className="text-[32px] font-bold">{formatUSD(totalSaved)}</div>
        </div>

        <div className="mt-4">
          {/* Bar */}
          <div className="w-full h-2 bg-beige-100 rounded-sm">
            <div
              style={{ width: `${percent}%`, backgroundColor: color }}
              className={`h-full rounded-sm`}
            ></div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-grey-500">
            <div className="font-bold">{percent}%</div>
            <div className="">Target of {formatUSD(target, 0)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() =>
            setTransaction({
              type: "add",
              ...potData,
            })
          }
          className="hover-basic cursor-pointer p-4 text-sm font-bold bg-beige-100 rounded-lg"
        >
          + Add Money
        </button>
        <button
          onClick={() =>
            setTransaction({
              type: "withdraw",
              ...potData,
            })
          }
          className="hover-basic cursor-pointer p-4 text-sm font-bold bg-beige-100 rounded-lg"
        >
          Withdraw
        </button>
      </div>
    </motion.div>
  );
};

export default function Pots() {
  const [isOpen, setIsOpen] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data } = useQuery({
    queryKey: ["pots"],
    queryFn: async () => {
      const res = await fetch("/api/pots");
      return res.json();
    },
  });

  const potsData = data?.data;
  const usedThemes = new Set(potsData?.map((t) => t.theme));

  return (
    <div id="pots" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <AnimatePresence>
        {(isOpen || editTarget) && (
          <PotModal
            setIsOpen={() => {
              setIsOpen(false);
              setEditTarget(null);
            }}
            editData={editTarget}
            usedThemes={usedThemes}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transaction && (
          <PotTransaction
            type={transaction.type}
            pot={transaction}
            setIsOpen={() => {
              setTransaction(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Budget */}
      <AnimatePresence>
        {deleteTarget && (
          <ConfirmDelete
            type={"pot"}
            id={deleteTarget.id}
            name={deleteTarget.name}
            setIsOpen={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      <PageHeader
        title="Pots"
        action="+ Add New Pots"
        fn={() => setIsOpen(true)}
      />

      <main className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {potsData?.map((pot, index) => (
            <PotsCard
              index={index}
              key={pot.id}
              id={pot.id}
              theme={pot.theme}
              name={pot.name}
              totalSaved={pot.totalSaved}
              target={pot.target}
              setTransaction={setTransaction}
              onEdit={() => setEditTarget(pot)}
              onDelete={() =>
                setDeleteTarget({
                  id: pot.id,
                  name: pot.name,
                })
              }
            />
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
}
