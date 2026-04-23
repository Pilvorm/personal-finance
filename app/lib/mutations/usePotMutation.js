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

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["pots"] });

      const previous = queryClient.getQueryData(["pots"]);

      const optimistic = {
        id: Date.now(),
        name: payload.name,
        target: payload.target,
        theme: payload.theme,
        totalSaved: payload.totalSaved,
      };

      queryClient.setQueryData(["pots"], (old) => {
        if (!old) return old;

        return {
          ...old,
          data: [...old.data, optimistic],
          grandTotalSaved:
            old.grandTotalSaved + Number(optimistic.totalSaved || 0),
        };
      });

      return { previous };
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

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["pots"] });

      const previous = queryClient.getQueryData(["pots"]);

      queryClient.setQueryData(["pots"], (old) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((p) =>
            p.id === editData.id
              ? {
                  ...p,
                  name: payload.name,
                  target: payload.target,
                  theme: payload.theme,
                }
              : p,
          ),
        };
      });

      return { previous };
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

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["pots"] });

      const previous = queryClient.getQueryData(["pots"]) ?? [];

      queryClient.setQueryData(["pots"], (old) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((p) =>
            p.id === editData.id
              ? {
                  ...p,
                  totalSaved:
                    payload.type === "add"
                      ? Number(p.totalSaved) + Number(payload.amount)
                      : Number(p.totalSaved) - Number(payload.amount),
                }
              : p,
          ),
        };
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["pots"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
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

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["pots"] });

      const previous = queryClient.getQueryData(["pots"]);

      queryClient.setQueryData(["pots"], (old) => {
        if (!old) return old;

        const deletedPot = old.data.find((p) => p.id === id);

        return {
          ...old,
          data: old.data.filter((p) => p.id !== id),
          grandTotalSaved: old.grandTotalSaved - (deletedPot?.totalSaved || 0),
        };
      });

      return { previous };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["pots"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      setIsOpen(false);
    },
  });
}
