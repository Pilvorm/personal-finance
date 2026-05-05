import { useMutation, useQueryClient } from "@tanstack/react-query";

// CREATE
export function useCreateBudgetMutation({ setIsOpen }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return res.json();
    },

    onError: (err, payload, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsOpen(false);
    },
  });
}

// UPDATE
export function useUpdateBudgetMutation({ editData, setIsOpen }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`/api/budgets/${editData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return res.json();
    },

    onError: (err, payload, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsOpen(false);
    },
  });
}

// DELETE
export function useDeleteBudgetMutation({ setIsOpen }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await fetch(`/api/budgets/${id}`, {
        method: "DELETE",
      });
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSuccess: async () => {
      await new Promise((r) => setTimeout(r, 250));
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsOpen(false);
    },
  });
}
