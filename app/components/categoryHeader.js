import { Ellipsis } from "./icons";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { DROPDOWN_ANIMATION } from "../data";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CategoryHeader({ id, theme, category }) {
  const queryClient = useQueryClient();

  const deleteBudget = useMutation({
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full bg-${theme}`}></div>
        <span className="text-xl font-bold">{category}</span>
      </div>

      <Menu>
        {({ open }) => (
          <>
            <MenuButton className="hover-btn cursor-pointer w-8 h-8 flex items-center justify-center rounded-full">
              <Ellipsis />
            </MenuButton>

            <AnimatePresence>
              {open && (
                <MenuItems
                  static
                  as={motion.div}
                  variants={DROPDOWN_ANIMATION}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition="transition"
                  anchor="bottom end"
                  className="menu-items w-32 h-fit px-1 py-3 text-sm origin-top-right rounded-lg bg-white focus:outline-none"
                >
                  <MenuItem>
                    <button className="hover-option cursor-pointer w-full px-3 py-1.5 text-left rounded-lg transition duration-75">
                      Edit Budget
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => deleteBudget.mutate(id)}
                      disabled={deleteBudget.isPending}
                      className="hover-option cursor-pointer w-full px-3 py-1.5 text-left text-red rounded-lg transition duration-75 "
                    >
                      Delete Budget
                    </button>
                  </MenuItem>
                </MenuItems>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
}
