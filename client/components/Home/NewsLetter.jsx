"use client";
import { useState } from "react";
import newsStyles from "./home.module.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const perks = [
    {
      icon: <CardGiftcardOutlinedIcon sx={{ fontSize: 22 }} />,
      text: "Exclusive Deals",
    },
    {
      icon: <LocalOfferOutlinedIcon sx={{ fontSize: 22 }} />,
      text: "Early Access",
    },
    {
      icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 22 }} />,
      text: "Healthy Tips",
    },
  ];

  return (
    <section className={newsStyles.newsletterSection}>
      <div className={newsStyles.nlDecorCircle1}></div>
      <div className={newsStyles.nlDecorCircle2}></div>
      <div className={newsStyles.nlDecorLine}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className={newsStyles.nlContent}>
              <div className={newsStyles.nlBadge}>
                <AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />
                <span>Stay Connected</span>
              </div>
              <h2 className={newsStyles.nlTitle}>
                Join the <span className={newsStyles.nlHighlight}>Nutrivia</span>{" "}
                Community
              </h2>
              <p className={newsStyles.nlSubtitle}>
                Be the first to discover exclusive offers, seasonal specials, and
                expert tips on healthy living — delivered straight to your inbox.
              </p>

              <div className={newsStyles.nlPerks}>
                {perks.map((perk, index) => (
                  <div key={index} className={newsStyles.nlPerkItem}>
                    <div className={newsStyles.nlPerkIcon}>{perk.icon}</div>
                    <span>{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className={newsStyles.nlFormCard}>
              <div className={newsStyles.nlFormInner}>
                <div className={newsStyles.nlFormIcon}>
                  <EmailOutlinedIcon sx={{ fontSize: 36, color: "#C89B3C" }} />
                </div>
                <h4 className={newsStyles.nlFormTitle}>
                  Get 10% Off Your First Order
                </h4>
                <p className={newsStyles.nlFormDesc}>
                  Subscribe today and receive a welcome discount along with curated
                  wellness content.
                </p>
                <div
                  className={`${newsStyles.nlInputWrapper} ${
                    isFocused ? newsStyles.nlInputFocused : ""
                  }`}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={newsStyles.nlInput}
                  />
                  <button className={newsStyles.nlSubscribeBtn}>
                    Subscribe
                  </button>
                </div>
                <p className={newsStyles.nlDisclaimer}>
                  🔒 No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;