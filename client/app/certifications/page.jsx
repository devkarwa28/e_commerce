"use client";

import { motion } from "framer-motion";
import { 
    HealthAndSafetyOutlined, 
    VerifiedUserOutlined, 
    ScienceOutlined, 
    WorkspacePremiumOutlined, 
    Inventory2Outlined,
    CheckCircleOutlineRounded,
    AssignmentTurnedInRounded,
    NatureOutlined
} from "@mui/icons-material";
import styles from "./cert.module.css";

const CertificationsPage = () => {
    const certs = [
        {
            icon: <VerifiedUserOutlined fontSize="inherit" />,
            name: "FSSAI Licensed",
            id: "LIC NO: 10022013000542",
            desc: "Full compliance with the Food Safety and Standards Authority of India (FSSAI) for manufacturing and distribution."
        },
        {
            icon: <WorkspacePremiumOutlined fontSize="inherit" />,
            name: "ISO 22000:2018",
            id: "CERT ID: FSMS-77344",
            desc: "Global excellence in Food Safety Management Systems ensuring hazards are controlled across the entire supply chain."
        },
        {
            icon: <NatureOutlined fontSize="inherit" />,
            name: "NPOP Organic",
            id: "ORG ID: IND-028-2026",
            desc: "Certified organic under the National Programme for Organic Production (NPOP) ensuring 100% pesticide-free produce."
        },
        {
            icon: <HealthAndSafetyOutlined fontSize="inherit" />,
            name: "HACCP Certified",
            id: "HAZ-0012-NUTRI",
            desc: "Hazard Analysis and Critical Control Points (HACCP) system certified for food hygiene and risk prevention."
        },
        {
            icon: <ScienceOutlined fontSize="inherit" />,
            name: "Lab Tested",
            id: "LAB REF: QL-2024-MAH",
            desc: "Every batch is tested in NABL accredited labs for purity, moisture content, and nutritional value before packing."
        },
        {
            icon: <Inventory2Outlined fontSize="inherit" />,
            name: "BRCGS Food Safety",
            id: "GLOBAL STD: V-2026",
            desc: "Adherence to BRC Global Standards for Food Safety, recognized by GFSI, for our advanced processing facilities."
        }
    ];

    const fadeInDown = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className={styles.certContainer}>

            <div className="container">
                <header className={styles.heroHeader}>
                    <motion.span className={styles.subTitle} {...fadeInDown}>Certified Purity</motion.span>
                    <motion.h1 className={styles.mainTitle} {...fadeInDown} transition={{ delay: 0.2 }}>
                        Our Commitment to <br /> Unwavering Quality
                    </motion.h1>
                    <motion.p className={styles.heroDesc} {...fadeInDown} transition={{ delay: 0.4 }}>
                        At Nutrivia, excellence isn't just a promise—it's a benchmark. We maintain 
                        the highest levels of global certifications to ensure that the superfoods you 
                        consume are as pure as nature intended.
                    </motion.p>
                </header>

                <div className={styles.certGrid}>
                    {certs.map((cert, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.certCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <div className={styles.badgeCircle}>{cert.icon}</div>
                            <h3 className={styles.certName}>{cert.name}</h3>
                            <span className={styles.certId}>{cert.id}</span>
                            <p className={styles.certDesc}>{cert.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className={styles.auditSection}
                    {...fadeInUp}
                    transition={{ duration: 1 }}
                >
                    <div className={styles.auditText}>
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <AssignmentTurnedInRounded sx={{ fontSize: 48, color: "var(--color-gold)" }} />
                            <h2 className="m-0" style={{ fontSize: "38px", fontWeight: 800 }}>Nutrivia Signature <br /> Audit Protocol</h2>
                        </div>
                        <p style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.8", margin: 0 }}>
                            Beyond external certifications, we run a daily 14-point quality check at 
                            our processing facility. From moisture sensing to ultraviolet sorting, 
                            we leave no stone unturned in our quest for the perfect snack.
                        </p>
                    </div>

                    <div className={styles.auditPoints}>
                        {[
                            "UV-Sterilized Packaging Facility",
                            "Strict 21-Parameter Moisture Control",
                            "Aflatoxin & Microbial Batch Testing",
                            "Ethical Sourcing & Fair Trade Audits",
                            "Zero Humid Storage Conditions"
                        ].map((point, idx) => (
                            <motion.div 
                                key={idx} 
                                className={styles.auditPoint}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + (idx * 0.1) }}
                            >
                                <CheckCircleOutlineRounded className={styles.checkIcon} />
                                <span>{point}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CertificationsPage;