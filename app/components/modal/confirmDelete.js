"use client";

import Modal from "./modal";
import ButtonLoader from "../buttonLoader";

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
        <ButtonLoader isPending={deleteItem.isPending} label="Yes, Confirm Deletion" />
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
