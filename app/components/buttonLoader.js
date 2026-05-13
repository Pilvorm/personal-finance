import { AnimatePresence, motion } from "motion/react";

export default function ButtonLoader({ isPending, label }) {
  return (
    <AnimatePresence mode="wait">
      {isPending ? (
        <motion.span
          key="loader"
          className="loader"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      ) : (
        <motion.span
          key="text"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
