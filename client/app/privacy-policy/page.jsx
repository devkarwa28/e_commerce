"use client";

import { motion } from "framer-motion";
import { 
    SecurityUpdateGoodOutlined, 
    AdminPanelSettingsOutlined, 
    DataSaverOffOutlined, 
    GppGoodOutlined, 
    SmsOutlined, 
    CookieOutlined, 
    NotificationsActiveOutlined, 
    SupportAgentOutlined
} from "@mui/icons-material";
import styles from "./privacy.module.css";

const PrivacyPolicyPage = () => {
    const sections = [
        {
            icon: <AdminPanelSettingsOutlined />,
            title: "Information We Collect",
            content: "We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This may include:",
            list: [
                "Personal identifiers (Name, Email, Phone Number, Address)",
                "Payment transaction information (Processed securely via encrypted gateways)",
                "Order history and preferences",
                "Communication records and support tickets"
            ]
        },
        {
            icon: <DataSaverOffOutlined />,
            title: "How We Use Your Data",
            content: "Your data is used to provide you with a premium shopping experience. Specifically:",
            list: [
                "To process and deliver your Nutrivia orders",
                "To personalize your product recommendations",
                "To send transaction-related emails and SMS",
                "To improve our website's performance and UX"
            ]
        },
        {
            icon: <GppGoodOutlined />,
            title: "Data Security",
            content: "We implement industry-standard security measures to protect your personal information. Nutrivia uses SSL encryption for all data transfers and stores sensitive information in secured, restricted-access databases."
        },
        {
            icon: <CookieOutlined />,
            title: "Cookies Policy",
            content: "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
        },
        {
            icon: <SmsOutlined />,
            title: "Marketing Communications",
            content: "You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link or the instructions provided in any email we send."
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
                        Legal & Trust
                    </motion.span>
                    <motion.h1 
                        className={styles.mainTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p 
                        className={styles.lastUpdated}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Last Updated: March 31, 2026
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
                            At Nutrivia, your privacy is our priority. We are committed to protecting the personal information 
                            you share with us and ensuring a secure environment for all your premium nutritional needs.
                        </p>
                    </motion.div>

                    {sections.map((section, index) => (
                        <motion.section 
                            key={index} 
                            className={styles.section}
                            variants={itemVariants}
                        >
                            <div className={styles.sectionHeader}>
                                <div className={styles.iconBox}>
                                    {section.icon}
                                </div>
                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                            </div>
                            <p className={styles.text}>{section.content}</p>
                            {section.list && (
                                <ul className={styles.list}>
                                    {section.list.map((item, i) => (
                                        <li key={i} className={styles.listItem}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </motion.section>
                    ))}

                    <motion.div variants={itemVariants} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <SupportAgentOutlined />
                            </div>
                            <h2 className={styles.sectionTitle}>Contact Us</h2>
                        </div>
                        <p className={styles.text}>
                            If you have any questions about our Privacy Policy, please contact our legal team at:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Email: legal@nutrivia.com</li>
                            <li className={styles.listItem}>Support Hotline: +91 76110 77344</li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
