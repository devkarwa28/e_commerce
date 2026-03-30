"use client";
import { useEffect, useRef } from "react";
import parallaxStyles from "./home.module.css";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const ParallaxCollection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top * 0.3;
      sectionRef.current.style.setProperty("--parallax-y", `${scrolled}px`);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collections = [
    {
      title: "Jumbo Nuts",
      desc: "Handpicked premium cashews, almonds & pistachios",
      tag: "Bestseller",
    },
    {
      title: "Exotic Dates",
      desc: "Finest Medjool & Ajwa dates from select farms",
      tag: "New Arrival",
    },
    {
      title: "Gift Combos",
      desc: "Luxury assorted boxes for every special occasion",
      tag: "Festive",
    },
  ];

  return (
    <section ref={sectionRef} className={parallaxStyles.pxSection}>
      <div className={parallaxStyles.pxBg}></div>
      <div className={parallaxStyles.pxOverlay}></div>
      <div className={parallaxStyles.pxGlowLeft}></div>
      <div className={parallaxStyles.pxGlowRight}></div>

      <div className="container position-relative" style={{ zIndex: 3 }}>
        <div className={parallaxStyles.pxContent}>
          <div className={parallaxStyles.pxBadge}>
            <DiamondOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Premium Collection</span>
          </div>

          <h2 className={parallaxStyles.pxTitle}>
            Discover Our Finest
            <br />
            <span className={parallaxStyles.pxTitleGold}>Curated Selections</span>
          </h2>

          <p className={parallaxStyles.pxSubtitle}>
            Explore handpicked collections of the world&apos;s finest dry fruits,
            sourced from premium farms and crafted for connoisseurs.
          </p>

          <div className={parallaxStyles.pxDivider}>
            <span className={parallaxStyles.pxDividerDot}></span>
            <span className={parallaxStyles.pxDividerLine}></span>
            <span className={parallaxStyles.pxDividerDot}></span>
          </div>

          <div className="row g-4 justify-content-center">
            {collections.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className={parallaxStyles.pxCard}>
                  <div className={parallaxStyles.pxCardTag}>{item.tag}</div>
                  <h4 className={parallaxStyles.pxCardTitle}>{item.title}</h4>
                  <p className={parallaxStyles.pxCardDesc}>{item.desc}</p>
                  <div className={parallaxStyles.pxCardAction}>
                    <span>Shop Now</span>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxCollection;