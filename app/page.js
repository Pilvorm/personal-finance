import Summary from "./components/summary";
import Pots from "./components/pots";
import Transactions from "./components/transactions";
import Budgets from "./components/budgets";
import RecurringBills from "./components/recurringBills";

export default function Home() {
  return (
    <div id="overview" className="md:ml-[300px] px-10 py-8">
      <h1 className="text-[32px] font-bold">Overview</h1>
      <Summary />

      <main className="grid grid-cols-12 gap-6">
        {/* left */}
        <div className="col-span-7 flex flex-col gap-6">
          <Pots />
          <Transactions />
        </div>

        <div className="col-span-5 flex flex-col gap-6">
          <Budgets />
          <RecurringBills />
        </div>
      </main>
    </div>
  );
}
