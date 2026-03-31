"use client";

import { motion } from "framer-motion";
import { 
    LinkedIn, 
    Twitter, 
    Facebook,
    GroupsOutlined,
    FingerprintOutlined
} from "@mui/icons-material";
import styles from "./leadership.module.css";

const LeadershipPage = () => {
    const leaders = [
        {
            name: "Dr. Arvind Maheshwari",
            role: "Founder & Chairman",
            bio: "With over 30 years of experience in the dry fruit industry, Dr. Maheshwari's vision of 'Nutrify the World' laid the foundation of Nutrivia."
        },
        {
            name: "Dev Karwa",
            role: "Chief Executive Officer",
            bio: "A visionary strategist and tech enthusiast, Dev leads the digital transformation and global expansion of Nutrivia's premium supply chain."
        },
        {
            name: "Meera Rajpurohit",
            role: "Head of Operations",
            bio: "Meera ensures that every almond and date meets our stringent A-Grade quality standards before it reaches our customers' homes."
        },
        {
            name: "Vikram Rathore",
            role: "Director of Sourcing",
            bio: "Vikram spends 200 days a year visiting global orchards from California to Iran, ensuring we have the first pick of each season's harvest."
        },
        {
            name: "Sanya Dadhich",
            role: "Chief Marketing Officer",
            bio: "Sanya is the creative force behind our premium branding, focusing on making natural health a lifestyle choice for the modern consumer."
        },
        {
            name: "Rahul Godara",
            role: "Product Innnovation Lead",
            bio: "Rahul leads the research in superfood blending, creating the unique nut & seed mixes that have become Nutrivia's signature products."
        }
    ];

    const fadeInDown = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    const cardReveal = {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className={styles.leaderContainer}>
            <div className="container">
                <header className={styles.heroHeader}>
                    <motion.span className={styles.subTitle} {...fadeInDown}>Our Visionaries</motion.span>
                    <motion.h1 className={styles.mainTitle} {...fadeInDown} transition={{ delay: 0.2 }}>
                        Leading the Journey to <br /> a Healthier Future
                    </motion.h1>
                    <motion.p className={styles.heroDesc} {...fadeInDown} transition={{ delay: 0.4 }}>
                        Meet the passion and expertise behind Nutrivia. Our leadership team brings together 
                        decades of tradition with modern innovation to redefine premium nutrition.
                    </motion.p>
                </header>

                <div className={styles.teamGrid}>
                    {leaders.map((leader, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.leaderCard}
                            {...cardReveal}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.photoPlaceholder}>
                                <GroupsOutlined className={styles.photoIcon} />
                            </div>
                            <div className={styles.leaderInfo}>
                                <span className={styles.leaderRole}>{leader.role}</span>
                                <h3 className={styles.leaderName}>{leader.name}</h3>
                                <p className={styles.leaderBio}>{leader.bio}</p>
                                <div className={styles.socialRow}>
                                    <LinkedIn className={styles.socialIcon} fontSize="small" />
                                    <Twitter className={styles.socialIcon} fontSize="small" />
                                    <Facebook className={styles.socialIcon} fontSize="small" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                
                <motion.div 
                    className="text-center mt-5 pt-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                >
                    <div className="d-inline-block p-4" style={{ background: "#F8F6F4", borderRadius: "30px", border: "1px solid rgba(200, 155, 60, 0.2)" }}>
                        <div className="d-flex align-items-center gap-3">
                            <FingerprintOutlined sx={{ fontSize: 40, color: "var(--color-gold)" }} />
                            <p className="m-0" style={{ fontWeight: 700, color: "var(--color-primary)", letterSpacing: "1px" }}>
                                DRIVEN BY AUTHENTICITY, GUIDED BY HERITAGE.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LeadershipPage;