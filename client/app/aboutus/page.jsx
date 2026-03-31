"use client";

import { motion } from "framer-motion";
import { Button } from "@mui/material";
import Link from "next/link";
import styles from "./about.module.css";
import { EmojiEvents,LocalShipping, NatureOutlined, WorkspacePremiumOutlined, HealthAndSafetyOutlined } from "@mui/icons-material";

const AboutUsPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const values = [
        {
            icon: <WorkspacePremiumOutlined fontSize="inherit" />,
            title: "Uncompromising Quality",
            desc: "We source only the finest A-grade nuts and seeds from the most fertile lands globally, ensuring every bite is premium."
        },
        {
            icon: <NatureOutlined fontSize="inherit" />,
            title: "100% Organic",
            desc: "Our products are grown without synthetic pesticides or fertilizers, preserving the natural goodness and earth's health."
        },
        {
            icon: <HealthAndSafetyOutlined fontSize="inherit" />,
            title: "Nutrition First",
            desc: "Each nut is a powerhouse of energy. We use minimal processing to keep the essential vitamins and minerals intact."
        }
    ];

    const stats = [
        { label: "Happy Customers", value: "10K+" },
        { label: "Premium Products", value: "120+" },
        { label: "Years of Trust", value: "12+" },
        { label: "Global Sources", value: "25+" }
    ];

    return (
        <div className={styles.aboutContainer}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <motion.span 
                    className={styles.brandName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Since 2012
                </motion.span>
                <motion.h1 
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    The Pure Joy of <br /> Natural Nutrition
                </motion.h1>
                <motion.p 
                    className={styles.heroDesc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    At Nutrivia, we believe that true wellness starts with what you put in your body. 
                    Our mission is to bring the world's most nutritious superfoods directly to your doorstep.
                </motion.p>
            </section>

            {/* Our Story Section */}
            <section className={styles.storySection}>
                <div className="container">
                    <div className={styles.storyContent}>
                        <motion.div 
                            className={styles.storyText}
                            {...fadeIn}
                        >
                            <h2 className={styles.sectionTitle}>Crafted by Nature, <br /> Delivered with Love</h2>
                            <p className={styles.sectionPara}>
                                Ten years ago, we started with a simple idea: why is find it so hard to find high-quality, 
                                chemical-free dry fruits? What began as a small family passion blossomed into 
                                <strong> Nutrivia</strong>, a name synonymous with purity and premium taste.
                            </p>
                            <p className={styles.sectionPara}>
                                Today, we work with local farmers across three continents to curate an 
                                assortment of nuts, berries, and seeds that aren't just snacks—they are 
                                fuel for your life's adventures.
                            </p>
                            <div className="d-flex gap-4 mt-4">
                                <div className="text-center">
                                    <EmojiEvents sx={{ color: "#c89b3c", fontSize: 40, mb: 1 }} />
                                    <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>Best Organic Brand '22</p>
                                </div>
                                <div className="text-center">
                                    <LocalShipping sx={{ color: "#c89b3c", fontSize: 40, mb: 1 }} />
                                    <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>Zero Carbon Logistics</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div 
                            className={styles.storyImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            {/* Placeholder for high quality image */}
                            <div style={{ width: "100%", height: "450px", background: "url('https://images.unsplash.com/photo-1510116410196-857eaf6a3be8?q=80&w=2072&auto=format&fit=crop') center/cover" }}></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="container mb-5 pb-5">
                <motion.div 
                    className="text-center mb-5"
                    {...fadeIn}
                >
                    <h2 className={styles.sectionTitle}>What Makes Us Unique</h2>
                    <p className={styles.heroDesc} style={{ fontSize: "16px" }}>Our philosophy is simple: keep it raw, keep it real.</p>
                </motion.div>

                <div className={styles.valueGrid}>
                    {values.map((v, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.valueCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <div className={styles.iconBox}>{v.icon}</div>
                            <h3 className={styles.valueTitle}>{v.title}</h3>
                            <p className={styles.valueDesc}>{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className="container">
                    <div className="row">
                        {stats.map((s, i) => (
                            <div key={i} className="col-md-3 col-6 mb-4">
                                <motion.div 
                                    className={styles.statItem}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <span className={styles.statNumber}>{s.value}</span>
                                    <span className={styles.statLabel}>{s.label}</span>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <motion.div 
                    className="container"
                    {...fadeIn}
                >
                    <h2 className={styles.ctaTitle}>Ready to fuel your journey?</h2>
                    <p className={styles.sectionPara} style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
                        Explore our curated selection of organic superfoods and discover the 
                        difference true quality makes.
                    </p>
                    <Link href="/products">
                        <Button className={styles.ctaBtn}>
                            Start Shopping Now
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutUsPage;
