"use client";
import Link from "next/link";
import footerStyles from "./footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useState } from "react";

const Footer = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const linkColumns = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/aboutus" },
        { name: "Leadership", href: "/leadership" },
        { name: "Certifications", href: "/certifications" },
        { name: "Careers", href: "/careers" },
        { name: "Awards", href: "/awards" },
      ],
    },
    {
      title: "Our Expertise",
      links: [
        { name: "Private Label", href: "/expertise/private-label" },
        { name: "Wholesale", href: "/expertise/wholesale" },
        { name: "Modern Trade", href: "/expertise/modern-trade" },
        { name: "Export Import", href: "/expertise/export-import" },
        { name: "Quality & Safety", href: "/expertise/quality-safety" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Gifting", href: "/gifting" },
        { name: "Bulk Order", href: "/bulk-order" },
        { name: "Franchise", href: "/franchise" },
        { name: "Coupons", href: "/coupons-user" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Return Policy", href: "/return-policy" },
        { name: "Shipping Policy", href: "/shipping-policy" },
        { name: "Terms & Conditions", href: "/terms-conditions" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contactus" },
        { name: "Grievance", href: "/grievance" },
        { name: "Track Order", href: "/track-order" },
        { name: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socials = [
    { icon: <FacebookRoundedIcon sx={{ fontSize: 20 }} />, label: "Facebook", url: "https://facebook.com" },
    { icon: <InstagramIcon sx={{ fontSize: 20 }} />, label: "Instagram", url: "https://instagram.com/dev_maheshwari28" },
    { icon: <XIcon sx={{ fontSize: 18 }} />, label: "Twitter", url: "https://twitter.com" },
  ];

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerGlow}></div>
      <div className={footerStyles.footerTopLine}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-3 col-md-12 mb-lg-5">
            <div className={footerStyles.brandBlock}>
              <h3 className={footerStyles.brandName}>Nutrivia</h3>
              <p className={footerStyles.brandDesc}>
                Premium quality dry fruits sourced with care and delivered fresh
                to your home.
              </p>
              <div className={footerStyles.contactInfo}>
                <div className={footerStyles.contactItem}>
                  <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                  <span>Jodhpur, Rajasthan, India</span>
                </div>
                <div className={footerStyles.contactItem}>
                  <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                  <span>devkarwa1973@outlook.com</span>
                </div>
                <div className={footerStyles.contactItem}>
                  <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
                  <span>+91 7611077344</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-12">
            <div className="row">
              {linkColumns.map((col, index) => (
                <div key={index} className="col-lg-2 col-md-4 col-12 mb-md-4 mb-0">
                  <div 
                    className={`${footerStyles.colHeader} d-flex justify-content-between align-items-center`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <h6 className={footerStyles.colTitle}>{col.title}</h6>
                    <ExpandMoreRoundedIcon 
                      className={`${footerStyles.accordionIcon} d-md-none ${activeAccordion === index ? footerStyles.rotateIcon : ""}`} 
                    />
                  </div>
                  
                  <ul className={`${footerStyles.linkList} ${activeAccordion === index ? footerStyles.showList : ""}`}>
                    {col.links.map((link, i) => (
                      <li key={i} className={footerStyles.linkItem}>
                        <ArrowForwardIosRoundedIcon
                          className={footerStyles.linkArrow}
                          sx={{ fontSize: 10 }}
                        />
                        <Link href={link.href}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                  <div className={`${footerStyles.mobileDivider} d-md-none`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={footerStyles.footerDivider}></div>

        <div className={footerStyles.footerBottom}>
          <div className={footerStyles.socialIcons}>
            {socials.map((social, index) => (
              <Link
                href={social.url}
                key={index}
                className={footerStyles.socialBtn}
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <p className={footerStyles.copyright}>
            © {new Date().getFullYear()} Nutrivia. All Rights Reserved.
          </p>

          <p className={footerStyles.credit}>
            Designed & Developed By{" "}
            <Link href="https://github.com/devkarwa28">{" Dev Karwa"}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
;