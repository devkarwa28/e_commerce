"use client";
import { Rating } from "@mui/material";
import bestStyles from "./home.module.css";
import Slider from "react-slick";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const BestSeller = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const products = [
    {
      name: "Premium Almonds",
      image: "/products/p1.png",
      price: 899,
      rating: 4.5,
      reviews: 124,
    },
    {
      name: "Jumbo Cashews",
      image: "/products/p2.png",
      price: 1099,
      rating: 4.7,
      reviews: 210,
    },
    {
      name: "Afghani Dates",
      image: "/products/p3.png",
      price: 749,
      rating: 4.8,
      reviews: 89,
    },
    {
      name: "Mixed Seeds Pack",
      image: "/products/p4.png",
      price: 599,
      rating: 4.6,
      reviews: 156,
    },
    {
      name: "Luxury Combo Box",
      image: "/products/p5.png",
      price: 2499,
      rating: 4.9,
      reviews: 342,
    },
  ];

  return (
    <section className={bestStyles.bsSection}>
      <div className="container">
        <div className={bestStyles.bsHeader}>
          <div className={bestStyles.bsBadge}>
            <WorkspacePremiumOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Top Rated</span>
          </div>
          <h2 className={bestStyles.bsTitle}>
            Our Bestselling <span className={bestStyles.bsHighlight}>Favorites</span>
          </h2>
          <p className={bestStyles.bsSubtitle}>
            Discover the most loved and highly rated premium dry fruits chosen by our customers.
          </p>
        </div>

        <div className={bestStyles.bsSliderWrap}>
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={index} className="px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

function ProductCard({ product }) {
  return (
    <div className={bestStyles.bsCard}>
      <div className={bestStyles.bsImgWrap}>
        <img src={product.image} alt={product.name} className={bestStyles.bsImg} />
        <div className={bestStyles.bsCartHover}>
          <button className={bestStyles.bsAddToCartBtn}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      
      <div className={bestStyles.bsContent}>
        <div className={bestStyles.bsRatingWrap}>
          <Rating 
             value={product.rating} 
             precision={0.5} 
             readOnly 
             size="small"
             emptyIcon={<StarBorderRoundedIcon fontSize="inherit" style={{ color: "#E0E0E0" }} />}
          />
          <span className={bestStyles.bsReviews}>({product.reviews})</span>
        </div>
        
        <h5 className={bestStyles.bsName}>{product.name}</h5>
        <div className={bestStyles.bsPriceWrap}>
          <span className={bestStyles.bsPrice}>₹{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;