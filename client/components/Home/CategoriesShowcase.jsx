"use client";
import catStyles from "./home.module.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const CategoriesShowcase = () => {
  const categories = [
    {
      title: "Jumbo Nuts",
      subtitle: "Premium Selection",
      image: "/cat/jumbonuts.png",
      big: true,
    },
    {
      title: "Snacking",
      subtitle: "Healthy Bites",
      image: "/cat/snacking.png",
    },
    {
      title: "Dates",
      subtitle: "Exotic Picks",
      image: "/cat/dates.png",
    },
    {
      title: "Seeds",
      subtitle: "Nutrient Rich",
      image: "/cat/seeds.png",
    },
    {
      title: "Combos",
      subtitle: "Gift Packs",
      image: "/cat/combos.png",
    },
  ];

  return (
    <section className={catStyles.catSection}>
      <div className="container">
        <div className={catStyles.catHeader}>
          <div className={catStyles.catBadge}>
            <CategoryOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Categories</span>
          </div>
          <h2 className={catStyles.catTitle}>
            Shop By <span className={catStyles.catHighlight}>Category</span>
          </h2>
          <p className={catStyles.catSubtitle}>
            Explore our curated collection of premium dry fruits organized just for you
          </p>
        </div>

        <div className="row g-3">
          <div className="col-lg-6">
            <CategoryCard data={categories[0]} large />
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              {categories.slice(1).map((cat, index) => (
                <div key={index} className="col-6">
                  <CategoryCard data={cat} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function CategoryCard({ data, large }) {
  return (
    <div
      className={`${catStyles.catCard} ${large ? catStyles.catCardLarge : catStyles.catCardSmall}`}
    >
      <img src={data.image} alt={data.title} className={catStyles.catCardImg} />
      <div className={catStyles.catCardOverlay}></div>
      <div className={catStyles.catCardContent}>
        <div>
          <span className={catStyles.catCardSub}>{data.subtitle}</span>
          <h4 className={catStyles.catCardTitle}>{data.title}</h4>
        </div>
        <div className={catStyles.catCardBtn}>
          <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
        </div>
      </div>
    </div>
  );
}

export default CategoriesShowcase;