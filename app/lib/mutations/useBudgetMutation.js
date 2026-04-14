import { useMutation, useQueryClient } from "@tanstack/react-query";

// CREATE
export function useCreateBudgetMutation({ selectedCategory, setIsOpen }) {
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

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const previous = queryClient.getQueryData(["budgets"]);

      const optimistic = {
        id: Date.now(),
        categoryId: payload.categoryId,
        categoryName: selectedCategory.name,
        max: payload.max,
        theme: payload.theme,
        spending: 0,
        transactions: [],
      };

      queryClient.setQueryData(["budgets"], (old = []) => [...old, optimistic]);

      return { previous };
    },

    onError: (err, payload, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsOpen(false);
    },
  });
}

// UPDATE
export function useUpdateBudgetMutation({
  editData,
  selectedCategory,
  setIsOpen,
}) {
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

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const previous = queryClient.getQueryData(["budgets"]);

      queryClient.setQueryData(["budgets"], (old = []) =>
        old.map((b) =>
          b.id === editData.id
            ? {
                ...b,
                categoryId: payload.categoryId,
                categoryName: selectedCategory.name,
                max: payload.max,
                theme: payload.theme,
              }
            : b,
        ),
      );

      return { previous };
    },

    onError: (err, payload, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSettled: () => {
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

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const previous = queryClient.getQueryData(["budgets"]);

      queryClient.setQueryData(["budgets"], (old = []) =>
        old.filter((b) => b.id !== id),
      );

      return { previous };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["budgets"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsOpen(false);
    },
  });
}
