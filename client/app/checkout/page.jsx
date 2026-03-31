"use client";

import { useState } from "react";
import AddressForm from "@/components/checkout/AddressForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    fullname: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  return (
    <section className="container py-5">
      <h2 className="mb-4 fw-bold" style={{ color: "#5c4033" }}>Checkout</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="checkout-card mb-4">
            <AddressForm 
              addressData={shippingAddress} 
              setAddressData={setShippingAddress} 
            />
          </div>

          <div className="checkout-card">
            <PaymentMethod 
              selectedMethod={paymentMethod} 
              setSelectedMethod={setPaymentMethod} 
            />
          </div>
        </div>
        <div className="col-lg-4">
          <OrderSummary 
            shippingAddress={shippingAddress} 
            paymentMethod={paymentMethod} 
          />
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;