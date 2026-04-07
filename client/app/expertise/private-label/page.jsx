"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  PrecisionManufacturing,
  LocalShipping,
  VerifiedUser,
  Inventory,
  Palette,
  Science,
  ArrowForward,
  SupportAgent,
  CheckCircle,
  LightbulbCircle,
  AccountTree,
  Shield,
  Speed,
  TrendingUp,
  Handshake,
  WorkspacePremium,
  FactCheck,
  Nature
} from "@mui/icons-material";
import styles from "./private-label.module.css";

const PrivateLabelPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  // ─── Dummy Data ───
  const stats = [
    { label: "Brands Launched", val: "120+" },
    { label: "Packaging Styles", val: "45+" },
    { label: "Product SKUs", val: "250+" },
    { label: "Countries Served", val: "30+" }
  ];

  const processSteps = [
    {
      title: "Strategic Ideation",
      desc: "Collaborative workshops to define your brand DNA, target demographics, and market positioning.",
      icon: <LightbulbCircle />
    },
    {
      title: "R&D Formulation",
      desc: "Expert food scientists craft exclusive blends, flavor profiles, and nutritional compositions.",
      icon: <Science />
    },
    {
      title: "Design & Branding",
      desc: "Premium packaging design that maximizes shelf impact and tells your brand story.",
      icon: <Palette />
    },
    {
      title: "Scale Production",
      desc: "State-of-the-art manufacturing with stringent quality oversight at every control point.",
      icon: <PrecisionManufacturing />
    }
  ];

  const expertiseSections = [
    {
      title: "End-to-End Solutions",
      desc: "From sourcing the finest global harvests to final retail-ready distribution, we manage the entire value chain so you can focus purely on building brand equity and customer relationships.",
      points: ["Global Raw Material Sourcing", "Regulatory & Compliance Support", "Inventory & Warehouse Management"],
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
      icon: <AccountTree />
    },
    {
      title: "Premium Packaging",
      desc: "We offer an extensive portfolio of high-end packaging solutions engineered for maximum shelf impact, product freshness preservation, and sustainable sourcing.",
      points: ["Luxury Gift Boxes & Hampers", "Eco-Friendly Stand-Up Pouches", "Premium Glass Jar Collections"],
      img: "https://images.unsplash.com/photo-1592891756120-2f0e212643de?q=80&w=1470&auto=format&fit=crop",
      icon: <Inventory />
    }
  ];

  const productCategories = [
    { name: "Roasted Almonds", tag: "Signature", img: "https://images.unsplash.com/photo-1508013861974-9f6347163835?q=80&w=1470&auto=format&fit=crop" },
    { name: "Exotic Trail Mix", tag: "Exclusive", img: "https://images.unsplash.com/photo-1596502284988-75059d6402ea?q=80&w=1471&auto=format&fit=crop" },
    { name: "Organic Cashews", tag: "Premium", img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1471&auto=format&fit=crop" },
    { name: "Superfood Seeds", tag: "Health+", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1374&auto=format&fit=crop" },
  ];

  const beltItems = [
    "HACCP Certified", "ISO 22000", "Low MOQ", "Rapid Sampling", "Eco Packaging", "Full Traceability", "FSSAI Registered"
  ];

  const whyChoose = [
    {
      title: "Unmatched Quality",
      desc: "Multi-stage inspection protocols and lab-tested outputs guarantee a product your customers can trust.",
      icon: <Shield />
    },
    {
      title: "Speed to Market",
      desc: "From concept to supermarket shelf in as little as 8 weeks with our rapid prototyping pipeline.",
      icon: <Speed />
    },
    {
      title: "Scalable Growth",
      desc: "Infrastructure designed to scale from micro-batch startups to high-volume national brands seamlessly.",
      icon: <TrendingUp />
    },
    {
      title: "Dedicated Support",
      desc: "An assigned brand manager provides end-to-end project coordination and strategic advisory.",
      icon: <Handshake />
    },
    {
      title: "Award-Winning Design",
      desc: "Our in-house creative studio has won multiple packaging design awards across international expos.",
      icon: <WorkspacePremium />
    },
    {
      title: "Compliance Assured",
      desc: "Full regulatory guidance for FSSAI, FDA, EU, and GCC markets included in every engagement.",
      icon: <FactCheck />
    }
  ];

  return (
    <div className={styles.privateLabelContainer}>
      {/* ─── SEO ─── */}
      <head>
        <title>Private Label Solutions | Nutrivia</title>
        <meta name="description" content="Nutrivia's premium private label services for dry fruits and nuts. End-to-end brand creation, formulation, packaging, and global distribution." />
      </head>

      {/* ─── HERO ─── */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div className={styles.heroBg} style={{ y: heroY, opacity: heroOpacity }} />
        <div className={styles.heroOverlay} />

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.span
            className={styles.heroSubtitle}
            initial={{ opacity: 0, letterSpacing: "-2px" }}
            animate={{ opacity: 0.9, letterSpacing: "5px" }}
            transition={{ duration: 1.5 }}
          >
            YOUR VISION. OUR CRAFTSMANSHIP.
          </motion.span>
          <h1 className={styles.heroTitle}>
            Premium <span className={styles.goldText}>Private Label</span> Solutions
          </h1>
          <p className={styles.heroDesc}>
            Elevate your brand with Nutrivia's world-class manufacturing, ethical sourcing, and award-winning packaging design. We transform your vision into market-leading products.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.ctaButton}>
              Consult an Expert <ArrowForward style={{ fontSize: 18 }} />
            </button>
            <button className={styles.secondaryButton}>
              Request Catalog
            </button>
          </div>
        </motion.div>

        <div className={styles.scrollIndicator}>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className={styles.scrollDot}
          />
        </div>
      </section>

      {/* ─── STATS ─── */}
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
                  transition={{ delay: idx * 0.12 }}
                >
                  <span className={styles.statValue}>{stat.val}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS / WORKFLOW ─── */}
      <section className={styles.processSection}>
        <div className="container">
          <div className="text-center mb-5">
            <span className={styles.sectionOverline}>Strategic Workflow</span>
            <h2 className={styles.sectionTitleWhite}>The Road to Brand Success</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className="row g-4">
            {processSteps.map((step, idx) => (
              <div className="col-12 col-sm-6 col-lg-3" key={idx}>
                <motion.div
                  className={styles.processCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <div className={styles.processIconWrapper}>
                    {step.icon}
                    <div className={styles.processNumber}>{idx + 1}</div>
                  </div>
                  <h5 className={styles.processTitle}>{step.title}</h5>
                  <p className={styles.processDesc}>{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERTISE DEEP DIVE ─── */}
      <section className={styles.expertiseSection}>
        <div className="container">
          {expertiseSections.map((sect, idx) => (
            <div className={`row g-5 align-items-center ${idx === 0 ? "mb-5 pb-5" : ""}`} key={idx}>
              {/* Image column */}
              <div className={`col-12 col-md-6 ${idx % 2 !== 0 ? "order-md-2" : ""}`}>
                <motion.div
                  className={styles.expertiseImgWrapper}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                >
                  <img src={sect.img} alt={sect.title} className={styles.expertiseImg} />
                </motion.div>
              </div>
              {/* Text column */}
              <div className={`col-12 col-md-6 ${idx % 2 !== 0 ? "order-md-1" : ""}`}>
                <motion.div
                  className={styles.expertiseTextWrap}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={styles.expertiseIcon}>{sect.icon}</div>
                  <h3 className={styles.expertiseSectionTitle}>{sect.title}</h3>
                  <div className={styles.expertiseLine}></div>
                  <p className={styles.expertiseDesc}>{sect.desc}</p>
                  {sect.points.map((pt, i) => (
                    <div key={i} className={styles.checkItem}>
                      <CheckCircle />
                      <span>{pt}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SCROLLING BELT ─── */}
      <div className={styles.scrollBelt}>
        <div className={styles.scrollTrack}>
          {[...beltItems, ...beltItems].map((item, i) => (
            <div key={i} className={styles.scrollItem}>
              <Nature />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ─── PRODUCT SHOWCASE ─── */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.productsHeader}>
            <div>
              <h2 className={styles.productsHeaderTitle}>Ready-to-Label Range</h2>
              <div className={styles.productsHeaderLine}></div>
            </div>
            <a href="#" className={styles.catalogLink}>
              EXPLORE FULL CATALOG <ArrowForward style={{ fontSize: 16 }} />
            </a>
          </div>

          <div className="row g-4">
            {productCategories.map((prod, idx) => (
              <div className="col-6 col-md-4 col-lg-3" key={idx}>
                <motion.div
                  className={styles.productCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.prodImgWrapper}>
                    <img src={prod.img} alt={prod.name} className={styles.productImg} />
                    <div className={styles.tagBadge}>{prod.tag}</div>
                  </div>
                  <div className={styles.prodContent}>
                    <h6 className={styles.prodName}>{prod.name}</h6>
                    <div className={styles.prodLine}></div>
                    <span className={styles.prodCaption}>Premium Wholesale Grade</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className="text-center mb-5">
            <span className={styles.sectionOverline}>Why Partner With Us</span>
            <h2 className={styles.sectionTitleWhite}>The Nutrivia Advantage</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className="row g-4">
            {whyChoose.map((item, idx) => (
              <div className="col-12 col-sm-6 col-lg-4" key={idx}>
                <motion.div
                  className={styles.whyCard}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.whyIcon}>{item.icon}</div>
                  <h5 className={styles.whyTitle}>{item.title}</h5>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBgDecor}></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.sectionOverline}>Partnership Inquiries</span>
            <h2 className={styles.ctaTitle}>Build Your Brand <br /> Legacy Today</h2>
            <p className={styles.ctaSubtitle}>
              From ambitious startups to established retail giants, we provide the infrastructure and expertise to bring your dry fruit brand to the global forefront.
            </p>
            <button className={styles.ctaMainButton}>Schedule a Consultation</button>

            <div className={styles.ctaTrust}>
              <div className={styles.ctaTrustItem}>
                <VerifiedUser /> Quality Guaranteed
              </div>
              <div className={styles.ctaTrustItem}>
                <LocalShipping /> Global Fulfillment
              </div>
              <div className={styles.ctaTrustItem}>
                <SupportAgent /> 24/7 Support
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FLOATING ACTION ─── */}
      <motion.div
        className={styles.floatingInquiry}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <SupportAgent style={{ fontSize: 28 }} />
      </motion.div>

      {/* ─── FOOTER BELT ─── */}
      <div className={styles.footerBelt}>
        NUTRIVIA MANUFACTURING DIV. — PRIVATE LABEL EXCELLENCE
      </div>
    </div>
  );
};

export default PrivateLabelPage;
