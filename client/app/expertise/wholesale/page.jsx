"use client";

import React, { useRef } from "react"; 
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BusinessCenter,
  Inventory,
  LocalShipping,
  Discount,
  CheckCircle,
  Download,
  ArrowForward,
  Star,
  SupportAgent,
  FactCheck,
  PrecisionManufacturing,
  AccountTree,
  Warehouse
} from "@mui/icons-material";
import styles from "./wholesale.module.css";

const WholesalePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const stats = [
    { label: "Partner Outlets", val: "2,500+" },
    { label: "Bulk Shipments", val: "15,000+" },
    { label: "Warehouse Capacity", val: "10,000T" },
    { label: "Global Reach", val: "40+ Nations" }
  ];

  const offerings = [
    {
      title: "Bulk Dry Fruits",
      desc: "Premium grade almonds, cashews, walnuts, and exotic dates available in bulk packaging from 5kg to 50kg bags.",
      icon: <Inventory />
    },
    {
      title: "Customized Mixes",
      desc: "Tailored trail mixes and nut blends designed for high-volume retail chains and catering services.",
      icon: <AccountTree />
    },
    {
      title: "Horeca Supply",
      desc: "Dedicated supply chain solutions for Hotels, Restaurants, and Cafes with standardized quality consistency.",
      icon: <Warehouse />
    },
    {
      title: "Institutional Contracts",
      desc: "Long-term contract manufacturing and supply for larger corporations and educational institutions.",
      icon: <BusinessCenter />
    }
  ];

  const processSteps = [
    {
      title: "Sample Evaluation",
      desc: "Request a premium sample kit to verify our industry-leading quality standards before committing.",
      icon: <FactCheck />
    },
    {
      title: "Volume Pricing",
      desc: "Our trade specialists architect tiered pricing structures optimized for your specific scale.",
      icon: <Discount />
    },
    {
      title: "Production & QC",
      desc: "Fresh batch processing with multi-stage laboratory testing for purity and size grading.",
      icon: <PrecisionManufacturing />
    },
    {
      title: "Logistics Sync",
      desc: "Real-time tracking and climate-controlled delivery to your distribution hubs globally.",
      icon: <LocalShipping />
    }
  ];

  const bulkProducts = [
    { name: "California Almonds", moq: "Min: 100kg", tag: "Grade A++", img: "https://images.unsplash.com/photo-1508013861974-9f6347163835?q=80&w=1470&auto=format&fit=crop" },
    { name: "Indian W240 Cashews", moq: "Min: 50kg", tag: "Whole Jumbo", img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1471&auto=format&fit=crop" },
    { name: "Premium Walnuts", moq: "Min: 80kg", tag: "Extra Light", img: "https://images.unsplash.com/photo-1596502284988-75059d6402ea?q=80&w=1471&auto=format&fit=crop" },
    { name: "Turkish Apricots", moq: "Min: 60kg", tag: "Sun-Dried", img: "https://images.unsplash.com/photo-1595166291689-f38b00a0ae5f?q=80&w=1470&auto=format&fit=crop" },
  ];

  const beltLabels = [
    "FSSAI Certified", "ISO 22000", "HACCP Audited", "Direct Import", "Pesticide Free", "Lab Tested", "Bulk Export"
  ];

  const benefits = [
    "Competitive High-Volume Pricing",
    "Consistent Seasonal Inventory",
    "Tailored Packaging Options",
    "Dedicated Account Manager",
    "Flexible Credit Facilities"
  ];

  return (
    <div className={styles.wholesaleContainer}>
      {/* SEO Metadata */}
      <head>
        <title>Bulk Wholesale Dry Fruits & Nuts | Nutrivia Trade</title>
        <meta name="description" content="Nutrivia's enterprise-grade wholesale solutions for premium dry fruits and nuts. Global distribution, bulk pricing, and unmatched quality control." />
      </head>

      {/* Hero Section */}
      <section className={styles.hero} ref={containerRef}>
        <motion.div 
          className={styles.heroBg} 
          style={{ y: heroY, opacity: heroOpacity }}
        />
        <div className={styles.heroOverlay}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.span 
              className={styles.heroSubtitle}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              NUTRIVIA ENTERPRISE SOLUTIONS
            </motion.span>
            <h1 className={styles.heroTitle}>
              Scale Your <br /><span className={styles.goldText}>Volume Commerce</span>
            </h1>
            <p className={styles.heroDesc}>
              Nutrivia empowers global distributors and retail chains with a high-performance supply chain, uncompromised quality standards, and deep-market insights.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.ctaButton}>
                Get Wholesale Quote <ArrowForward style={{ fontSize: 18 }} />
              </button>
              <button className={styles.secondaryButton}>
                Download Trade Deck
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <motion.div 
            animate={{ y: [0, 16, 0] }} 
            transition={{ repeat: Infinity, duration: 2.5 }}
            className={styles.scrollDot}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <motion.div 
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className={styles.statValue}>{stat.val}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className={styles.offerSection}>
        <div className="container">
          <span className={styles.sectionOverline}>Our Bulk Capabilities</span>
          <h2 className={styles.sectionTitle}>Wholesale Dominance</h2>
          <div className={styles.sectionLine}></div>
          
          <div className="row g-4 pt-4">
            {offerings.map((offer, idx) => (
              <div className="col-12 col-sm-6 col-lg-3" key={idx}>
                <motion.div 
                  className={styles.offerCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <div className={styles.offerIconWrap}>
                    {offer.icon}
                  </div>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerDesc}>{offer.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.catalogBelt}>
        <div className={styles.catalogTrack}>
          {[...beltLabels, ...beltLabels].map((label, i) => (
            <div key={i} className={styles.beltItem}>
              <Star />
              {label}
            </div>
          ))}
        </div>
      </div>

      <section className={styles.processSection}>
        <div className="container">
          <span className={styles.sectionOverline}>Service Protocol</span>
          <h2 className={styles.sectionTitleWhite}>The Trade Gateway</h2>
          <div className={styles.sectionLine}></div>
          
          <div className="row g-4 pt-5">
            {processSteps.map((step, idx) => (
              <div className="col-12 col-sm-6 col-md-3" key={idx}>
                <motion.div 
                  className={styles.processCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <div className={styles.processNum}>{idx + 1}</div>
                  <div className={styles.processIcon}>{step.icon}</div>
                  <h4 className={styles.processTitle}>{step.title}</h4>
                  <p className={styles.processDesc}>{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.catalogHeader}>
            <div className={styles.catalogTitleWrap}>
              <h2 className={styles.catalogSectionTitle}>Trade Commodities</h2>
              <div className={styles.catalogSectionLine}></div>
            </div>
            <button className={styles.secondaryButton} style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}>
              Wholesale Catalog (PDF) <Download style={{ marginLeft: 10, fontSize: 18 }} />
            </button>
          </div>

          <div className="row g-4">
            {bulkProducts.map((prod, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <motion.div 
                  className={styles.bulkCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <div className={styles.bulkImgWrap}>
                    <img src={prod.img} alt={prod.name} className={styles.bulkImg} />
                    <span className={styles.bulkTag}>{prod.tag}</span>
                  </div>
                  <div className={styles.bulkContent}>
                    <h5 className={styles.bulkName}>{prod.name}</h5>
                    <span className={styles.bulkMoq}>{prod.moq}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBgWrap} />
        <div className="container">
          <motion.div 
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className={styles.sectionOverline} style={{ textAlign: "center" }}>Volume Inquiries</span>
            <h2 className={styles.ctaTitleMain}>Architect Your <br /> Supply Chain</h2>
            <p className={styles.ctaDesc}>
              Whether you are a global brand looking for a strategic partner or a retail chain upgrading your dry fruit category, our trade experts are ready to design your success roadmap.
            </p>
            <div className="text-center">
              <button className={styles.ctaSubmitBtn}>
                Talk to Trade Specialist
              </button>
            </div>
            
            <div className={styles.ctaTrustWrap}>
              <div className={styles.trustItem}><CheckCircle sx={{ color: "var(--color-gold)" }} /> FSSAI Central Licensed</div>
              <div className={styles.trustItem}><CheckCircle sx={{ color: "var(--color-gold)" }} /> Global Logistics Support</div>
              <div className={styles.trustItem}><CheckCircle sx={{ color: "var(--color-gold)" }} /> Dedicated Account Manager</div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div 
        className={styles.fabWrap}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <SupportAgent fontSize="large" />
      </motion.div>

      <div className={styles.footerStrip}>
        NUTRIVIA INTERNATIONAL DIV. — WHOLESALE SERVICES V.2.1
      </div>
    </div>
  );
};

export default WholesalePage;
