"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  WorkspacePremium,
  AutoAwesome,
  Celebration,
  ArrowForward,
  Star,
  CheckCircle,
  LocalShipping,
  Handshake,
  AllInclusive
} from "@mui/icons-material";
import styles from "./gifting.module.css";

const GiftingPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // fake data
  const giftCategories = [
    {
      title: "Festive Hampers",
      count: "12 Designs",
      img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1440&auto=format&fit=crop"
    },
    {
      title: "Corporate Gifting",
      count: "8 Collections",
      img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Wedding Favors",
      count: "15 Styles",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop"
    }
  ];

  const giftProducts = [
    {
      id: 1,
      name: "The Royal Nutrivia Box",
      price: "RS 8900.00",
      desc: "An opulent collection including Jumbo Almonds, Roasted Pistachios, and stuffed Medjool Dates in a velvet lined wooden box.",
      tag: "Best Seller",
      img: "https://plus.unsplash.com/premium_photo-1663045231713-79d20c58e17b?q=80&w=1471&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Heritage Silver Hamper",
      price: "RS 12,500.00",
      desc: "A silver-plated tray featuring our finest selection of hand-picked Cashews and Saffron-infused Walnuts.",
      tag: "Limited Edition",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Wellness Ritual Gift",
      price: "RS 5500.00",
      desc: "For the health-conscious. Features Organic Trail Mix, Raw Seeds, and Premium Green Tea leaf blends.",
      tag: "Healthy Giving",
      img: "https://images.unsplash.com/photo-1620982969473-996b58ab41b7?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "The Golden Harvest Tray",
      price: "RS 7200.00",
      desc: "Artisanal dry fruit barks and classic roasted nuts presented in a handcrafted golden Moroccan tray.",
      tag: "New Arrival",
      img: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?q=80&w=1440&auto=format&fit=crop"
    }
  ];

  const features = [
    {
      icon: <WorkspacePremium />,
      title: "Premium Grade",
      desc: "Only the top 5% of our harvest qualifies for our gifting collections, ensuring unmatched quality."
    },
    {
      icon: <AutoAwesome />,
      title: "Custom Branding",
      desc: "Personalize your gifts with custom sleeves, logo embossing, and hand-written calligraphy notes."
    },
    {
      icon: <LocalShipping />,
      title: "Global Delivery",
      desc: "We ensure your tokens of affection reach their destination fresh and perfectly presented worldwide."
    }
  ];

  return (
    <div className={styles.giftingContainer}>
      <head>
        <title>Luxury Gifting | Nutrivia Premium Collections</title>
        <meta name="description" content="Discover Nutrivia's luxury gifting solutions. From festive hampers to corporate gifts, celebrate every occasion with health and elegance." />
      </head>

      {/* ─── HERO ─── */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div className={styles.heroBg} style={{ y: heroY, opacity: heroOpacity }} />
        <div className={styles.heroOverlay} />
        
        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className={styles.heroSubtitle}>CELEBRATE WITH ELEGANCE</span>
            <h1 className={styles.heroTitle}>Artisanal <span className={styles.goldText}>Gifting</span> <br /> Experiences</h1>
            <p className={styles.heroDesc}>
              Transform your appreciation into lasting memories. Nutrivia's curated gift collections redefine luxury with the purest flavors of nature.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.ctaButton}>
                Explore Collection <ArrowForward />
              </button>
              <button className={styles.secondaryButton}>
                Download Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>Curated For Every Occasion</span>
            <h2 className={styles.sectionTitle}>Bespoke Collections</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className="row g-4">
            {giftCategories.map((cat, idx) => (
              <div className="col-md-4" key={idx}>
                <motion.div 
                  className={styles.categoryCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <img src={cat.img} alt={cat.title} className={styles.categoryImg} />
                  <div className={styles.categoryOverlay}>
                    <h3 className={styles.categoryTitle}>{cat.title}</h3>
                    <span className={styles.categoryCount}>{cat.count}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className={`${styles.section} pt-0`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionOverline}>The Connoisseur's Choice</span>
            <h2 className={styles.sectionTitle}>Signature Gift Boxes</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className="row g-4">
            {giftProducts.map((prod, idx) => (
              <div className="col-lg-3 col-md-6" key={prod.id}>
                <motion.div 
                  className={styles.productCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.prodImgWrapper}>
                    <img src={prod.img} alt={prod.name} className={styles.prodImg} />
                    <div className={styles.tagBadge}>{prod.tag}</div>
                  </div>
                  <h4 className={styles.prodTitle}>{prod.name}</h4>
                  <span className={styles.prodPrice}>{prod.price}</span>
                  <p className={styles.prodDesc}>{prod.desc}</p>
                  <button className={styles.ctaButton} style={{ padding: '12px 20px', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}>
                    View Details
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className={styles.section}>
        <div className={styles.featuresBg}>
          <div className="container">
            <div className="row g-5">
              {features.map((feat, idx) => (
                <div className="col-md-4" key={idx}>
                  <motion.div 
                    className={styles.featureItem}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <div className={styles.featureIcon}>{feat.icon}</div>
                    <h4 className={styles.featureTitle}>{feat.title}</h4>
                    <p className={styles.featureDesc}>{feat.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORPORATE CTA ─── */}
      <section className={styles.section}>
        <div className="container">
          <motion.div 
            className={styles.ctaSection}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.ctaDecor}></div>
            <div className="row align-items-center">
              <div className="col-lg-7">
                <span className={styles.sectionOverline} style={{ color: 'white' }}>Corporate Solutions</span>
                <h2 className={styles.sectionTitle} style={{ color: 'white', marginBottom: '2rem' }}>Cultivate Stronger Business <br /> Relationships</h2>
                <p style={{ opacity: 0.8, fontSize: '1.1rem', marginBottom: '3rem' }}>
                  From festive employee rewards to premium executive gestures, we offer end-to-end corporate gifting solutions tailored to your brand identity.
                </p>
                <div className={styles.heroButtons}>
                  <button className={styles.ctaButton}>Corporate Inquiry</button>
                  <button className={styles.secondaryButton}>View Case Studies</button>
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <div className="text-center">
                  <Handshake sx={{ fontSize: 180, color: 'var(--color-gold)', opacity: 0.3 }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER BELT ─── */}
      <div style={{ background: 'var(--color-primary)', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '1.5rem', fontSize: '0.7rem', letterSpacing: '2px' }}>
        NUTRIVIA GIFTING DIVISION — CURATING MEMORIES SINCE 2018
      </div>
    </div>
  );
};

export default GiftingPage;
