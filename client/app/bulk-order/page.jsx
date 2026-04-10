"use client";

import React, { useRef, useState } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  DomainVerification, 
  Inventory, 
  LocalShipping, 
  SupportAgent, 
  PriceCheck, 
  Handshake,
  Send
} from "@mui/icons-material";
import styles from "./bulkOrder.module.css";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

const BulkOrderPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    productInterest: "",
    estimatedQuantity: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const features = [
    {
      title: "Wholesale Pricing",
      desc: "Get exclusive tiered pricing blocks for bulk quantities that maximize your margins.",
      icon: <PriceCheck fontSize="large" />,
    },
    {
      title: "Guaranteed Supply",
      desc: "Uninterrupted supply chain from farm directly to your warehouse with strict quality controls.",
      icon: <Inventory fontSize="large" />,
    },
    {
      title: "Dedicated Account Manager",
      desc: "A personalized agent assigned specifically to your account to process requests swiftly.",
      icon: <SupportAgent fontSize="large" />,
    },
    {
      title: "Custom Logistics",
      desc: "Flexible priority shipping and freight arrangements custom-tailored to your deadlines.",
      icon: <LocalShipping fontSize="large" />,
    },
    {
      title: "White-Label Options",
      desc: "Ask about our customizable private labeling solutions for large B2B orders.",
      icon: <DomainVerification fontSize="large" />,
    },
    {
      title: "Long-term Partnerships",
      desc: "Credit facilities and strategic partnership terms available for recurring buyers.",
      icon: <Handshake fontSize="large" />,
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(true);
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        productInterest: "",
        estimatedQuantity: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className={styles.bulkOrderContainer}>
      <Head>
        <title>Bulk Orders | Nutrivia Corporate Solutions</title>
        <meta name="description" content="Nutrivia bulk orders for premium dry fruits, nuts, and health snacks. Ideal for businesses, catering, and institutional needs." />
      </Head>

      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div 
          className={styles.heroBg} 
          style={{ y: heroY, opacity: heroOpacity }}
        />
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <motion.div 
                className={styles.heroContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, letterSpacing: "-2px" }}
                  animate={{ opacity: 1, letterSpacing: "4px" }}
                  transition={{ duration: 1.2 }}
                >
                  <span className={styles.heroSubtitle}>
                    CORPORATE & B2B SOLUTIONS
                  </span>
                </motion.div>
                <h1 className={styles.heroTitle}>
                  Premium <span className={styles.goldText}>Bulk Order</span> Logistics
                </h1>
                <p className={styles.heroDesc}>
                  Power your business with Nutrivia's world-class supply chain. Access premium wholesale dry fruits and nuts with unbeatable scalable pricing and pristine quality.
                </p>
                <div className="d-flex justify-content-center mt-4">
                  <button className={styles.ctaButton} onClick={() => {
                      document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <span>Request a Custom Quote</span>
                    <Inventory sx={{ fontSize: 20 }} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Numbers Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>B2B Partners</div>
            </div>
            <div className="col-6 col-md-3">
              <div className={styles.statNumber}>1500T</div>
              <div className={styles.statLabel}>Annual Volume</div>
            </div>
            <div className="col-6 col-md-3">
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>On-Time Delivery</div>
            </div>
            <div className="col-6 col-md-3">
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Dedicated Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.sectionTitle}>Why Partner With Us?</h2>
                <div className={styles.sectionLine}></div>
              </motion.div>
            </div>
          </div>

          <div className="row g-4">
            {features.map((feature, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <motion.div 
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection} id="quote-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <motion.div 
                className={styles.formCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Initiate Bulk Inquiry</h2>
                  <div className={styles.sectionLine}></div>
                  <p className="mt-3 text-muted" style={{ fontSize: "16px" }}>
                    Fill out the form below with your requirements and a dedicated account manager will respond within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Company Name*</label>
                        <input 
                          type="text" 
                          name="companyName"
                          className={styles.inputField} 
                          required 
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Acme Corp" 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Contact Name*</label>
                        <input 
                          type="text" 
                          name="contactName"
                          className={styles.inputField} 
                          required 
                          value={formData.contactName}
                          onChange={handleChange}
                          placeholder="John Doe" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Business Email*</label>
                        <input 
                          type="email" 
                          name="email"
                          className={styles.inputField} 
                          required 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com" 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Phone Number*</label>
                        <input 
                          type="tel" 
                          name="phone"
                          className={styles.inputField} 
                          required 
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Product Categories of Interest*</label>
                        <select 
                          className={styles.inputField} 
                          required 
                          name="productInterest"
                          value={formData.productInterest}
                          onChange={handleChange}
                          style={{ appearance: "auto", cursor: "pointer" }}
                        >
                          <option value="" disabled>Select category...</option>
                          <option value="Dry Fruits (Almonds, Cashews, etc.)">Dry Fruits</option>
                          <option value="Exotic Berries">Exotic Berries</option>
                          <option value="Combo Gift Boxes">Combo Gift Boxes</option>
                          <option value="Mixed Assortment">Mixed Assortment</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Estimated Quantity (Monthly)*</label>
                        <select 
                          className={styles.inputField} 
                          required
                          name="estimatedQuantity"
                          value={formData.estimatedQuantity}
                          onChange={handleChange}
                          style={{ appearance: "auto", cursor: "pointer" }}
                        >
                          <option value="" disabled>Select volume...</option>
                          <option value="50 - 200 KG">50 - 200 KG</option>
                          <option value="201 - 500 KG">201 - 500 KG</option>
                          <option value="501 - 1000 KG">501 - 1000 KG</option>
                          <option value="1 Tonne +">1 Tonne +</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Additional Message / Special Requirements</label>
                    <textarea 
                      className={styles.inputField} 
                      rows="4" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about specific packaging needs, delivery timelines, or product grades..."
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : (
                      <>Submit Inquiry <Send sx={{ ml: 1, fontSize: 18 }} /></>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Snackbar 
        open={successMsg} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMsg(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessMsg(false)} severity="success" sx={{ width: '100%', bgcolor: '#2e7d32', color: '#fff' }}>
          Bulk inquiry submitted successfully! Our team will contact you shortly.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BulkOrderPage;
