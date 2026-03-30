"use client";

import { useState } from "react";
import CheckoutStyles from "./checkout.module.css";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const PaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState("COD");

    return (
        <div className={CheckoutStyles.paymentContainer}>
            <h3 className={CheckoutStyles.sectionTitle}>
                <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 26 }} />
                Payment Method
            </h3>

            <div className={CheckoutStyles.paymentOptions}>
                {/* Cash on Delivery */}
                <div 
                    className={`${CheckoutStyles.paymentOption} ${selectedMethod === "COD" ? CheckoutStyles.active : ""}`}
                    onClick={() => setSelectedMethod("COD")}
                >
                    <div className={CheckoutStyles.paymentRadio}>
                        <div className={CheckoutStyles.paymentRadioDot}></div>
                    </div>
                    <LocalShippingOutlinedIcon sx={{ color: selectedMethod === "COD" ? "var(--color-primary)" : "rgba(0,0,0,0.5)", fontSize: 28 }} />
                    <div className={CheckoutStyles.paymentDetails}>
                        <h5 className={CheckoutStyles.paymentTitle}>Cash on Delivery</h5>
                        <p className={CheckoutStyles.paymentDesc}>Pay securely with cash upon receiving your order.</p>
                    </div>
                </div>

                <div className={`${CheckoutStyles.paymentOption} ${CheckoutStyles.disabledOption}`}>
                    <div className={CheckoutStyles.paymentRadio}>
                        <div className={CheckoutStyles.paymentRadioDot}></div>
                    </div>
                    <CreditCardOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)", fontSize: 28 }} />
                    <div className={CheckoutStyles.paymentDetails}>
                        <div className="d-flex align-items-center">
                            <h5 className={CheckoutStyles.paymentTitle} style={{ color: "rgba(0,0,0,0.5)" }}>Online Payment</h5>
                            <span className={CheckoutStyles.paymentTag}>Coming Soon</span>
                        </div>
                        <p className={CheckoutStyles.paymentDesc}>Credit/Debit Cards, UPI, Net Banking seamlessly integrated.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod;