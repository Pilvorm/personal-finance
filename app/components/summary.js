export default function Summary() {
  return (
    <div id="summary" className="my-8 grid grid-cols-12 gap-6">
      <div className="col-span-4 p-6 flex flex-col gap-3 bg-grey-900 text-white rounded-xl">
        <h2 className="text-sm">Current Balance</h2>
        <div className="text-[32px] font-bold">$4,836.00</div>
      </div>
      <div className="col-span-4 p-6 flex flex-col gap-3 bg-white rounded-xl">
        <h2 className="text-sm text-grey-500">Income</h2>
        <div className="text-[32px] text-grey-900 font-bold">$3,814.25</div>
      </div>
      <div className="col-span-4 p-6 flex flex-col gap-3 bg-white rounded-xl">
        <h2 className="text-sm text-grey-500">Income</h2>
        <div className="text-[32px] text-grey-900 font-bold">$1,700.50</div>
      </div>
    </div>
  );
}
