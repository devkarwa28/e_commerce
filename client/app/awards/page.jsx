"use client";

import { motion } from "framer-motion";
import { 
    EmojiEventsOutlined, 
    WorkspacePremiumOutlined, 
    DiamondOutlined, 
    StarOutlineRounded, 
    PublicOutlined, 
    NatureOutlined
} from "@mui/icons-material";
import styles from "./awards.module.css";

const AwardsPage = () => {
    const awards = [
        {
            icon: <EmojiEventsOutlined fontSize="inherit" />,
            year: "2023",
            title: "Superfood Brand of the Year",
            desc: "Awarded by the Global Health & Nutrition Council for exemplary quality and consistency in delivering unadulterated natural nutrition."
        },
        {
            icon: <WorkspacePremiumOutlined fontSize="inherit" />,
            year: "2022",
            title: "Excellence in Sourcing",
            desc: "Recognized by the Fair Trade Organization for establishing sustainable and ethical supply chains across 25+ countries."
        },
        {
            icon: <PublicOutlined fontSize="inherit" />,
            year: "2021",
            title: "Best Organic Exporter",
            desc: "Honored with the National Export Excellence Award for driving the global organic foods market with premium Indian produce."
        },
        {
            icon: <NatureOutlined fontSize="inherit" />,
            year: "2020",
            title: "Zero-Carbon Pioneer",
            desc: "Received the Green Earth accolade for transitioning to 100% renewable energy in all our primary processing facilities."
        },
        {
            icon: <StarOutlineRounded fontSize="inherit" />,
            year: "2018",
            title: "Consumer Choice Award",
            desc: "Voted #1 Premium Dry Fruits Brand by over 50,000 households in a nationwide independent consumer trust survey."
        },
        {
            icon: <DiamondOutlined fontSize="inherit" />,
            year: "2015",
            title: "Startup Innovator",
            desc: "Recognized early in our journey for introducing the first-ever UV-sterilized vacuum packaging in the nuts industry."
        }
    ];

    const fadeInDown = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    const cardReveal = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className={styles.awardsContainer}>
            <div className="container">
                {/* Hero Section */}
                <header className={styles.heroHeader}>
                    <motion.span className={styles.subTitle} {...fadeInDown}>Hall of Fame</motion.span>
                    <motion.h1 className={styles.mainTitle} {...fadeInDown} transition={{ delay: 0.2 }}>
                        Recognized for <br /> Excellence
                    </motion.h1>
                    <motion.p className={styles.heroDesc} {...fadeInDown} transition={{ delay: 0.4 }}>
                        Over the years, our relentless pursuit of purity, sustainability, and taste has been 
                        honored by industry leaders and consumers alike. These milestones push us to raise the bar higher.
                    </motion.p>
                </header>

                {/* Awards Grid */}
                <div className={styles.awardsGrid}>
                    {awards.map((award, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.awardCard}
                            {...cardReveal}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.iconBox}>
                                {award.icon}
                            </div>
                            <div className={styles.awardInfo}>
                                <span className={styles.awardYear}>{award.year}</span>
                                <h3 className={styles.awardTitle}>{award.title}</h3>
                                <p className={styles.awardDesc}>{award.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing Highlight */}
                <motion.div 
                    className={styles.highlightSection}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.highlightTitle}>Our Greatest Reward is Your Trust</h2>
                    <p className={styles.highlightDesc}>
                        While trophies look great on a shelf, ensuring that every family has access 
                        to healthy, uncompromised nutrition remains our true reward and ultimate motivation.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AwardsPage;
