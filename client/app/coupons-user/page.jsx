"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { 
  LocalOffer, 
  ContentCopy, 
  AccessTime, 
  Verified, 
  CardGiftcard, 
  Celebration, 
  FlashOn, 
  Star,
  InfoOutlined,
  CheckCircleOutline,
  Smartphone
} from "@mui/icons-material";
import { Alert, Snackbar, Tooltip } from "@mui/material";
import styles from "./coupons.module.css";

const UserCouponsPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const dummyCoupons = [
    {
      id: 1,
      title: "Welcome Bonus",
      code: "FIRST50",
      discount: "50% OFF",
      desc: "Get an amazing 50% discount on your first order. Minimum purchase of ₹499.",
      tnc: "Valid for new users on their first successful order. Maximum discount of ₹300 applies. Cannot be combined with other offers.",
      expiry: "Valid till 31 Dec 2026",
      icon: <Verified />,
      category: "new"
    },
    {
      id: 2,
      title: "Free Shipping",
      code: "FREESHIP",
      discount: "FREE SHIP",
      desc: "Enjoy free shipping on all orders above ₹999. Valid across India.",
      tnc: "Applicable on standard shipping only. Not valid for express delivery. Minimum cart value must be ₹999 after other discounts.",
      expiry: "Valid till 30 Nov 2026",
      icon: <LocalOffer />,
      category: "all"
    },
    {
      id: 3,
      title: "Festive Season Sale",
      code: "FESTIVE25",
      discount: "25% OFF",
      desc: "Celebrate the season with 25% off on all luxury gift boxes and combos.",
      tnc: "Valid on 'Gift Boxes' category only. No minimum purchase required. Applicable multiple times per user.",
      expiry: "Valid till 15 Jan 2027",
      icon: <Celebration />,
      category: "festive"
    },
    {
      id: 4,
      title: "Nuts Special",
      code: "NUTRI20",
      discount: "20% OFF",
      desc: "Flat 20% discount on entire range of Premium Almonds and Cashews.",
      tnc: "Minimum purchase of 500g required. Valid on select SKU sizes. Limit one use per customer.",
      expiry: "Valid till 28 Feb 2027",
      icon: <CardGiftcard />,
      category: "all"
    },
    {
      id: 5,
      title: "Bulk Savings",
      code: "SAVEBIG",
      discount: "₹500 OFF",
      desc: "Save flat ₹500 on orders above ₹5000. Perfect for family stocking.",
      tnc: "Cart value must exceed ₹5000. Applicable on all products except already discounted items.",
      expiry: "Valid till 31 Dec 2026",
      icon: <FlashOn />,
      category: "bulk"
    },
    {
      id: 6,
      title: "Healthy Choice",
      code: "HEALTHY10",
      discount: "10% OFF",
      desc: "Start your fitness journey with 10% off on all sugar-free dried fruits.",
      tnc: "Valid on 'Sugar Free' tagged items only. Maximum discount ₹150.",
      expiry: "Valid till 10 Oct 2026",
      icon: <Star />,
      category: "all"
    },
    {
      id: 7,
      title: "Weekend Flash",
      code: "WEEK30",
      discount: "30% OFF",
      desc: "Flash sale! 30% off on all products during Saturday and Sunday.",
      tnc: "Valid only on Saturdays and Sundays. Not valid on gift baskets. Maximum discount ₹400.",
      expiry: "Recurring Weekly",
      icon: <FlashOn />,
      category: "festive"
    },
    {
      id: 8,
      title: "Loyalty Reward",
      code: "LOYAL5",
      discount: "5% EXTRA",
      desc: "Get extra 5% off as a valued long-term customer. Over and above existing deals.",
      tnc: "Valid for users with 3+ previous orders. Minimum purchase ₹799.",
      expiry: "Permanent Offer",
      icon: <CheckCircleOutline />,
      category: "all"
    },
    {
      id: 9,
      title: "Birthday Treat",
      code: "CELEBRATE",
      discount: " FLAT ₹200",
      desc: "Happy Birthday! Here is a flat ₹200 off for your special day.",
      tnc: "Minimum order ₹1200. Valid during your birthday month registered in profile.",
      expiry: "User Specific",
      icon: <Celebration />,
      category: "new"
    },
    {
      id: 10,
      title: "App Exclusive",
      code: "APPSAVE",
      discount: "15% OFF",
      desc: "Special discount for users ordering via our web application.",
      tnc: "Valid for orders processed through the web interface. Minimum purchase ₹600.",
      expiry: "Valid till 30 Dec 2026",
      icon: <Smartphone />,
      category: "all"
    },
    {
      id: 11,
      title: "Trial Pack Deal",
      code: "TRIAL99",
      discount: "ONLY ₹99",
      desc: "Get our signature trial pack at just ₹99. No questions asked.",
      tnc: "Limited to 1 pack per user. Shipping charges may apply if total is under ₹499.",
      expiry: "Valid till 31 Oct 2026",
      icon: <CardGiftcard />,
      category: "new"
    },
    {
      id: 12,
      title: "New Year Bash",
      code: "NY2027",
      discount: "27% OFF",
      desc: "Kickstart 2027 with health. 27% off on all organic selections.",
      tnc: "Applicable from 1st Jan to 5th Jan 2027. Minimum purchase ₹1500.",
      expiry: "1 Jan - 5 Jan 2027",
      icon: <Celebration />,
      category: "festive"
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setSnackbarOpen(true);
  };

  const showTnc = (coupon) => {
    alert(`Terms & Conditions for ${coupon.code}:\n\n${coupon.tnc}`);
  };

  const filteredCoupons = activeTab === "all" ? dummyCoupons : dummyCoupons.filter(c => c.category === activeTab);

  return (
    <div className={styles.couponsContainer}>
      <Head>
        <title>Exclusive Coupons | Nutrivia Savings</title>
        <meta name="description" content="Explore luxury savings with Nutrivia coupons. Get the best deals on premium dry fruits and nuts." />
      </Head>

      <section className={styles.hero}>
        <div className="container">
          <motion.span 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Exclusive Nutrivia Offers
          </motion.span>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Luxury Savings, <span style={{ color: "#c89b3c" }}>Healthy Living</span>
          </motion.h1>
          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover handpicked deals and promotional codes designed to bring the finest selection of nature's bounty to your doorstep at unmatched prices.
          </motion.p>
        </div>
      </section>

      <div className="container">
        {/* Simple Tab Filter */}
        <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
          {["all", "new", "festive", "bulk"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? "#c89b3c" : "rgba(255, 255, 255, 0.05)",
                color: activeTab === tab ? "#fff" : "rgba(255, 255, 255, 0.6)",
                border: "none",
                padding: "8px 24px",
                borderRadius: "50px",
                fontWeight: 700,
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: activeTab === tab ? "1px solid #c89b3c" : "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              {tab} Offers
            </button>
          ))}
        </div>

        <div className={`row g-4 ${styles.couponGrid}`}>
          {filteredCoupons.map((coupon, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={coupon.id}>
              <motion.div 
                className={styles.couponCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.sideNotch} style={{ top: "65%", left: "-11px" }}></div>
                <div className={styles.sideNotch} style={{ top: "65%", right: "-11px" }}></div>
                
                <div className={styles.couponCardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.discountBadge}>{coupon.discount}</div>
                    <div className={styles.iconWrapper}>{coupon.icon}</div>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.couponTitle}>{coupon.title}</h3>
                    <p className={styles.couponDesc}>{coupon.desc}</p>
                    
                    <div className={styles.codeArea}>
                      <span className={styles.couponCode}>{coupon.code}</span>
                      <Tooltip title="Copy Code" arrow>
                        <button className={styles.copyBtn} onClick={() => handleCopy(coupon.code)}>
                          <ContentCopy sx={{ fontSize: 18 }} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.expiryDate}>
                      <AccessTime sx={{ fontSize: 14 }} /> {coupon.expiry}
                    </div>
                    <button className={styles.tncLink} onClick={() => showTnc(coupon)}>
                      T&C Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {filteredCoupons.length === 0 && (
          <div className="text-center py-5">
            <InfoOutlined sx={{ fontSize: 60, color: "rgba(255,255,255,0.1)", mb: 2 }} />
            <p style={{ color: "rgba(255,255,255,0.5)" }}>No active offers in this category right now. Check back soon!</p>
          </div>
        )}
      </div>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', bgcolor: '#c89b3c', color: '#fff' }}>
          Coupon code copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserCouponsPage;
