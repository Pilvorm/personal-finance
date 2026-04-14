"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PageHeader from "../../components/pageHeader";
import CategoryHeader from "../../components/categoryHeader";
import PotModal from "@/app/components/modal/potModal";
import { POTS_DATA } from "../../data";
import { getColor } from "@/app/lib/helper";
import { useQuery } from "@tanstack/react-query";
import ConfirmDelete from "@/app/components/modal/confirmDelete";

const PotsCard = ({ theme, name, totalSaved, target, onDelete }) => {
  const percent = Math.min((totalSaved / target) * 100, 100);
  const savedVal = Number(totalSaved).toFixed(2);
  const targetVal = target.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const color = getColor(theme);

  const potCardAnimation = {
    initial: { opacity: 0, y: -10, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      variants={potCardAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="card flex flex-col gap-6"
    >
      <CategoryHeader
        type={"Pot"}
        theme={theme}
        name={name}
        // edit={onEdit}
        del={onDelete}
      />

      <div className="">
        <div className="flex items-center justify-between">
          <div className="text-sm text-grey-500">Total Saved</div>
          <div className="text-[32px] font-bold">${savedVal}</div>
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
            <div className="font-bold">{percent.toFixed(1)}%</div>
            <div className="">Target of {targetVal}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="hover-basic cursor-pointer p-4 text-sm font-bold bg-beige-100 rounded-lg">
          + Add Money
        </button>
        <button className="hover-basic cursor-pointer p-4 text-sm font-bold bg-beige-100 rounded-lg">
          Withdraw
        </button>
      </div>
    </motion.div>
  );
};

export default function Pots() {
  const [isOpen, setIsOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    status,
    data = [],
    error,
  } = useQuery({
    queryKey: ["pots"],
    queryFn: async () => {
      const res = await fetch("/api/pots");
      return res.json();
    },
  });

  const usedThemes = new Set(data?.map((t) => t.theme));

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
          {data?.map((pot) => (
            <PotsCard
              key={pot.id}
              theme={pot.theme}
              name={pot.name}
              totalSaved={pot.totalSaved}
              target={pot.target}
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
