"use client";

import AddressForm from "@/components/checkout/AddressForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";

const CheckoutPage = () => {
  return (
    <section className="container py-5">
        <h2 className="mb-4 fw-bold" style={{color:"#5c4033"}}>Checkout</h2>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="checkout-card mb-4">
              <h5 className="mb-3">Shipping Address</h5>
              <AddressForm/>
            </div>

            <div className="checkout-card">
              <h5 className="mb-3">Payment Method</h5>
              <PaymentMethod/>
            </div>

          </div>
          <div className="col-lg-4">
            <OrderSummary/>
          </div>
        </div>
    </section>
  )
}

export default CheckoutPage