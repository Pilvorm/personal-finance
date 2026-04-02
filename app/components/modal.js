import { motion, AnimatePresence } from "motion/react";
import { Close } from "./icons";

export default function Modal({ title, description, children, setIsOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed top-0 left-0 bg-black/50 w-full h-full z-100 px-6 md:px-12 flex flex-col items-center justify-center"
    >
      <div className="card w-full max-w-[560px] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="card-title">{title}</h3>
          <Close onClick={() => setIsOpen(false)} className="cursor-pointer" />
        </div>
        <p className="text-sm text-grey-500 mt-2">{description}</p>
        {children}
      </div>
    </motion.div>
  );
}
