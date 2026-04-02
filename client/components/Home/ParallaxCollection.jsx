"use client";
import { useEffect, useRef, useState } from "react";
import parallaxStyles from "./home.module.css";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";

const ParallaxCollection = () => {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top * 0.25; // Smoother multiplier
      
      // Limit parallax on very small screens to avoid jitter
      if (window.innerWidth < 768) {
        sectionRef.current.style.setProperty("--parallax-y", `${scrolled * 0.5}px`);
      } else {
        sectionRef.current.style.setProperty("--parallax-y", `${scrolled}px`);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collections = [
    {
      title: "Jumbo Nuts",
      desc: "Handpicked premium cashews, almonds & pistachios for pure luxury.",
      tag: "Top Choice",
      icon: <WorkspacePremiumRoundedIcon sx={{ fontSize: 18 }} />,
      color: "rgba(200, 155, 60, 0.15)",
    },
    {
      title: "Exotic Dates",
      desc: "Finest Medjool & Ajwa dates sourced directly from chosen desert farms.",
      tag: "Exclusive",
      icon: <NewReleasesRoundedIcon sx={{ fontSize: 18 }} />,
      color: "rgba(107, 142, 35, 0.15)",
    },
    {
      title: "Gift Combos",
      desc: "Elegantly packed assorted boxes designed for your special celebrations.",
      tag: "Seasonal",
      icon: <CardGiftcardRoundedIcon sx={{ fontSize: 18 }} />,
      color: "rgba(220, 20, 60, 0.15)",
    },
  ];

  if (!mounted) return null;

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
            <span>Curated Heritage</span>
          </div>

          <h2 className={parallaxStyles.pxTitle}>
            Discover Our Signature
            <br />
            <span className={parallaxStyles.pxTitleGold}>Nutrivia Collections</span>
          </h2>

          <p className={parallaxStyles.pxSubtitle}>
            Indulge in a world of unparalleled quality. Each selection in our premium range is 
            meticulously verified for freshness, taste, and nutritional excellence.
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
                  <div 
                    className={parallaxStyles.pxCardTag}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                    <span>{item.tag}</span>
                  </div>
                  <h4 className={parallaxStyles.pxCardTitle}>{item.title}</h4>
                  <p className={parallaxStyles.pxCardDesc}>{item.desc}</p>
                  <button className={parallaxStyles.pxCardAction}>
                    <span>View Collection</span>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
                  </button>
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