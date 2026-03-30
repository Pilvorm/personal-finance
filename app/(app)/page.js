import PageHeader from "../components/pageHeader";
import Summary from "../components/overview/summary";
import Pots from "../components/overview/pots";
import Transactions from "../components/overview/transactions";
import Budgets from "../components/overview/budgets";
import RecurringBills from "../components/overview/recurringBills";

export default function Home() {
  return (
    <div id="overview" className="px-4 pt-8 pb-28 md:px-10 lg:py-8">
      <PageHeader title="Overview"/>
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
