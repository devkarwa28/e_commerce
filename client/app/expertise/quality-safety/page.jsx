"use client";

import React, { useRef } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Verified, 
  Security, 
  Science, 
  Biotech, 
  FactCheck, 
  Shield, 
  HistoryEdu,
  Nature
} from "@mui/icons-material";
import styles from "./quality-safety.module.css";

const QualitySafetyPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const pillars = [
    {
      title: "Purity Protocols",
      desc: "Our products undergo a 12stage purification process ensuring zero contaminants and 100% natural goodness.",
      icon: <Nature />,
    },
    {
      title: "Lab Testing",
      desc: "Every batch is tested in NABL accredited labs checking for moisture, purity, and nutritional consistency.",
      icon: <Science />,
    },
    {
      title: "Precision Sorting",
      desc: "Advanced laser sorting technology ensures only the finest grade A products reach your package.",
      icon: <Biotech />,
    },
    {
      title: "Hygienic Seals",
      desc: "Automated vacuum packaging in a touch-free environment preserves natural oils and freshness.",
      icon: <Security />,
    },
    {
      title: "Global Compliance",
      desc: "Adhering to FSSAI, ISO 22000, and HACCP standards for international food safety excellence.",
      icon: <Verified />,
    },
    {
      title: "Ethical Sourcing",
      desc: "Direct partnerships with organic farmers ensures a transparent and ethical supply chain.",
      icon: <HistoryEdu />,
    },
  ];

  const processSteps = [
    {
      title: "Direct Orchard Sourcing",
      desc: "Handpicked selection directly from certified organic farms globally.",
    },
    {
      title: "Advanced Cold Storage",
      desc: "Storage in moisture-controlled environments to prevent oxidation.",
    },
    {
      title: "Laser Grade Sorting",
      desc: "Removing defects based on size, color, and texture via robotic sensors.",
    },
    {
      title: "Nutritional Appraisal",
      desc: "Verification of mineral and oil content for health claims validation.",
    },
    {
      title: "Bio-Safe Packing",
      desc: "Air-locked packaging process preventing any external exposure.",
    }
  ];

  const certifications = [
    "FSSAI Certified",
    "ISO 22000:2018",
    "HACCP Registered",
    "GMO Free",
    "GMP Compliant",
    "NABL Lab Tested"
  ];

  return (
    <div className={styles.qualitySafetyContainer}>
      <Head>
        <title>Quality & Safety | Nutrivia Expertise</title>
        <meta name="description" content="Nutrivia's commitment to food safety and unmatched quality. Discover our rigorous testing standards and certifications." />
      </Head>

      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div 
          className={styles.heroBg} 
          style={{ y: heroY, opacity: heroOpacity }}
        />
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <motion.div 
                className={styles.heroContent}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className={styles.heroSubtitle}>Uncompromising Standards</span>
                <h1 className={styles.heroTitle}>
                  Quality That You <br />
                  <span className={styles.goldText}>Can Trust Blindly</span>
                </h1>
                <p className={styles.heroDesc}>
                  At Nutrivia, health isn't just a marketing term—it's a scientific commitment. Our state-of-the-art labs and rigorous quality checks define the standard of premium nutrition.
                </p>
                <button className={styles.ctaBtn} onClick={() => {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}>
                  Explore Our Process
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className={styles.pillarSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>The Gold Standard</span>
            <h2 className={styles.sectionTitle}>Our Six Pillars of Quality</h2>
          </div>
          
          <div className="row g-4">
            {pillars.map((pillar, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <motion.div 
                  className={styles.pillarCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.pillarIcon}>{pillar.icon}</div>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDesc}>{pillar.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1480&auto=format&fit=crop" 
                  alt="Quality Lab" 
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ border: "1px solid rgba(200, 155, 60, 0.2)" }}
                />
              </motion.div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <div className={styles.sectionHeader} style={{ textAlign: "left" }}>
                <span className={styles.sectionLabel}>The 5-Step Assurance</span>
                <h2 className={styles.sectionTitle}>Seed to Seal Integrity</h2>
              </div>
              
              <div className={styles.processTimeline}>
                {processSteps.map((step, idx) => (
                  <motion.div 
                    className={styles.processItem} 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className={styles.processNumber}>{idx + 1}</div>
                    <div className={styles.processContent}>
                      <h4 className={styles.processStepTitle}>{step.title}</h4>
                      <p className={styles.processStepDesc}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Strip */}
      <section className={styles.certSection}>
        <div className="container">
          <div className="row g-4 justify-content-center text-center">
            {certifications.map((cert, idx) => (
              <div className="col-6 col-md-4 col-lg-2" key={idx}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ color: "#c89b3c", fontSize: "14px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                    {cert}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className={styles.pillarSection} style={{ background: "#0f0a07" }}>
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row align-items-center">
            <div className="col-lg-6 pe-lg-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
                  <Science sx={{ color: "#c89b3c" }} />
                  <span style={{ color: "#c89b3c", fontWeight: 800, textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px" }}>Precision Engineering</span>
                </div>
                <h2 style={{ fontSize: "38px", fontWeight: 800, marginBottom: "25px" }}>The Science of Freshness</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: "16px", marginBottom: "30px" }}>
                  We utilize robotic laser sorters and nitrogen-flushed packaging systems that maintain the crunch and nutrient profile of every nut. This technology prevents oxidative rancidity, ensuring that your dry fruits taste as fresh as the day they were harvested.
                </p>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FactCheck sx={{ color: "#c89b3c", fontSize: 20 }} />
                      <span style={{ fontWeight: 700 }}>100% Traceable</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FactCheck sx={{ color: "#c89b3c", fontSize: 20 }} />
                      <span style={{ fontWeight: 700 }}>Zero Adulteration</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FactCheck sx={{ color: "#c89b3c", fontSize: 20 }} />
                      <span style={{ fontWeight: 700 }}>AFLA-Free Batch</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FactCheck sx={{ color: "#c89b3c", fontSize: 20 }} />
                      <span style={{ fontWeight: 700 }}>Eco-Safe Sourcing</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
               <motion.div
                  initial={{ opacity: 0, rotate: 5 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1450&auto=format&fit=crop" 
                    alt="Nut Safety" 
                    className="img-fluid rounded-4"
                  />
                </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div 
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield sx={{ fontSize: 60, color: "#c89b3c", mb: 3 }} />
            <h2 className={styles.ctaTitle}>Experience Nutrivia Purity Today</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto" }}>
              Join thousands of health-conscious families who trust us for their daily dose of premium, safe, and nutritious dry fruits.
            </p>
            <button className={styles.ctaBtn}>Shop Certified Products</button>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: "40px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0f0a07" }}>
         <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>
          Nutrivia Quality Assurance Division © 2026
         </p>
      </footer>
    </div>
  );
};

export default QualitySafetyPage;