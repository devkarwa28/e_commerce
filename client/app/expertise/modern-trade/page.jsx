"use client";

import React, { useRef } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Store, 
  LocalShipping, 
  BarChart, 
  AutoAwesome, 
  BusinessCenter, 
  SupportAgent, 
  Visibility, 
  Layers
} from "@mui/icons-material";
import { Box, Container, Typography, Button } from "@mui/material";
import styles from "./modern-trade.module.css";

const ModernTradePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const pillars = [
    {
      title: "Omnichannel Efficiency",
      desc: "Synchronized distribution across hypermarkets, supermarket chains, and high-end boutique stores with zero lead-time delay.",
      icon: <Store fontSize="large" />,
    },
    {
      title: "Category Dominance",
      desc: "Strategic shelf-placement and inventory management that ensures Nutrivia remains the top choice for discerning shoppers.",
      icon: <Layers fontSize="large" />,
    },
    {
      title: "Logistics Agility",
      desc: "Proprietary real-time restocking system that maintains a 99.5% fill rate across any scale of retail operation.",
      icon: <LocalShipping fontSize="large" />,
    },
    {
      title: "Data-Driven Growth",
      desc: "We provide retail partners with consumer insights and sale analytics to optimize product positioning and volume.",
      icon: <BarChart fontSize="large" />,
    },
  ];

  const retailPartners = [
    "REVALIA MARKET", "ZENITH FRESH", "LUMINA STORES", "PRIME PANTRY", "AURUM SELECT", "NOVA RETAIL", "VISTA MART", "OPUS FOODS"
  ];

  const galleryItems = [
    {
      title: "Premium Display Systems",
      desc: "Our customized point-of-sale displays are designed to accentuate the luxury of our products.",
      img: "https://images.unsplash.com/photo-1542838132-92c53300302c?q=80&w=1471&auto=format&fit=crop"
    },
    {
      title: "Nationwide Reach",
      desc: "From metro cities to emerging markets, our distribution network is built for scale and speed.",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Freshness-First Supply",
      desc: "State-of-the-art cold chain and climate-controlled logistics for every single store.",
      img: "https://images.unsplash.com/photo-1574630810530-347dedbd394f?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  const stats = [
    { val: "2,500+", label: "Premium Stores" },
    { val: "150+", label: "Retail Chains" },
    { val: "98.8%", label: "Average Fill Rate" },
    { val: "12Hr", label: "Restock Velocity" }
  ];

  return (
    <div className={styles.modernTradeContainer}>
      <Head>
        <title>Modern Trade Solutions | Nutrivia Organized Retail</title>
        <meta name="description" content="Empowering modern retail chains with premium food products, agile logistics, and category management expertise. Nutrivia is your elite retail partner." />
      </Head>

      {/* Hero Section */}
      <section className={styles.hero} ref={containerRef}>
        <motion.div 
          className={styles.heroBg} 
          style={{ y: heroY, opacity: heroOpacity }}
        />
        <div className={styles.heroOverlay}></div>
        
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <Typography variant="h6" className={styles.heroSubtitle}>
              ORGANIZED RETAIL & DISTRIBUTION
            </Typography>
            <h1 className={styles.heroTitle}>
              Elevating the <br /><span className={styles.goldText}>Retail Floor</span>
            </h1>
            <Typography variant="body1" className={styles.heroDesc}>
              Nutrivia is the strategic partner of choice for leading hypermarkets and gourmet chains, delivering uncompromised quality and reliability at a nationwide scale.
            </Typography>
            <Box display="flex" gap={3} justifyContent="center" mt={4}>
              <Button className={styles.ctaButton} variant="contained" endIcon={<Visibility />}>
                View Retail Profile
              </Button>
              <Button variant="outlined" className={styles.secondaryButton}>
                Store Network
              </Button>
            </Box>
          </motion.div>
        </Container>
      </section>

      {/* Retail Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className={styles.statItem}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className={styles.statValue}>{stat.val}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern Trade Partners Section */}
      <section className={styles.partnersSection}>
        <Container maxWidth="lg">
          <Typography variant="h3" className={styles.sectionTitle}>Strategic Alliances</Typography>
          <div className={styles.sectionLine}></div>
          <Typography variant="body1" sx={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 80px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>
            "Our reputation is built on the shelf SPACE we share with the world’s leading retail groups."
          </Typography>

          <div className={styles.partnersGrid}>
            {retailPartners.map((partner, idx) => (
              <motion.div 
                key={idx} 
                className={styles.partnerLogo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Pillars Section */}
      <section className={styles.pillarSection}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={10}>
            <Box>
              <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700 }}>The Nutrivia Protocol</Typography>
              <div className={styles.sectionLine} style={{ margin: "15px 0" }}></div>
            </Box>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)", maxWidth: "450px" }}>
              Tailoring our operational backbone to meet the specific demands of high-volume organized commerce.
            </Typography>
          </Box>

          <div className={styles.pillarGrid}>
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx} 
                className={styles.pillarCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={styles.pillarIcon}>
                  {pillar.icon}
                </div>
                <Typography variant="h4" className={styles.pillarTitle}>{pillar.title}</Typography>
                <Typography variant="body2" className={styles.pillarDesc}>
                  {pillar.desc}
                </Typography>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Retail Concept Showcase */}
      <section className={styles.retailGallery}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={10}>
            <Typography variant="h3" className={styles.sectionTitle}>Precision Execution</Typography>
            <div className={styles.sectionLine}></div>
          </Box>

          <div className={styles.galleryLayout}>
            {galleryItems.map((item, idx) => (
              <motion.div 
                key={idx} 
                className={styles.galleryItem}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <img src={item.img} alt={item.title} className={styles.galleryImg} />
                <div className={styles.galleryOverlay}>
                  <Typography variant="h4" className={styles.galleryTitle}>{item.title}</Typography>
                  <Typography variant="body2" className={styles.galleryDesc}>{item.desc}</Typography>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBgDecor}></div>
        <Container maxWidth="lg">
          <motion.div 
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="overline" sx={{ color: "var(--color-gold)", letterSpacing: 4, fontWeight: 700 }}>PARTNERSHIP INQUIRIES</Typography>
            <Typography variant="h3" className={styles.ctaTitle}>Empower Your Store with <br /> Excellence</Typography>
            <Typography variant="body1" className={styles.ctaSubtitle}>
              Join a network of over 150 leading retail chains who trust Nutrivia to define their premium food category.
            </Typography>
            <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
              <Button className={styles.ctaButton}>
                Become a Partner
              </Button>
              <Button variant="outlined" sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)", borderRadius: "50px", px: 4, py: 1.5, fontWeight: 700 }}>
                Download Sales Kit
              </Button>
            </Box>
            
            <Box mt={10} display="flex" justifyContent="center" gap={6} flexWrap="wrap">
              {[
                { icon: <SupportAgent />, text: "Key Account Manager" },
                { icon: <BusinessCenter />, text: "Bulk Contracts" },
                { icon: <AutoAwesome />, text: "Custom Branding" }
              ].map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, opacity: 0.6 }}>
                  {item.icon}
                  <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1 }}>{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Container>
      </section>

      {/* Minimalistic Retail Footer Branding */}
      <Box sx={{ py: 6, textAlign: "center", backgroundColor: "#0e0e0e", color: "rgba(255,255,255,0.2)" }}>
        <Typography variant="caption" sx={{ letterSpacing: 3 }}>NUTRIVIA GROUP — MODERN TRADE SOLUTIONS V.2.0</Typography>
      </Box>
    </div>
  );
};

export default ModernTradePage;
