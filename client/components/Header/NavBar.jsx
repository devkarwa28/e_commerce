"use client";
import headerStyles from "./header.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

const NavBar = () => {
  const categories = [
    "Shop",
    "Jumbo Nuts",
    "Snacking",
    "Dates",
    "Combos",
    "Seeds",
    "Berries",
    "Spices",
    "Wholesale",
    "Blog",
  ];

  /* Premium Staggered Animation Variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <nav className={headerStyles.navBar}>
      <div className="container">
        <motion.ul
          className={headerStyles.navList}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {categories.map((cat) => (
            <motion.li key={cat} className={headerStyles.navItem} variants={itemVariants}>
              <Link href="/products">{cat}</Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
};

export default NavBar;