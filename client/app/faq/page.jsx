"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    SearchOutlined, 
    ExpandMoreRounded, 
    HelpOutlineRounded,
    LocalShippingOutlined,
    AssignmentReturnOutlined,
    EmailOutlined
} from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import styles from "./faq.module.css";

const FAQPage = () => {
    const [activeId, setActiveId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const faqCategories = [
        {
            title: "Product & Quality",
            icon: <HelpOutlineRounded />,
            questions: [
                {
                    id: 1,
                    q: "Are your dry fruits organic and unadulterated?",
                    a: "Absolutely. All Nutrivia products are sourced from certified organic farms and undergo advanced UV-sterilization to ensure zero contamination while preserving 100% natural nutrition."
                },
                {
                    id: 2,
                    q: "How should I store my Nutrivia products?",
                    a: "For maximum freshness, we recommend storing your nuts and seeds in an airtight container in a cool, dry place. For extended shelf life, refrigeration is recommended."
                },
                {
                    id: 3,
                    q: "Do you use any preservatives or added sugars?",
                    a: "No. Our philosophy is rooted in purity. We do not use any synthetic preservatives, artificial colors, or refined sugars in our processing."
                }
            ]
        },
        {
            title: "Orders & Shipping",
            icon: <LocalShippingOutlined />,
            questions: [
                {
                    id: 4,
                    q: "How long does it take for my order to arrive?",
                    a: "Metros typically receive orders within 3-5 business days. For the rest of India, it generally takes 5-7 business days. You will receive a tracking link as soon as your order is dispatched."
                },
                {
                    id: 5,
                    q: "Do you offer international shipping?",
                    a: "Currently, we ship all across India. For bulk international enquiries, please reach out to our team at export@nutrivia.com."
                },
                {
                    id: 6,
                    q: "Can I change my delivery address after placing an order?",
                    a: "If the order has not been dispatched yet, we can update your address. Please contact our support team immediately at +91 76110 77344."
                }
            ]
        },
        {
            title: "Returns & Refunds",
            icon: <AssignmentReturnOutlined />,
            questions: [
                {
                    id: 7,
                    q: "What is your return policy?",
                    a: "We offer a hassle-free 7-day return policy for unopened products or items with quality concerns. Please initiate a return request from your account dashboard."
                },
                {
                    id: 8,
                    q: "How soon can I expect my refund?",
                    a: "Refunds are typically processed within 48 hours of your return shipment reaching our warehouse and passing a quality check."
                }
            ]
        }
    ];

    const toggleFAQ = (id) => {
        setActiveId(activeId === id ? null : id);
    };

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
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const filteredFaqs = faqCategories.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q => 
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    return (
        <div className={styles.faqContainer}>
            <div className="container">
                {/* Hero Section */}
                <header className={styles.heroHeader}>
                    <motion.span 
                        className={styles.subTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Customer Support
                    </motion.span>
                    <motion.h1 
                        className={styles.mainTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Common Questions
                    </motion.h1>
                    
                    <motion.div 
                        className={styles.searchWrapper}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <input 
                            type="text" 
                            placeholder="Search your query (e.g. 'shipping', 'quality')..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <SearchOutlined className={styles.searchIcon} />
                    </motion.div>
                </header>

                <motion.div 
                    className={styles.faqWrapper}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((cat, catIdx) => (
                            <div key={catIdx} className={styles.faqCategory}>
                                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                                {cat.questions.map((faq) => (
                                    <motion.div 
                                        key={faq.id} 
                                        className={`${styles.faqItem} ${activeId === faq.id ? styles.faqItemActive : ""}`}
                                        variants={itemVariants}
                                    >
                                        <div 
                                            className={styles.faqHeader}
                                            onClick={() => toggleFAQ(faq.id)}
                                        >
                                            <h4 className={styles.faqQuestion}>{faq.q}</h4>
                                            <ExpandMoreRounded 
                                                className={`${styles.toggleIcon} ${activeId === faq.id ? styles.rotateIcon : ""}`} 
                                            />
                                        </div>
                                        <AnimatePresence>
                                            {activeId === faq.id && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                >
                                                    <div className={styles.faqAnswer}>
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <HelpOutlineRounded sx={{ fontSize: 80, color: 'rgba(0,0,0,0.05)', mb: 2 }} />
                            <h3 style={{ color: 'var(--color-primary)' }}>No results found for "{searchQuery}"</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>Try searching for a different keyword or browse categories below.</p>
                            <Button onClick={() => setSearchQuery("")} sx={{ color: 'var(--color-gold)', mt: 2 }}>Show All Questions</Button>
                        </div>
                    )}

                    <motion.div 
                        className={styles.supportBanner}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                            <EmailOutlined sx={{ fontSize: 40, color: "var(--color-gold)" }} />
                            <h2 className="m-0" style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-primary)" }}>Still have concerns?</h2>
                        </div>
                        <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                            Our premium customer experience team is available 24/7 to resolve complex queries via 
                            our dedicated support channels.
                        </p>
                        <Link href="/contactus">
                            <Button className={styles.btnContact}>Reach Out to Us</Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQPage;
