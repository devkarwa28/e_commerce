"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Gavel,
    SupportAgent,
    Schedule,
    AssignmentTurnedIn,
    PsychologyAlt,
    Security,
    ReportProblem,
    CheckCircleOutline
} from "@mui/icons-material";
import styles from "./grievance.module.css";

const GrievancePage = () => {
    // ─── Fake Data ───
    const officerDetails = {
        name: "Mr. Dev Karwa",
        designation: "Grievance Redressal Officer",
        email: "devkarwa1973@outlook.com",
        phone: "+91 76110 77344",
        address: "Nutrivia Head Office, Plot 3A, Sector 2, Jodhpur, Rajasthan - 342006, India",
        availability: "Mon - Fri, 10:00 AM - 6:00 PM"
    };

    const resolutionSteps = [
        {
            icon: <ReportProblem />,
            title: "File an Issue",
            desc: "Contact our support team via email or the helpdesk for initial resolution within 48 hours."
        },
        {
            icon: <PsychologyAlt />,
            title: "Internal Review",
            desc: "If unresolved, your case is escalated to our quality assurance department for a deep-dive analysis."
        },
        {
            icon: <Gavel />,
            title: "Grievance Officer",
            desc: "Final escalation level where the designated officer reviews the case as per consumer protection rules."
        },
        {
            icon: <AssignmentTurnedIn />,
            title: "Resolution",
            desc: "A formal resolution letter is shared with the customer detailing the outcome and actions taken."
        }
    ];

    const faqs = [
        {
            q: "When should I contact the Grievance Officer?",
            a: "Only if your issue hasn't been resolved by our standard customer support team within the promised timeline (usually 7 days)."
        },
        {
            q: "What is the typical resolution time?",
            a: "Most grievances are acknowledged within 48 hours and resolved within 15 working days."
        }
    ];

    return (
        <div className={styles.grievanceContainer}>
            <head>
                <title>Grievance Redressal | Nutrivia Consumer Care</title>
                <meta name="description" content="Nutrivia's transparent grievance redressal mechanism. Ensuring consumer rights and swift resolution of concerns." />
            </head>

            <section className={styles.hero}>
                <div className={styles.heroDecor} />
                <div className="container">
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className={styles.heroTitle}>Grievance Redressal</h1>
                        <p className={styles.heroSubtitle}>
                            We are committed to providing a transparent and efficient mechanism for resolving consumer concerns. Your satisfaction and trust are our priorities.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <motion.div
                                className={styles.card}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={styles.sectionTitle}><Security /> Our Commitment</h2>
                                <div className={styles.policyBox}>
                                    <h4 className={styles.policyTitle}>Consumer Protection Policy</h4>
                                    <p className={styles.policyText}>
                                        In accordance with the Consumer Protection (E-Commerce) Rules, 2020, we have established a robust mechanism to address grievances related to the products and services offered on our platform. We aim to acknowledge all complaints within 48 hours and provide a resolution within one month from the date of receipt.
                                    </p>
                                </div>

                                <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}><Schedule /> Redressal Process</h2>
                                <div className="row g-4">
                                    {resolutionSteps.map((step, idx) => (
                                        <div className="col-sm-6" key={idx}>
                                            <div className={styles.stepCard}>
                                                <div className={styles.stepIcon}>{step.icon}</div>
                                                <h4 className={styles.stepTitle}>{step.title}</h4>
                                                <p className={styles.stepDesc}>{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <div className="col-lg-5">
                            <motion.div
                                className={styles.card}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={styles.sectionTitle}><SupportAgent /> Grievance Officer</h2>
                                <p className={styles.policyText} style={{ marginBottom: '2rem' }}>
                                    If your concern has not been addressed at our support levels, you may reach out to our designated officer:
                                </p>

                                <ul className={styles.infoList}>
                                    <li className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Name</div>
                                        <div className={styles.infoValue}>{officerDetails.name}</div>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Designation</div>
                                        <div className={styles.infoValue}>{officerDetails.designation}</div>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Email</div>
                                        <div className={styles.infoValue} style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{officerDetails.email}</div>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Phone</div>
                                        <div className={styles.infoValue}>{officerDetails.phone}</div>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Hours</div>
                                        <div className={styles.infoValue}>{officerDetails.availability}</div>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Address</div>
                                        <div className={styles.infoValue}>{officerDetails.address}</div>
                                    </li>
                                </ul>

                                <hr style={{ margin: '2.5rem 0', opacity: 0.1 }} />

                                <h3 className={styles.stepTitle} style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CheckCircleOutline sx={{ color: 'var(--color-success)' }} /> Pro-Tip
                                </h3>
                                <p className={styles.stepDesc} style={{ textAlign: 'left' }}>
                                    Always quote your **Order ID** or **Ticket Number** in all communications with the Grievance Officer to ensure a faster resolution.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ background: 'var(--color-primary)', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '1.5rem', fontSize: '0.7rem', letterSpacing: '3px' }}>
                CONSUMER PROTECTION DIVISION — NUTRIVIA COMPLIANCE BUREAU
            </div>
        </div>
    );
};

export default GrievancePage;
