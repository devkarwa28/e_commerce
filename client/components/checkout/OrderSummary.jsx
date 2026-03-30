"use client";

import { useCart } from "@/context/CartContext";
import CheckoutStyles from "./checkout.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const OrderSummary = () => {
    const {cart} = useCart();
    const router = useRouter();
    const [discount, setDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState("");

    useEffect(() => {
        const appliedCouponInfo = sessionStorage.getItem('appliedCoupon');
        if (appliedCouponInfo) {
            try {
                const parsed = JSON.parse(appliedCouponInfo);
                setDiscount(parsed.discount || 0);
                setCouponCode(parsed.code || "");
            } catch (e) {}
        }
    }, []);

    const finalTotal = cart ? cart.totalAmount - discount : 0;

    const placeOrder = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order`,{
                shippingAddress: {address:"Test Address",city:"Jodhpur",pincode:"342001"},
                paymentMethod: "COD"
            },{withCredentials:true});

            const orderId = res.data.order._id;
            sessionStorage.removeItem('appliedCoupon'); // clear after order
            router.push(`/order-success/${orderId}`);
        } catch (error) {
            console.error(error);
        }
    };
    
    if(!cart) return null;

    return (
        <div className={CheckoutStyles.summaryContainer}>
            <h3 className={CheckoutStyles.sectionTitle}>
                <ReceiptLongOutlinedIcon sx={{ fontSize: 26 }} />
                Order Summary
            </h3>

            <div className={CheckoutStyles.summaryBody}>
                <div className={CheckoutStyles.summaryRow}>
                    <span className={CheckoutStyles.summaryLabel}>Items Subtotal</span>
                    <span className={CheckoutStyles.summaryValue}>₹{cart.totalAmount.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                    <div className={`${CheckoutStyles.summaryRow} ${CheckoutStyles.discountRow}`}>
                        <div className="d-flex flex-column">
                            <span className={CheckoutStyles.summaryLabel}>Discount Applied</span>
                            {couponCode && <span className={CheckoutStyles.couponTag}>{couponCode}</span>}
                        </div>
                        <span className={CheckoutStyles.discountValue}>-₹{discount.toLocaleString()}</span>
                    </div>
                )}

                <div className={CheckoutStyles.summaryRow}>
                    <span className={CheckoutStyles.summaryLabel}>Shipping</span>
                    <span className={CheckoutStyles.summaryValueFree}>Free</span>
                </div>

                <hr className={CheckoutStyles.summaryDivider} />

                <div className={CheckoutStyles.summaryRowTotal}>
                    <span className={CheckoutStyles.totalLabel}>Total to Pay</span>
                    <span className={CheckoutStyles.totalValue}>₹{finalTotal.toLocaleString()}</span>
                </div>

                <div className={CheckoutStyles.secureCheckoutMsg}>
                    <LockOutlinedIcon sx={{ fontSize: 14 }} />
                    <span>Secure SSL Encrypted Checkout</span>
                </div>

                <button 
                    className={CheckoutStyles.placeOrderBtn} 
                    onClick={placeOrder}
                >
                    Place Order
                </button>
            </div>
        </div>
    )
}

export default OrderSummary;