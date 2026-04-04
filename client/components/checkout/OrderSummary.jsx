"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CheckoutStyles from "./checkout.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CircularProgress from '@mui/material/CircularProgress';

const OrderSummary = ({ shippingAddress, paymentMethod }) => {
    const {cart} = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [discount, setDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

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
        const { fullname, phone, address, city, state, pincode } = shippingAddress;
        if (!fullname || !phone || !address || !city || !state || !pincode) {
            alert("Please fill all shipping address fields.");
            return;
        }

        setLoading(true);
        try {
            if (paymentMethod === "COD") {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
                    shippingAddress,
                    paymentMethod,
                    couponCode: couponCode || null
                }, { withCredentials: true });

                const orderId = res.data.order._id;
                sessionStorage.removeItem('appliedCoupon');
                router.push(`/order-success/${orderId}`);
            } else if (paymentMethod === "Online") {
                const res = await loadRazorpay();

                if (!res) {
                    alert("Razorpay SDK failed to load. Are you online?");
                    setLoading(false);
                    return;
                }

                // Create order in backend
                const { data: orderData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`, {
                    amount: finalTotal
                }, { withCredentials: true });

                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: orderData.amount,
                    currency: "INR",
                    name: "Nutrivia",
                    description: "Order Payment",
                    order_id: orderData.id,
                    handler: async (response) => {
                        try {
                            const verifyRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`, response, { withCredentials: true });

                            if (verifyRes.data.message === "Payment Verified") {
                                // Now place the final order
                                const finalOrderRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
                                    shippingAddress,
                                    paymentMethod,
                                    couponCode: couponCode || null,
                                    paymentStatus: "Paid",
                                    paymentId: response.razorpay_payment_id
                                }, { withCredentials: true });

                                const orderId = finalOrderRes.data.order._id;
                                sessionStorage.removeItem('appliedCoupon');
                                router.push(`/order-success/${orderId}`);
                            }
                        } catch (err) {
                            console.error(err);
                            alert("Payment verification failed.");
                        }
                    },
                    prefill: {
                        name: user?.uname,
                        email: user?.email,
                        contact: shippingAddress.phone
                    },
                    theme: {
                        color: "#5c4033"
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong while placing order.");
            setLoading(false);
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
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
                </button>
            </div>
        </div>
    )
}

export default OrderSummary;