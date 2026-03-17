export default function Category({ color, label, amount }) {
  return (
    <div className="pots-category flex items-center gap-4">
      <div className={`w-[4px] h-full rounded-lg bg-${color}`} />

      <div>
        <h3 className="text-grey-500">{label}</h3>
        <div className="mt-1 text-sm font-bold">${amount}</div>
      </div>
    </div>
  );
}
