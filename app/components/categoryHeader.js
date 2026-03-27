import { Ellipsis } from "./icons";

export default function CategoryHeader({ color, label }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full bg-${color}`}></div>
        <span className="text-xl font-bold">{label}</span>
      </div>
      <button className="cursor-pointer">
        <Ellipsis />
      </button>
    </div>
  );
}
