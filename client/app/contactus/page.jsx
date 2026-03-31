"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { 
    EmailOutlined, 
    LocationOnOutlined, 
    PhoneInTalkOutlined, 
    AccessTimeOutlined,
    Facebook,
    Instagram,
    Twitter,
    YouTube,
    SendRounded
} from "@mui/icons-material";
import styles from "./contact.module.css";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for reaching out! We'll get back to you shortly.");
    };

    const contactInfo = [
        {
            icon: <PhoneInTalkOutlined />,
            title: "Customer Helpline",
            text: "+91 76110 77344 (Mon-Sat, 9AM to 7PM)"
        },
        {
            icon: <EmailOutlined />,
            title: "Email Support",
            text: "devkarwa1973@outlook.com | hardyadverts@gmail.com"
        },
        {
            icon: <LocationOnOutlined />,
            title: "Visit Our Experience Store",
            text: "Dadhich Nagar, Mahamandir, Jodhpur, Rajasthan, 342006"
        },
        {
            icon: <AccessTimeOutlined />,
            title: "Social Experience",
            text: "DM us on Instagram for instant recipe ideas!"
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
        <div className={styles.contactContainer}>
            {/* Header Section */}
            <div className="container">
                <header className={styles.heroHeader}>
                    <motion.span className={styles.subTitle} {...fadeInDown}>Get In Touch</motion.span>
                    <motion.h1 className={styles.mainTitle} {...fadeInDown} transition={{ delay: 0.2 }}>
                        We'd Love to Hear <br /> From You
                    </motion.h1>
                </header>

                <div className={styles.mainSection}>
                    {/* Left Side: Info Cards */}
                    <div className={styles.infoSide}>
                        {contactInfo.map((info, idx) => (
                            <motion.div 
                                key={idx} 
                                className={styles.infoCard}
                                {...fadeInUp}
                                transition={{ delay: idx * 0.15 }}
                            >
                                <div className={styles.iconBox}>{info.icon}</div>
                                <h3 className={styles.cardTitle}>{info.title}</h3>
                                <p className={styles.cardText}>{info.text}</p>
                            </motion.div>
                        ))}
                        
                        <motion.div className={styles.socialBox} {...fadeInUp} transition={{ delay: 0.8 }}>
                            <p style={{ fontWeight: 700, color: "var(--color-primary)" }}>Follow Our Journey</p>
                            <div className={styles.socialLinks}>
                                {[{icon: <Instagram/>, url: "#"}, {icon: <Facebook/>, url: "#"}, {icon: <Twitter/>, url: "#"}, {icon: <YouTube/>, url: "#"}].map((social, i) => (
                                    <div key={i} className={styles.socialCircle}>
                                        {social.icon}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <div className={styles.formSide}>
                        <motion.div 
                            className={styles.contactForm}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
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
                                                placeholder="John Doe" 
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
                                                placeholder="john@example.com" 
                                                className={styles.inputField} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Brief Subject</label>
                                    <input 
                                        type="text" 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Bulk Order Enquiry" 
                                        className={styles.inputField} 
                                        required 
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Your Message</label>
                                    <textarea 
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?" 
                                        className={styles.inputField} 
                                        required 
                                    />
                                </div>
                                <Button 
                                    type="submit" 
                                    className={styles.submitBtn}
                                    endIcon={<SendRounded />}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {/* Map Section */}
                <motion.div 
                    className={styles.mapSection}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114487.29602498797!2d72.94814119717022!3d26.270489822001146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c4eaa06ccb9%3A0x8114ea5b0ae1abb8!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1774947539825!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUsPage;