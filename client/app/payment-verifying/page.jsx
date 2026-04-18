"use client";
export const dynamic = "force-dynamic";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const PaymentVerifying = () => {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const verifyAndCreateOrder = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`,
          {
            razorpay_order_id: params.get("razorpay_order_id"),
            razorpay_payment_id: params.get("razorpay_payment_id"),
            razorpay_signature: params.get("razorpay_signature"),
          },
          { withCredentials: true },
        );

        if (res.data.message === "Payment Verified") {
          const orderRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
            {
              shippingAddress: JSON.parse(
                sessionStorage.getItem("shippingAddress"),
              ),
              paymentMethod: "Online",
              paymentStatus: "Paid",
              paymentId: params.get("razorpay_payment_id"),
              couponCode: sessionStorage.getItem("couponCode") || null,
            },
            { withCredentials: true },
          );

          const orderId = orderRes.data.order._id;

          sessionStorage.removeItem("appliedCoupon");
          sessionStorage.removeItem("shippingAddress");
          sessionStorage.removeItem("couponCode");

          router.push(`/order-success/${orderId}`);
        }
      } catch (err) {
        console.error(err);
        router.push("/payment-failed");
      }
    };

    verifyAndCreateOrder();
  }, []);
  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "calc(100vh - 80px)",
        background:
          "linear-gradient(135deg, rgba(92, 64, 51, 0.02) 0%, rgba(200, 155, 60, 0.05) 100%)",
        padding: "40px 20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#FFFFFF",
          padding: "48px 32px",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(92, 64, 51, 0.08)",
          border: "1px solid rgba(200, 155, 60, 0.15)",
          textAlign: "center",
          maxWidth: "460px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top elegant accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background:
              "linear-gradient(90deg, var(--color-gold), var(--color-primary))",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: "36px",
            marginTop: "10px",
          }}
        >
          {/* Glowing pulse ring 1 */}
          <motion.div
            animate={{ scale: [1, 1.8, 2.5], opacity: [0.5, 0.1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "70px",
              height: "70px",
              border: "2px solid var(--color-gold)",
              borderRadius: "50%",
              x: "-50%",
              y: "-50%",
            }}
          />
          {/* Glowing pulse ring 2 */}
          <motion.div
            animate={{ scale: [1, 1.4, 1.8], opacity: [0.8, 0.3, 0] }}
            transition={{
              duration: 2,
              delay: 0.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "70px",
              height: "70px",
              border: "2px solid var(--color-primary)",
              borderRadius: "50%",
              x: "-50%",
              y: "-50%",
            }}
          />

          {/* Central Icon Container */}
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #FFFFFF, #FDFBF7)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
              boxShadow:
                "0 10px 25px rgba(200, 155, 60, 0.15), inset 0 0 0 1px rgba(200, 155, 60, 0.3)",
            }}
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <SecurityRoundedIcon
                sx={{ fontSize: 38, color: "var(--color-primary)" }}
              />
            </motion.div>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontSize: "26px",
            fontWeight: "800",
            color: "var(--color-primary)",
            marginBottom: "12px",
            letterSpacing: "-0.5px",
          }}
        >
          Verifying Payment
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontSize: "15px",
            lineHeight: "1.6",
            color: "var(--color-text-secondary)",
            marginBottom: "28px",
            padding: "0 10px",
          }}
        >
          Please wait while we securely interact with the bank to process your
          transaction. This might take a few moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            padding: "14px",
            background: "rgba(211, 47, 47, 0.05)",
            borderRadius: "14px",
            border: "1px solid rgba(211, 47, 47, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <span
            style={{ fontSize: "14px", fontWeight: "600", color: "#C62828" }}
          >
            ⚠️ Please do not refresh or close this page.
          </span>
        </motion.div>

        {/* Secure Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            marginTop: "36px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              fill="var(--color-olive)"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: "13px",
              color: "var(--color-olive)",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            SSL Encrypted Connection
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PaymentVerifying;
