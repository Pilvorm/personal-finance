import Summary from "./components/summary";
import Pots from "./components/pots";
import Transactions from "./components/transactions";
import Budgets from "./components/budgets";
import RecurringBills from "./components/recurringBills";

export default function Home() {
  return (
    <div id="overview" className="pt-8 pb-24 px-10 md:py-8">
      <h1 className="page-title">Overview</h1>
      <Summary />

      <main className="flex flex-col md:flex-row flex-wrap lg:grid grid-cols-12 gap-6">
        {/* left */}
        <div className="w-full col-span-7 flex flex-col gap-6">
          <Pots />
          <Transactions />
        </div>

        <div className="w-full col-span-5 flex flex-col gap-6">
          <Budgets />
          <RecurringBills />
        </div>
      </main>
    </div>
  );
}
