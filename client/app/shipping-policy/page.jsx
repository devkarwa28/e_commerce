"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
    LocalShippingOutlined, 
    SpeedOutlined, 
    VerifiedOutlined, 
    PublicOutlined, 
    NotificationsActiveOutlined, 
    MapOutlined,
    AssignmentOutlined
} from "@mui/icons-material";
import styles from "./shipping.module.css";

const ShippingPolicyPage = () => {
    const shipStats = [
        {
            icon: <SpeedOutlined fontSize="inherit" />,
            title: "Pan India Delivery",
            info: "We deliver across 19,000+ pin codes via our premium logicstics partners."
        },
        {
            icon: <LocalShippingOutlined fontSize="inherit" />,
            title: "Quick Dispatch",
            info: "Orders are processed and dispatched within 24-48 business hours."
        },
        {
            icon: <MapOutlined fontSize="inherit" />,
            title: "Live Tracking",
            info: "Receive real-time SMS and Email updates as your order travels to you."
        }
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
                        Logistics Excellence
                    </motion.span>
                    <motion.h1 
                        className={styles.mainTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Shipping & Delivery
                    </motion.h1>
                    <motion.p 
                        className={styles.lastUpdated}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Freshness Delivered Daily | Updated: March 31, 2026
                    </motion.p>
                </header>

                <motion.div 
                    className={styles.contentWrapper}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className={styles.shippingGrid}>
                        {shipStats.map((stat, i) => (
                            <div key={i} className={styles.shipCard}>
                                <div className={styles.shipIcon}>{stat.icon}</div>
                                <h4 className={styles.shipTitle}>{stat.title}</h4>
                                <p className={styles.shipInfo}>{stat.info}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.section variants={itemVariants} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <AssignmentOutlined />
                            </div>
                            <h2 className={styles.sectionTitle}>Processing & Timeline</h2>
                        </div>
                        <p className={styles.text}>
                            We understand that you're eager to enjoy your Nutrivia superfoods. All orders are subject to 
                            product availability. If an item is not in stock at the time you place your order, we will 
                            notify you and refund you the total amount of your order, using the original method of payment.
                        </p>
                        <p className={styles.text}>
                            Standard delivery times:
                            <br /> • **Metros:** 3-5 business days
                            <br /> • **Rest of India:** 5-7 business days
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <VerifiedOutlined />
                            </div>
                            <h2 className={styles.sectionTitle}>Shipping Charges</h2>
                        </div>
                        <p className={styles.text}>
                            We strive to keep our shipping rates as transparent as possible.
                            <br /> • **Free Shipping:** Applicable on all orders above ₹999.
                            <br /> • **Standard Shipping:** A flat fee of ₹49 is applicable on orders below ₹999.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <PublicOutlined />
                            </div>
                            <h2 className={styles.sectionTitle}>International Shipping</h2>
                        </div>
                        <p className={styles.text}>
                            Currently, Nutrivia ships primarily within India. However, we are rapidly expanding. 
                            For bulk international enquiries, please reach out to our export division at **export@nutrivia.com**.
                        </p>
                    </motion.section>

                    <motion.div variants={itemVariants} className={styles.trackingBox}>
                        <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '15px' }}>Already Placed an Order?</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            Track your package in real-time to see when your healthy treats will arrive.
                        </p>
                        <Link href="/track-order" className={styles.btnLink}>
                            Track Order Status
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ShippingPolicyPage;
