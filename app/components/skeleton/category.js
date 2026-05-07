import { motion } from "motion/react";

export default function CategorySkeleton({ spending, row, className }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`flex items-center gap-4 animate-pulse ${className || ""}`}
        >
          <div className="min-w-1 h-full rounded-lg bg-grey-100" />

          <div
            className={`flex gap-1 ${
              row
                ? "w-full flex-col items-start xl:flex-row xl:items-center justify-between"
                : "flex-col"
            }`}
          >
            <div className="w-15 h-5 bg-grey-100 rounded-sm"></div>

            {spending ? (
              <div className="flex items-center gap-2">
                <div className="font-bold">$0.00</div>
                <div className="text-xs text-grey-500">of $.00</div>
              </div>
            ) : (
              <div className="w-10 h-4 bg-grey-100 rounded-sm"></div>
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
}
