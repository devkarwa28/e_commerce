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

const Footer = () => {
  const linkColumns = [
    {
      title: "Company",
      links: ["About Us", "Leadership", "Certifications", "Careers", "Awards"],
    },
    {
      title: "Our Expertise",
      links: [
        "Private Label",
        "Wholesale",
        "Modern Trade",
        "Export Import",
        "Quality & Safety",
      ],
    },
    {
      title: "Quick Links",
      links: ["Blog", "Gifting", "Bulk Order", "Franchise", "Coupons"],
    },
    {
      title: "Information",
      links: [
        "Privacy Policy",
        "Return Policy",
        "Shipping Policy",
        "Terms & Conditions",
      ],
    },
    {
      title: "Customer Service",
      links: ["Contact Us", "Grievance", "Track Order", "FAQ"],
    },
  ];

  const socials = [
    { icon: <FacebookRoundedIcon sx={{ fontSize: 20 }} />, label: "Facebook" },
    { icon: <InstagramIcon sx={{ fontSize: 20 }} />, label: "Instagram" },
    { icon: <XIcon sx={{ fontSize: 18 }} />, label: "Twitter" },
  ];

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerGlow}></div>
      <div className={footerStyles.footerTopLine}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-2 col-md-4 mb-5">
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

          {linkColumns.map((col, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-6 mb-4">
              <h6 className={footerStyles.colTitle}>{col.title}</h6>
              <ul className={footerStyles.linkList}>
                {col.links.map((link, i) => (
                  <li key={i} className={footerStyles.linkItem}>
                    <ArrowForwardIosRoundedIcon
                      className={footerStyles.linkArrow}
                      sx={{ fontSize: 10 }}
                    />
                    <Link href="#">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={footerStyles.footerDivider}></div>

        <div className={footerStyles.footerBottom}>
          <p className={footerStyles.copyright}>
            © {new Date().getFullYear()} Nutrivia. All Rights Reserved.
          </p>

          <div className={footerStyles.socialIcons}>
            {socials.map((social, index) => (
              <Link
                href="#"
                key={index}
                className={footerStyles.socialBtn}
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>

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