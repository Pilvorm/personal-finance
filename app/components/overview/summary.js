import { formatUSD } from "@/app/lib/helper";

export default function Summary({ balance, transactionSummary }) {

  return (
    <div id="summary" className="my-8 flex max-md:flex-col flex-wrap gap-6">
      <div className="flex-1 p-6 flex flex-col gap-3 bg-grey-900 text-white rounded-xl">
        <h2 className="text-sm">Current Balance</h2>
        <div className="text-[32px] font-bold">{formatUSD(balance ?? 0)}</div>
      </div>
      <div className="flex-1 p-6 flex flex-col gap-3 bg-white rounded-xl">
        <h2 className="text-sm text-grey-500">Income</h2>
        <div className="text-[32px] text-grey-900 font-bold">{formatUSD(transactionSummary?.income ?? 0)}</div>
      </div>
      <div className="flex-1 p-6 flex flex-col gap-3 bg-white rounded-xl">
        <h2 className="text-sm text-grey-500">Expenses</h2>
        <div className="text-[32px] text-grey-900 font-bold">{formatUSD(transactionSummary?.expense ?? 0)}</div>
      </div>
    </div>
  );
}
