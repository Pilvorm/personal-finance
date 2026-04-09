import Modal from "./modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ConfirmDelete({ type, id, name, setIsOpen }) {
  const queryClient = useQueryClient();

  const deleteItem = useMutation({
    mutationFn: async (id) => {
      await fetch(`/api/budgets/${id}`, {
        method: "DELETE",
      });
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const previous = queryClient.getQueryData(["budgets"]);

      queryClient.setQueryData(["budgets"], (old) =>
        old?.filter((b) => b.id !== id),
      );

      return { previous };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  return (
    <Modal
      title={`Delete '${name}' ?`}
      description={`Are you sure you want to delete this ${type}? This action cannot be reversed, and all the data inside it will be removed forever.`}
      setIsOpen={setIsOpen}
    >
      <button
        type="submit"
        onClick={() => {
          deleteItem.mutate(id);
          setIsOpen(false);
        }}
        className="delete-btn"
      >
        Yes, Confirm Deletion
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
