"use client";
import whyStyles from "./home.module.css";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <SpaOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "100% Natural",
      desc: "Carefully sourced from the finest farms and hygienically packed to preserve natural freshness.",
      stat: "Pure",
      statLabel: "Organic",
    },
    {
      icon: <VerifiedOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "Premium Quality",
      desc: "Handpicked jumbo nuts with superior taste, rigorously quality-checked before packaging.",
      stat: "A+",
      statLabel: "Grade",
    },
    {
      icon: <LocalShippingOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "Fast Delivery",
      desc: "Quick dispatch and secure delivery across India with real-time tracking on every order.",
      stat: "24hr",
      statLabel: "Dispatch",
    },
    {
      icon: <SecurityOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "Secure Payment",
      desc: "Safe and encrypted checkout experience with multiple payment options for your convenience.",
      stat: "100%",
      statLabel: "Safe",
    },
  ];

  return (
    <section className={whyStyles.whySection}>
      <div className={whyStyles.whyDecorDot1}></div>
      <div className={whyStyles.whyDecorDot2}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className={whyStyles.whyHeader}>
          <div className={whyStyles.whyBadge}>
            <WorkspacePremiumOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Our Promise</span>
          </div>
          <h2 className={whyStyles.whyTitle}>
            Why Choose <span className={whyStyles.whyHighlight}>Nutrivia</span>
          </h2>
          <p className={whyStyles.whySubtitle}>
            We go beyond just selling dry fruits — we deliver a promise of purity,
            quality, and trust with every order.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className={whyStyles.whyCard}>
                <div className={whyStyles.whyCardTop}>
                  <div className={whyStyles.whyIconWrap}>
                    {feature.icon}
                  </div>
                  <div className={whyStyles.whyStat}>
                    <span className={whyStyles.whyStatValue}>{feature.stat}</span>
                    <span className={whyStyles.whyStatLabel}>{feature.statLabel}</span>
                  </div>
                </div>
                <h5 className={whyStyles.whyCardTitle}>{feature.title}</h5>
                <p className={whyStyles.whyCardDesc}>{feature.desc}</p>
                <div className={whyStyles.whyCardLine}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;