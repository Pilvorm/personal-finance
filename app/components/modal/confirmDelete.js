"use client";

import { useState } from "react";
import Modal from "./modal";
import { AnimatePresence, motion } from "motion/react";
import { useDeleteBudgetMutation } from "@/app/lib/mutations/useBudgetMutation";
import { useDeletePotMutation } from "@/app/lib/mutations/usePotMutation";

export default function ConfirmDelete({ type, id, name, setIsOpen }) {
  const deleteBudget = useDeleteBudgetMutation({ setIsOpen });
  const deletePot = useDeletePotMutation({ setIsOpen });

  const deleteItem = type == "budget" ? deleteBudget : deletePot;

  return (
    <Modal
      title={`Delete '${name}' ?`}
      description={`Are you sure you want to delete this ${type}? This action cannot be reversed, and all the data inside it will be removed forever.`}
      setIsOpen={setIsOpen}
    >
      <button
        type="submit"
        disabled={deleteItem.isPending}
        onClick={() => {
          deleteItem.mutate(id);
        }}
        className="delete-btn flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {deleteItem.isPending ? (
            <motion.span
              key="loader"
              className="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            />
          ) : (
            <motion.span
              key="text"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Yes, Confirm Deletion
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="cursor-pointer text-sm text-grey-500 hover:underline"
      >
        No, Go Back
      </button>
    </Modal>
  );
}
