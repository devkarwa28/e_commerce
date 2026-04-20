"use client";
import catStyles from "./home.module.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { motion } from "framer-motion";
import Link from "next/link";

const CategoriesShowcase = () => {
  const categories = [
    {
      title: "Jumbo Nuts",
      subtitle: "Premium Selection",
      image: "/cat/jumbonuts.png",
      big: true,
      link: "/products"
    },
    {
      title: "Snacking",
      subtitle: "Healthy Bites",
      image: "/cat/snacking.png",
      link: "/products"
    },
    {
      title: "Dates",
      subtitle: "Exotic Picks",
      image: "/cat/dates.png",
      link: "/products"
    },
    {
      title: "Seeds",
      subtitle: "Nutrient Rich",
      image: "/cat/seeds.png",
      link: "/products"
    },
    {
      title: "Combos",
      subtitle: "Gift Packs",
      image: "/cat/combos.png",
      link: "/products"
    },
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className={catStyles.catSection}>
      <div className="container">
        <motion.div 
          className={catStyles.catHeader}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={catStyles.catBadge}>
            <CategoryOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Curated Collections</span>
          </div>
          <h2 className={catStyles.catTitle}>
            Shop By <span className={catStyles.catHighlight}>Category</span>
          </h2>
          <p className={catStyles.catSubtitle}>
            Explore our ethically sourced, hand-picked premium dry fruits categorized to perfection.
          </p>
        </motion.div>

        <motion.div 
          className="row g-3 g-md-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div className="col-lg-6" variants={itemVariant}>
            <CategoryCard data={categories[0]} large />
          </motion.div>
          <motion.div className="col-lg-6" variants={itemVariant}>
            <div className="row g-3 g-md-4">
              {categories.slice(1).map((cat, index) => (
                <div key={index} className="col-6">
                  <CategoryCard data={cat} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

function CategoryCard({ data, large }) {
  return (
    <Link href={data.link || "/products"} style={{ textDecoration: 'none' }}>
      <motion.div
        whileHover="hover"
        initial="initial"
        className={`${catStyles.catCard} ${large ? catStyles.catCardLarge : catStyles.catCardSmall}`}
      >
        <motion.img 
          src={data.image} 
          alt={data.title} 
          className={catStyles.catCardImg}
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className={catStyles.catCardOverlay}></div>
        
        {/* Glassmorphism content container */}
        <div className={catStyles.catCardContent}>
          <div className={catStyles.catTextWrap}>
            <motion.span 
              className={catStyles.catCardSub}
              variants={{
                initial: { opacity: 0.8, y: 5 },
                hover: { opacity: 1, y: 0 }
              }}
            >
              {data.subtitle}
            </motion.span>
            <motion.h4 
              className={catStyles.catCardTitle}
              variants={{
                initial: { y: 0 },
                hover: { y: -3 }
              }}
            >
              {data.title}
            </motion.h4>
          </div>
          
          <motion.div 
            className={catStyles.catCardBtn}
            variants={{
              initial: { opacity: 1, scale: 0.9, backgroundColor: "rgba(255,255,255,0.15)" },
              hover: { opacity: 1, scale: 1, backgroundColor: "var(--color-primary)", color: "#FFD700" }
            }}
          >
            <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default CategoriesShowcase;