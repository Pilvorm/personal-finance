import { Suspense } from "react";
import RecurringBillsClient from "./recurringBillsClient";

export default function Page() {
  return (
    <Suspense>
      <RecurringBillsClient />
    </Suspense>
  );
}