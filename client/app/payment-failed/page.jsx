"use client";
export const dynamic = "force-dynamic";
import React from "react";
import { motion } from "framer-motion";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { useRouter } from "next/navigation";

const PaymentFailed = () => {
  const router = useRouter();

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(135deg, rgba(178, 58, 58, 0.03) 0%, rgba(92, 64, 51, 0.03) 100%)",
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
          boxShadow: "0 25px 50px rgba(178, 58, 58, 0.08)",
          border: "1px solid rgba(178, 58, 58, 0.15)",
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
            background: "linear-gradient(90deg, var(--color-danger, #B23A3A), var(--color-primary))",
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
            animate={{ scale: [1, 1.6, 2.2], opacity: [0.4, 0.1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "70px",
              height: "70px",
              border: "2px solid var(--color-danger, #B23A3A)",
              borderRadius: "50%",
              x: "-50%",
              y: "-50%",
            }}
          />
          {/* Glowing pulse ring 2 */}
          <motion.div
            animate={{ scale: [1, 1.3, 1.6], opacity: [0.6, 0.2, 0] }}
            transition={{
              duration: 2.5,
              delay: 0.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "70px",
              height: "70px",
              border: "2px solid rgba(178, 58, 58, 0.5)",
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
              background: "linear-gradient(135deg, #FFFFFF, #FFF5F5)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 10px 25px rgba(178, 58, 58, 0.15), inset 0 0 0 1px rgba(178, 58, 58, 0.3)",
            }}
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [10, -10, 10, -5, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ErrorOutlineRoundedIcon sx={{ fontSize: 40, color: "var(--color-danger, #B23A3A)" }} />
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
          Payment Failed
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
          We couldn't process your transaction. No charges were made to your account. Please check your payment details and try again.
        </motion.p>

        {/* Note / Hint Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            padding: "16px",
            background: "#F8F5F1",
            borderRadius: "14px",
            border: "1px solid var(--color-border, #E5E0DA)",
            textAlign: "left",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-primary)", display: "block", marginBottom: "6px" }}>
            Possible reasons:
          </span>
          <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>
            <li>Insufficient funds or daily limit reached.</li>
            <li>Incorrect card details or poor network connection.</li>
            <li>Bank authorization temporarily declined.</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.9, duration: 0.8 }}
           style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <button
            onClick={() => router.push("/checkout")}
            style={{
              padding: "14px 20px",
              background: "linear-gradient(135deg, var(--color-primary), #4A3328)",
              color: "#FFF",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 8px 20px rgba(92, 64, 51, 0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(92, 64, 51, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(92, 64, 51, 0.2)";
            }}
          >
            <RefreshRoundedIcon sx={{ fontSize: 20 }} /> Try Payment Again
          </button>
          
          <button
            onClick={() => router.push("/contactus")}
            style={{
              padding: "14px 20px",
              background: "transparent",
              color: "var(--color-primary)",
              border: "1px solid var(--color-border, #E5E0DA)",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(92, 64, 51, 0.05)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <SupportAgentRoundedIcon sx={{ fontSize: 20 }} /> Contact Support
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default PaymentFailed;
