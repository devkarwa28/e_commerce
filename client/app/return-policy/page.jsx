"use client";

import { motion } from "framer-motion";
import { 
    VerifiedOutlined, 
    PaymentOutlined, 
    HelpOutline
} from "@mui/icons-material";
import styles from "./returns.module.css";

const ReturnPolicyPage = () => {
    const returnSteps = [
        {
            num: "01",
            title: "Initiate Request",
            desc: "Log into your account and navigate to 'My Orders' to select the item(s) you wish to return within 7 days of delivery."
        },
        {
            num: "02",
            title: "QC Verification",
            desc: "Our team will review your request. Once approved, we will arrange a doorstep reverse pickup for your convenience."
        },
        {
            num: "03",
            title: "Instant Refund",
            desc: "Upon successful quality check at our warehouse, your refund will be processed back to the original payment method."
        }
    ];

    const conditions = [
        "Unopened products with original seals and packaging intact.",
        "Damaged or incorrect shipments reported within 48 hours of delivery.",
        "Quality concerns related to freshness or taste within the 7-day window.",
        "Promotional or 'Free Gift' items must be returned along with the main product."
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className={styles.policyContainer}>
            <div className="container">
                {/* Hero Section */}
                <header className={styles.heroHeader}>
                    <motion.span 
                        className={styles.subTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Quality Assurance
                    </motion.span>
                    <motion.h1 
                        className={styles.mainTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Returns & Refunds
                    </motion.h1>
                    <motion.p 
                        className={styles.lastUpdated}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Nutrivia Hassle-Free Policy | Updated: March 31, 2026
                    </motion.p>
                </header>

                <motion.div 
                    className={styles.contentWrapper}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className={styles.highlight}>
                        <p className={styles.highlightText}>
                            At Nutrivia, your satisfaction is our highest priority. If our premium nuts and superfoods do not 
                            meet your expectations, we offer a hassle-free 7-day return and refund policy.
                        </p>
                    </motion.div>

                    {/* Step-by-Step Card Grid */}
                    <motion.div variants={itemVariants} className={styles.stepGrid}>
                        {returnSteps.map((step, index) => (
                            <div key={index} className={styles.stepCard}>
                                <div className={styles.stepNum}>{step.num}</div>
                                <h4 className={styles.stepTitle}>{step.title}</h4>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Eligibility Section */}
                    <motion.section variants={itemVariants} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <VerifiedOutlined />
                            </div>
                            <h2 className={styles.sectionTitle}>Eligibility for Returns</h2>
                        </div>
                        <p className={styles.text}>
                            To maintain the high safety and hygiene standards of our food products, the following criteria 
                            must be met for a return to be eligible:
                        </p>
                        <ul className={styles.list}>
                            {conditions.map((item, i) => (
                                <li key={i} className={styles.listItem}>{item}</li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Refund Information */}
                    <motion.section variants={itemVariants} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <PaymentOutlined />
                            </div>
                            <h2 className={styles.sectionTitle}>How Refunds Work</h2>
                        </div>
                        <p className={styles.text}>
                            Once we receive the return shipment and complete our quality check (usually within 48 hours 
                            of receipt), the refund amount will be credited to:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>**Online Payments:** The original payment method (Bank Account, Card, or UPI).</li>
                            <li className={styles.listItem}>**Cash on Delivery:** A secure Nutrivia Wallet Credit or Direct Bank Transfer.</li>
                        </ul>
                        <p className={styles.text} style={{ fontSize: '14px', fontStyle: 'italic' }}>
                            Depending on your bank, it may take 5-7 business days for the amount to reflect in your statement.
                        </p>
                    </motion.section>


                    {/* Customer Support */}
                    <motion.div variants={itemVariants} className={styles.section} style={{ marginTop: '80px', textAlign: 'center' }}>
                        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                            <HelpOutline sx={{ fontSize: 40, color: "var(--color-gold)" }} />
                            <h2 className="m-0" style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-primary)" }}>Still Need Help?</h2>
                        </div>
                        <p className={styles.text}>
                            Our dedicated support team is here to assist you with any corner cases or specific queries 
                            regarding your recent orders and returns.
                        </p>
                        <ul className={styles.list} style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                            <li className={styles.listItem} style={{ paddingLeft: '0' }}>Email: support@nutrivia.com</li>
                            <li className={styles.listItem} style={{ paddingLeft: '0' }}>WhatsApp Support: +91 76110 77344</li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ReturnPolicyPage;
