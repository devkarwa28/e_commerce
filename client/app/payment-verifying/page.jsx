import { Suspense } from "react";
import PaymentVerifying from "./Payment-Verifying";


export default function Page() {
  return (
    <Suspense fallback={<div>Verifying payment...</div>}>
      <PaymentVerifying />
    </Suspense>
  );
}
