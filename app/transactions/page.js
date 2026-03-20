import Search from "../components/search";
import Pagination from "../components/pagination";

export default function Transactions() {
  return (
    <div id="overview" className="pt-8 pb-24 px-10 md:py-8">
      <h1 className="page-title">Transactions</h1>
      <main className="card my-8">
        <Search placeholder={"Search transactions"} />
        <Pagination />
      </main>
    </div>
  );
}
