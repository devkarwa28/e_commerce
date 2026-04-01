"use client";

import { motion } from "framer-motion";
import { 
    GavelOutlined, 
    PersonOutline, 
    ShoppingCartOutlined, 
    CreditCardOutlined, 
    BalanceOutlined,
    RuleOutlined
} from "@mui/icons-material";
import styles from "./terms.module.css";

const TermsConditionsPage = () => {
    const sections = [
        {
            icon: <GavelOutlined />,
            title: "Agreement to Terms",
            content: "By accessing or using our Website and Services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using our services.",
        },
        {
            icon: <PersonOutline />,
            title: "Account Registration",
            content: "To access certain features of the Nutrivia platform, you must create a personal account. You are responsible for:",
            list: [
                "Maintaining the confidentiality of your account credentials.",
                "All activities that occur under your account.",
            ]
        },
        {
            icon: <ShoppingCartOutlined />,
            title: "Orders & Pricing",
            content: "Nutrivia reserves the right to refuse or cancel any order for any reason. Pricing and product availability are subject to change without notice.",
            list: [
                "We make every effort to display high-quality accurate product images and descriptions.",
                "Actual product packaging may vary slightly from the website display due to continuous improvement.",
            ]
        },
        {
            icon: <CreditCardOutlined />,
            title: "Payment Policy",
            content: "Nutrivia supports multiple secure payment methods including Net Banking, UPI, and major Credit/Debit cards. Final payment must be received before order shipment (unless Cash on Delivery is selected)."
        },
        {
            icon: <RuleOutlined />,
            title: "Prohibited Uses",
            content: "You agree not to use the Website or Services for any purpose that is prohibited by these Terms or by law. This includes attempting to compromise the security of our infrastructure or distributing malicious code."
        },
        {
            icon: <BalanceOutlined />,
            title: "Governing Law",
            content: "These Terms shall be governed by and construed in accordance with the laws of Jodhpur, Rajasthan, India, without regard to its conflict of law provisions."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
                        Official Agreement
                    </motion.span>
                    <motion.h1 
                        className={styles.mainTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Terms & Conditions
                    </motion.h1>
                    <motion.p 
                        className={styles.lastUpdated}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Effective Date: March 31, 2026
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
                            Nutrivia is a premium health-food brand. By continuing to browse this website, you 
                            acknowledge your acceptance of the legal terms outlined below.
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

                    <motion.div variants={itemVariants} className={styles.highlight} style={{ marginTop: '80px', background: '#F8F1E5' }}>
                        <p className={styles.highlightText} style={{ color: '#5C4033' }}>
                            Questions? For any legal clarifications, please reach out to our legal department 
                            at **compliance@nutrivia.com**.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsConditionsPage;
