import { Suspense } from "react";
import TransactionsClient from "./transactionsClient";

export default function Page() {
  return (
    <Suspense>
      <TransactionsClient />
    </Suspense>
  );
}