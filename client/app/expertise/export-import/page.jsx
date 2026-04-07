"use client";

import React, { useRef } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Public, 
  LocalShipping, 
  VerifiedUser, 
  Inventory, 
  Assessment, 
  FlightTakeoff, 
  Storage, 
  Language, 
  ArrowForward,
  Star,
  SupportAgent,
  FactCheck,
  PrecisionManufacturing,
  LocalShippingOutlined,
  BusinessCenter,
  LanguageOutlined,
  SettingsSuggest,
  TrendingUp,
  Security
} from "@mui/icons-material";
import styles from "./export-import.module.css";

const ExportImportPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const services = [
    {
      title: "Global Distribution",
      desc: "Our robust network spans over 50 countries, delivering premium grade dry fruits and nuts with unmatched speed and efficiency.",
      icon: <Public />,
    },
    {
      title: "Customized Sourcing",
      desc: "We specialize in sourcing the rarest and finest quality products from around the world to meet your unique business requirements.",
      icon: <Inventory />,
    },
    {
      title: "Quality Assurance",
      desc: "Every shipment undergoes rigorous multi-stage quality checks to ensure compliance with international food safety standards.",
      icon: <VerifiedUser />,
    },
    {
      title: "Seamless Logistics",
      desc: "End-to-end logistics solutions, from ocean freight to air cargo, ensuring your products arrive in pristine condition.",
      icon: <LocalShipping />,
    },
    {
      title: "Market Insights",
      desc: "Real-time global market trends and analysis to help you make informed decisions for your export and import strategies.",
      icon: <Assessment />,
    },
    {
      title: "Regulatory Compliance",
      desc: "Complete assistance with international documentation, customs clearances, and trade regulations across diverse jurisdictions.",
      icon: <Storage />,
    },
  ];

  const processSteps = [
    {
      title: "Strategic Sourcing",
      desc: "Direct partnerships with organic farms globally.",
      icon: <PrecisionManufacturing />
    },
    {
      title: "Quality Inspection",
      desc: "Triple-check system for purity and size.",
      icon: <FactCheck />
    },
    {
      title: "Premium Packaging",
      desc: "Vacuum-sealed to preserve natural oils.",
      icon: <Inventory />
    },
    {
      title: "International Transit",
      desc: "Real-time tracking across 50+ countries.",
      icon: <LocalShippingOutlined />
    }
  ];

  const exportProducts = [
    { name: "Premium Almonds", origin: "California, USA", img: "https://images.unsplash.com/photo-1508013861974-9f6347163835?q=80&w=1470&auto=format&fit=crop" },
    { name: "Iranian Pistachios", origin: "Kerman, Iran", img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1470&auto=format&fit=crop" },
    { name: "Chilean Walnuts", origin: "Central Valley, Chile", img: "https://images.unsplash.com/photo-1596502284988-75059d6402ea?q=80&w=1471&auto=format&fit=crop" },
    { name: "Medjool Dates", origin: "Jordan Valley", img: "https://images.unsplash.com/photo-1595166291689-f38b00a0ae5f?q=80&w=1470&auto=format&fit=crop" },
  ];

  const certifications = [
    "ISO 22000", "HACCP Certified", "FSSAI Registered", "USDA Organic", "GlobalG.A.P"
  ];

  const hotspots = [
    { top: "25%", left: "20%", name: "USA" },
    { top: "45%", left: "45%", name: "Europe" },
    { top: "60%", left: "75%", name: "India" },
    { top: "70%", left: "85%", name: "Australia" },
    { top: "35%", left: "60%", name: "Middle East" },
  ];

  return (
    <div className={styles.exportImportContainer}>
      <Head>
        <title>Export & Import | Nutrivia Global Logistics</title>
        <meta name="description" content="Nutrivia's world-class export and import services for premium dry fruits, nuts, and health snacks. Connecting global markets with quality." />
      </Head>

      {/* Hero Section with Parallax */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div 
          className={styles.heroBg} 
          style={{ y: heroY, opacity: heroOpacity }}
        />
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 text-center">
              <motion.div 
                className={styles.heroContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, letterSpacing: "-5px" }}
                  animate={{ opacity: 1, letterSpacing: "5px" }}
                  transition={{ duration: 1.5 }}
                >
                  <span className={styles.heroSubtitle}>
                    CONNECTING FINEST HARVESTS TO THE WORLD
                  </span>
                </motion.div>
                <h1 className={styles.heroTitle}>
                  Global <span className={styles.goldText}>Trading</span> Excellence
                </h1>
                <p className={styles.heroDesc}>
                  From the fertile valleys of California to the exotic groves of the Middle East, Nutrivia bridges the gap between premium nature and the global market.
                </p>
                <div className="d-flex gap-3 justify-content-center mt-4">
                  <button className={styles.ctaButton}>
                    <span>Get a Quote</span>
                    <FlightTakeoff sx={{ fontSize: 20 }} />
                  </button>
                  <button className={styles.secondaryButton}>
                    Our Network
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className={styles.scrollDot}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className="row g-4 align-items-center">
            {[
              { label: "Nations Reached", val: "55+", icon: <LanguageOutlined /> },
              { label: "Annual Volume", val: "2500T+", icon: <TrendingUp /> },
              { label: "Logistic Hubs", val: "12", icon: <SettingsSuggest /> },
              { label: "Success Rate", val: "99.9%", icon: <Security /> }
            ].map((stat, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <motion.div 
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <span className={styles.statValue}>{stat.val}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className={styles.sectionBadgeGold}>OPERATIONAL EXCELLENCE</span>
                <h2 className={styles.sectionTitleWhite}>Our Export Odyssey</h2>
                <div className={styles.sectionLineGold}></div>
              </motion.div>
            </div>
          </div>

          <div className="row g-4">
            {processSteps.map((step, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <motion.div 
                  className={styles.processCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.processIconWrapper}>
                    {step.icon}
                    <div className={styles.processNumber}>{idx + 1}</div>
                  </div>
                  <h4 className={styles.processTitle}>{step.title}</h4>
                  <p className={styles.processDesc}>{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reach Section */}
      <section className={styles.reachSection}>
        <div className={styles.mapTexture} />
        <div className="container position-relative">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.sectionTitle}>Global Trade Epicenter</h2>
                <div className={styles.sectionLine}></div>
                <p className={styles.sectionHeadingDesc}>
                  Strategic distribution networks optimized for peak freshness across every time zone.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12">
              <motion.div 
                className={styles.reachMapContainer}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1470&auto=format&fit=crop" 
                  alt="World Map Trade" 
                  className={styles.reachMap}
                />
                
                <div className={styles.hotspots}>
                  {hotspots.map((spot, i) => (
                    <motion.div 
                      key={i}
                      className={styles.pulsePoint}
                      style={{ top: spot.top, left: spot.left }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className={styles.pulse} />
                      <div className={styles.pulseLabel}>{spot.name}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Belt */}
      <div className={styles.certBelt}>
        <div className={styles.certTrack}>
          {[...certifications, ...certifications, ...certifications].map((cert, i) => (
            <div key={i} className={styles.certItem}>
              <Star sx={{ color: "var(--color-gold)", mr: 1, fontSize: 18 }} />
              {cert}
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.sectionTitleWhite}>Tailored Trade Solutions</h2>
                <div className={styles.sectionLineGold}></div>
              </motion.div>
            </div>
          </div>

          <div className="row g-4">
            {services.map((service, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <motion.div 
                  className={styles.enhancedServiceCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ translateY: -10 }}
                >
                  <div className={styles.glassIcon}>
                    {service.icon}
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>
                    {service.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className="row align-items-center mb-5 gx-0">
            <div className="col-md-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.sectionTitle}>High-Value Commodities</h2>
                <div className={styles.sectionLine}></div>
              </motion.div>
            </div>
            <div className="col-md-4 text-md-end mt-4 mt-md-0">
              <button className={styles.viewMoreBtn}>
                <span>View All</span>
                <ArrowForward sx={{ fontSize: 18 }} />
              </button>
            </div>
          </div>

          <div className="row g-4">
            {exportProducts.map((prod, idx) => (
              <div className="col-sm-6 col-lg-3" key={idx}>
                <motion.div 
                  className={styles.premiumProductCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -15 }}
                >
                  <div className={styles.prodImgWrapper}>
                    <img src={prod.img} alt={prod.name} className={styles.productImg} />
                    <div className={styles.originBadge}>{prod.origin}</div>
                  </div>
                  <div className={styles.prodContent}>
                    <h4 className={styles.prodName}>{prod.name}</h4>
                    <div className={styles.checkLine} />
                    <span className={styles.prodGrade}>PREMIUM GRADED</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className={styles.ultimateCTA}>
        <div className={styles.ctaBgDecor} />
        <div className="container position-relative z-Index-2">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.ctaBox}
              >
                <h2 className={styles.ctaTitle}>Start Your Global Journey</h2>
                <p className={styles.ctaSubtitle}>
                  Whether you are looking to source high-grade dry fruits or expand your brand presence internationally, our specialists are ready to architect your success.
                </p>
                <div className="d-flex flex-wrap gap-4 justify-content-center">
                  <button className={styles.premiumActionButton}>
                    Talk to an Expert
                  </button>
                  <button className={styles.ghostActionButton}>
                    Trade Brochure
                  </button>
                </div>
                
                <div className={styles.ctaTrust}>
                  <div className="d-flex align-items-center gap-2">
                    <SupportAgent sx={{ fontSize: 20 }} /> 24/7 SUPPORT
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <VerifiedUser sx={{ fontSize: 20 }} /> SECURED TRADE
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.pageFooter}>
        <div className="container">
          <p className={styles.footerNote}>NUTRIVIA INTERNATIONAL DIV. — WORLD CLASS LOGISTICS</p>
        </div>
      </footer>


      <motion.div 
        className={styles.floatingInquiry}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <SupportAgent sx={{ color: "#fff", fontSize: 32 }} />
      </motion.div>
    </div>
  );
};

export default ExportImportPage;

