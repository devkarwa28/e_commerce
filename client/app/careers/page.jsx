"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { 
    HealthAndSafetyOutlined, 
    Diversity1Outlined, 
    AutoGraphOutlined,
    CloudUploadOutlined,
    SendRounded
} from "@mui/icons-material";
import styles from "./careers.module.css";

const CareersPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        portfolio: "",
        resume: null
    });

    const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            setFormData({ ...formData, resume: e.target.files[0] });
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Application Data:", formData);
        alert("Thank you for applying! Our HR team will review your application and get back to you.");
    };

    const perks = [
        {
            icon: <HealthAndSafetyOutlined fontSize="inherit" />,
            title: "Holistic Wellness",
            desc: "Comprehensive health insurance, mental health support, and gym memberships for all employees."
        },
        {
            icon: <Diversity1Outlined fontSize="inherit" />,
            title: "Inclusive Culture",
            desc: "A globally diverse, inclusive workplace where every voice matters and cross-collaboration thrives."
        },
        {
            icon: <AutoGraphOutlined fontSize="inherit" />,
            title: "Career Growth",
            desc: "Annual learning stipends, robust mentorship programs, and fast-track opportunities to leadership."
        }
    ];

    const fadeInDown = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className={styles.careersContainer}>
            <div className="container">
                {/* Hero Section */}
                <header className={styles.heroHeader}>
                    <motion.span className={styles.subTitle} {...fadeInDown}>Join Nutrivia</motion.span>
                    <motion.h1 className={styles.mainTitle} {...fadeInDown} transition={{ delay: 0.2 }}>
                        Shape the Future <br /> of Natural Nutrition
                    </motion.h1>
                    <motion.p className={styles.heroDesc} {...fadeInDown} transition={{ delay: 0.4 }}>
                        We're looking for passionate individuals who believe in the power of wholesome, premium dietary 
                        choices. Help us build a healthier world, one step at a time.
                    </motion.p>
                </header>

                {/* Company Perks */}
                <div className={styles.perksGrid}>
                    {perks.map((perk, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.perkCard}
                            {...fadeInUp}
                            transition={{ delay: i * 0.15 }}
                        >
                            <div className={styles.perkIcon}>{perk.icon}</div>
                            <h3 className={styles.perkTitle}>{perk.title}</h3>
                            <p className={styles.perkDesc}>{perk.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Application Form */}
                <motion.div 
                    className={styles.formSection}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.formSectionTitle}>Apply Now</h2>
                    <p className={styles.formSectionDesc}>Don't see an open role? Submit your details anyway, and we'll reach out if a fit opens up.</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={styles.formGroup}>
                                    <label>Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Jane Doe" 
                                        className={styles.inputField} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles.formGroup}>
                                    <label>Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="jane.doe@example.com" 
                                        className={styles.inputField} 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210" 
                                        className={styles.inputField} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles.formGroup}>
                                    <label>Position Applied For</label>
                                    <select 
                                        name="role" 
                                        value={formData.role} 
                                        onChange={handleChange} 
                                        className={styles.selectField}
                                        required
                                    >
                                        <option value="" disabled>Select a Role...</option>
                                        <option value="marketing">Marketing Specialist</option>
                                        <option value="supply-chain">Supply Chain Manager</option>
                                        <option value="developer">Frontend Developer</option>
                                        <option value="sales">Sales Executive</option>
                                        <option value="general">General Consideration</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>LinkedIn / Portfolio URL</label>
                            <input 
                                type="url" 
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..." 
                                className={styles.inputField} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Upload Resume / CV (PDF, DOCX)</label>
                            <div className={styles.fileUploadWrapper}>
                                <input 
                                    type="file" 
                                    name="resume" 
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className={styles.fileInput} 
                                    required
                                />
                                <CloudUploadOutlined sx={{ fontSize: 40, color: "var(--color-gold)", mb: 1 }} />
                                <div>
                                    {fileName ? (
                                        <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>{fileName}</span>
                                    ) : (
                                        <span style={{ color: "var(--color-text-secondary)" }}>Drag and drop or click to upload</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className={styles.submitBtn}
                            endIcon={<SendRounded />}
                        >
                            Submit Application
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CareersPage;