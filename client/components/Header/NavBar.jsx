"use client";
import headerStyles from "./header.module.css";
import Link from "next/link";

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

  return (
    <nav className={headerStyles.navBar}>
      <div className="container">
        <ul className={headerStyles.navList}>
          {categories.map((cat) => (
            <li key={cat} className={headerStyles.navItem}>
              <Link href="/products">{cat}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;