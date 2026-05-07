import { motion } from "motion/react";

export function TransactionsOverviewSkeleton() {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center justify-between ${i !== 0 ? "pt-5" : ""} ${i !== 3 ? "pb-5 border-b border-grey-100" : ""}
`}
        >
          <div className="flex items-center gap-4">
            {/* Image */}
            <div className="w-10 h-10 bg-grey-100 rounded-full" />

            {/* Name */}
            <div className="w-32 h-5 bg-grey-100 rounded-sm"></div>
          </div>
          <div className="flex flex-col items-end">
            {/* Amount */}
            <div className="ml-auto w-16 h-5 bg-grey-100 rounded-sm"></div>

            {/* Date */}
            <div className="mt-1 w-30 h-4 bg-grey-100 rounded-sm"></div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export function TransactionsSkeleton() {
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
            <td className="flex items-center justify-between md:table-cell">
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-10 h-10 bg-grey-100 rounded-full" />

                <div>
                  {/* Name */}
                  <div className="w-32 h-5 bg-grey-100 rounded-sm"></div>

                  {/* Category - Mobile */}
                  <div className="mt-1 md:hidden w-16 h-5 bg-grey-100 rounded-sm"></div>
                </div>
              </div>

              <div className="flex flex-col items-end md:hidden">
                {/* Amount - Mobile */}
                <div className="w-16 h-5 bg-grey-100 rounded-sm"></div>

                {/* Date - Mobile */}
                <span className="mt-1 w-30 h-5 bg-grey-100 rounded-sm"></span>
              </div>
            </td>

            {/* Category - Desktop */}
            <td className="hidden md:table-cell">
              <div className="w-30 h-5 bg-grey-100 rounded-sm"></div>
            </td>

            {/* Date - Desktop*/}
            <td className="hidden md:table-cell ">
              <div className="w-30 h-5 bg-grey-100 rounded-sm"></div>
            </td>

            {/* Amount - Desktop */}
            <td className={`hidden md:table-cell`}>
              <div className="ml-auto w-16 h-5 bg-grey-100 rounded-sm"></div>
            </td>
          </tr>
        );
      })}
    </motion.tbody>
  );
}
