"use client";

import { useState } from "react";
import AddressForm from "@/components/checkout/AddressForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import CheckoutStyles from "@/components/checkout/checkout.module.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

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

  
  const isAddressFilled =
    shippingAddress.fullname || shippingAddress.phone || shippingAddress.pincode;

  return (
    <section className={CheckoutStyles.checkoutPage}>
      <div className="container">
        {/* ── Premium Header ── */}
        <div className={CheckoutStyles.checkoutHeader}>
          <div className={CheckoutStyles.checkoutBadge}>
            <ShoppingCartCheckoutRoundedIcon sx={{ fontSize: 14 }} />
            Secure Checkout
          </div>
          <h1 className={CheckoutStyles.checkoutTitle}>
            Complete Your Order
          </h1>
          <p className={CheckoutStyles.checkoutSubtitle}>
            You're just a few steps away from your premium dry fruits
          </p>
        </div>

        {/* ── Step Progress Bar ── */}
        <div className={CheckoutStyles.stepBar}>
          <div className={CheckoutStyles.stepItem}>
            <div className={`${CheckoutStyles.stepCircle} ${isAddressFilled ? CheckoutStyles.stepCircleDone : CheckoutStyles.stepCircleActive}`}>
              {isAddressFilled ? <CheckCircleOutlineRoundedIcon sx={{ fontSize: 16 }} /> : "1"}
            </div>
            <span className={`${CheckoutStyles.stepLabel} ${CheckoutStyles.stepLabelActive}`}>
              Address
            </span>
          </div>

          <div className={`${CheckoutStyles.stepLine} ${isAddressFilled ? CheckoutStyles.stepLineDone : ""}`} />

          <div className={CheckoutStyles.stepItem}>
            <div className={`${CheckoutStyles.stepCircle} ${isAddressFilled ? CheckoutStyles.stepCircleActive : ""}`}>
              2
            </div>
            <span className={`${CheckoutStyles.stepLabel} ${isAddressFilled ? CheckoutStyles.stepLabelActive : ""}`}>
              Payment
            </span>
          </div>

          <div className={CheckoutStyles.stepLine} />

          <div className={CheckoutStyles.stepItem}>
            <div className={CheckoutStyles.stepCircle}>3</div>
            <span className={CheckoutStyles.stepLabel}>Confirm</span>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="mb-4">
              <AddressForm
                addressData={shippingAddress}
                setAddressData={setShippingAddress}
              />
            </div>

            <PaymentMethod
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
            />
          </div>
          <div className="col-lg-4">
            <OrderSummary
              shippingAddress={shippingAddress}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;