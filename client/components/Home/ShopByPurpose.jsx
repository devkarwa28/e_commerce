"use client";
import shopByStyles from "./home.module.css";
import { CardGiftcard, FitnessCenter, Restaurant, Spa } from "@mui/icons-material";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

const ShopByPurpose = () => {
  const items = [
    {
      title: "Luxury Gifting",
      icon: <CardGiftcard sx={{ fontSize: 28 }} />,
      desc: "Premium gift hampers curated and elegantly packed for every special celebration.",
      tag: "Popular",
    },
    {
      title: "Culinary Delights",
      icon: <Restaurant sx={{ fontSize: 28 }} />,
      desc: "High-quality raw ingredients to elevate your recipes and culinary creations.",
      tag: "Cooking",
    },
    {
      title: "Smart Snacking",
      icon: <Spa sx={{ fontSize: 28 }} />,
      desc: "Snack smarter with our nutritious, guilt-free daily essential mixes.",
      tag: "Healthy",
    },
    {
      title: "Daily Nutrition",
      icon: <FitnessCenter sx={{ fontSize: 28 }} />,
      desc: "Boost your daily routine and energy with our powerful superfood selection.",
      tag: "Fitness",
    },
  ];

  return (
    <section className={shopByStyles.sbpSection}>
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className={shopByStyles.sbpHeader}>
          <div className={shopByStyles.sbpBadge}>
            <TrackChangesOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Curated For You</span>
          </div>
          <h2 className={shopByStyles.sbpTitle}>
            Shop By <span className={shopByStyles.sbpHighlight}>Purpose</span>
          </h2>
          <p className={shopByStyles.sbpSubtitle}>
            Discover premium products thoughtfully curated around your lifestyle,
            health goals, and daily needs.
          </p>
        </div>

        <div className="row g-4">
          {items.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className={shopByStyles.sbpCard}>
                <div className={shopByStyles.sbpCardTop}>
                  <div className={shopByStyles.sbpIconWrap}>{item.icon}</div>
                  <div className={shopByStyles.sbpTag}>{item.tag}</div>
                </div>
                <h4 className={shopByStyles.sbpCardTitle}>{item.title}</h4>
                <p className={shopByStyles.sbpCardDesc}>{item.desc}</p>
                
                <div className={shopByStyles.sbpCardFooter}>
                  <span className={shopByStyles.sbpActionText}>Explore</span>
                  <Link href='/products'>
                  <div className={shopByStyles.sbpActionIcon}>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByPurpose;