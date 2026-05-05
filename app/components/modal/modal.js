import { motion, AnimatePresence } from "motion/react";
import { Close } from "../icons";

export default function Modal({ title, description, children, setIsOpen }) {
  return (
    <motion.div
      onClick={() => setIsOpen(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed top-0 left-0 bg-black/50 w-full h-full z-100 px-6 md:px-12 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.99, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.99, y: 10 }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-[560px] flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="card-title">{title}</h3>
          <Close onClick={() => setIsOpen(false)} className="cursor-pointer" />
        </div>
        <p className="text-sm text-grey-500">{description}</p>
        {children}
      </motion.div>
    </motion.div>
  );
}