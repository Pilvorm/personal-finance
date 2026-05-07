import { motion } from "motion/react";

export function RecurringBillsTableSkeleton() {
  return (
    <motion.tbody
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {Array.from({ length: 8 }).map((_, i) => {
        return (
          <tr
            key={i}
            className={`block md:table-row ${i !== 7 && "border-b border-grey-100"} animate-pulse`}
          >
            {/* Recipient */}
            <td className="flex items-end md:items-center justify-between md:table-cell">
              <div>
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <div className="w-10 h-10 bg-grey-100 rounded-full" />

                  {/* Recipient */}
                  <div className="w-32 h-5 bg-grey-100 rounded-sm"></div>
                </div>
                {/* Date - Mobile */}
                <div
                  className={`mt-2 md:hidden w-30 h-5 bg-grey-100 rounded-sm`}
                ></div>
              </div>

              {/* Amount - Mobile */}
              <div className="ml-auto md:hidden w-16 h-5 bg-grey-100 rounded-sm"></div>
            </td>

            {/* Date - Desktop */}
            <td className={`hidden md:table-cell text-xs`}>
              <div className="w-30 h-5 bg-grey-100 rounded-sm"></div>
            </td>

            {/* Amount - Desktop */}
            <td className={`hidden md:table-cell text-sm font-bold text-right`}>
              <div className="ml-auto w-16 h-5 bg-grey-100 rounded-sm"></div>
            </td>
          </tr>
        );
      })}
    </motion.tbody>
  );
}
