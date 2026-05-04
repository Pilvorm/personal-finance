import { useMutation, useQueryClient } from "@tanstack/react-query";

// CREATE
export function useCreatePotMutation({ setIsOpen }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("/api/pots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return res.json();
    },

    onError: (err, payload, context) => {
      queryClient.setQueryData(["pots"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      setIsOpen(false);
    },
  });
}

// UPDATE
export function useUpdatePotMutation({ editData, setIsOpen }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`/api/pots/${editData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return res.json();
    },

    onError: (err, payload, context) => {
      queryClient.setQueryData(["pots"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      setIsOpen(false);
    },
  });
}

// POT TRANSACTION
export function usePotTransactionMutation({ editData, setIsOpen }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`/api/pots/${editData.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update pot");
      }

      return res.json();
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["pots"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsOpen(false);
    },
  });
}

// DELETE
export function useDeletePotMutation({ setIsOpen }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await fetch(`/api/pots/${id}`, {
        method: "DELETE",
      });
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["pots"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsOpen(false);
    },
  });
}
