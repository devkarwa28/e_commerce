"use client";

import { Divider } from "@mui/material";
import { useState } from "react";
import CouponBox from "./CouponBox";
import { useRouter } from "next/navigation";
import CartStyles from "./cart.module.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

const CartSummary = ({ cart }) => {
    const [discount, setDiscount] = useState(0);
    const finalTotal = cart.totalAmount - discount;
    const router = useRouter();

    return (
        <div className={CartStyles.summaryCard}>
            <div className={CartStyles.summaryHeader}>
                <PaymentsOutlinedIcon sx={{ fontSize: 24, color: "var(--color-primary)" }} />
                <h5 className={CartStyles.summaryTitle}>Order Summary</h5>
            </div>

            <div className={CartStyles.summaryBody}>
                <div className={CartStyles.summaryRow}>
                    <span className={CartStyles.summaryLabel}>Subtotal</span>
                    <span className={CartStyles.summaryValue}>₹{cart.totalAmount.toLocaleString()}</span>
                </div>

                <CouponBox cartTotal={cart.totalAmount} setDiscount={setDiscount} />

                {discount > 0 && (
                    <div className={`${CartStyles.summaryRow} ${CartStyles.discountRow}`}>
                        <span className={CartStyles.summaryLabel}>Discount Applied</span>
                        <span className={CartStyles.discountValue}>-₹{discount.toLocaleString()}</span>
                    </div>
                )}

                <div className={CartStyles.summaryRow}>
                    <span className={CartStyles.summaryLabel}>Shipping Estimate</span>
                    <span className={CartStyles.summaryValueFree}>Free</span>
                </div>

                <Divider className={CartStyles.summaryDivider} />

                <div className={CartStyles.summaryRowTotal}>
                    <span className={CartStyles.totalLabel}>Total</span>
                    <span className={CartStyles.totalValue}>₹{finalTotal.toLocaleString()}</span>
                </div>

                <button 
                    className={CartStyles.checkoutBtn} 
                    onClick={() => router.push('/checkout')}
                >
                    <ShoppingCartCheckoutRoundedIcon sx={{ fontSize: 20 }} />
                    <span>Proceed To Checkout</span>
                </button>
            </div>
        </div>
    )
}

export default CartSummary;