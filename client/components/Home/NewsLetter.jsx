"use client";
import { useState } from "react";
import newsStyles from "./home.module.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const perks = [
    {
      icon: <CardGiftcardOutlinedIcon className={newsStyles.perkIconSvg} />,
      text: "Exclusive Deals",
    },
    {
      icon: <LocalOfferOutlinedIcon className={newsStyles.perkIconSvg} />,
      text: "Early Access",
    },
    {
      icon: <AutoAwesomeOutlinedIcon className={newsStyles.perkIconSvg} />,
      text: "Healthy Tips",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
      setEmail("");
    }
  };

  return (
    <section className={newsStyles.newsletterSection}>
      <div className={newsStyles.nlDecorCircle1}></div>
      <div className={newsStyles.nlDecorCircle2}></div>
      <div className={newsStyles.nlDecorLine}></div>

      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className={newsStyles.nlContent}>
              <div className={newsStyles.nlBadge}>
                <AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />
                <span>Stay Connected</span>
              </div>
              <h2 className={newsStyles.nlTitle}>
                Join the <span className={newsStyles.nlHighlight}>Nutrivia</span> Community
              </h2>
              <p className={newsStyles.nlSubtitle}>
                Be the first to discover exclusive offers, seasonal specials, and
                expert tips on healthy living — delivered straight to your inbox.
              </p>

              <div className={newsStyles.nlPerks}>
                {perks.map((perk, index) => (
                  <div key={index} className={newsStyles.nlPerkItem}>
                    <div className={newsStyles.nlPerkIcon}>{perk.icon}</div>
                    <span className={newsStyles.nlPerkText}>{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5 offset-lg-1">
            <div className={newsStyles.nlFormCard}>
              <div className={newsStyles.nlFormInner}>
                {isSubscribed ? (
                  <div className={newsStyles.nlSuccess}>
                    <div className={newsStyles.nlSuccessIcon}>
                      <MarkEmailReadOutlinedIcon sx={{ fontSize: 48, color: "var(--color-gold)" }} />
                    </div>
                    <h4 className={newsStyles.nlFormTitle}>You're on the list!</h4>
                    <p className={newsStyles.nlFormDesc}>
                      Check your inbox for a special welcome gift. Welcome to the Nutrivia family!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className={newsStyles.nlFormIcon}>
                      <EmailOutlinedIcon sx={{ fontSize: 36, color: "var(--color-gold)" }} />
                    </div>
                    <h4 className={newsStyles.nlFormTitle}>
                      Get 10% Off Your First Order
                    </h4>
                    <p className={newsStyles.nlFormDesc}>
                      Subscribe today and receive a welcome discount along with curated wellness content.
                    </p>
                    <form onSubmit={handleSubscribe} className={newsStyles.nlForm}>
                      <div
                        className={`${newsStyles.nlInputWrapper} ${
                          isFocused ? newsStyles.nlInputFocused : ""
                        }`}
                      >
                        <input
                          type="email"
                          placeholder="Your Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          className={newsStyles.nlInput}
                          required
                        />
                        <button type="submit" className={newsStyles.nlSubscribeBtn}>
                          Subscribe
                        </button>
                      </div>
                    </form>
                    <p className={newsStyles.nlDisclaimer}>
                      🔒 No spam, ever. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;