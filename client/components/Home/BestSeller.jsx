"use client";
import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import bestStyles from "./home.module.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BestSeller = () => {
  const [swiper, setSwiper] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const products = [
    {
      name: "Premium Almonds",
      image: "/products/p1.png",
      price: 899,
      oldPrice: 1200,
      rating: 4.5,
      reviews: 124,
      tag: "Best Seller"
    },
    {
      name: "Jumbo Cashews",
      image: "/products/p2.png",
      price: 1099,
      oldPrice: 1500,
      rating: 4.7,
      reviews: 210,
      tag: "Premium"
    },
    {
      name: "Afghani Dates",
      image: "/products/p3.png",
      price: 749,
      oldPrice: 999,
      rating: 4.8,
      reviews: 89,
      tag: "Imported"
    },
    {
      name: "Mixed Seeds Pack",
      image: "/products/p4.png",
      price: 599,
      oldPrice: 850,
      rating: 4.6,
      reviews: 156,
      tag: "Healthy"
    },
    {
      name: "Luxury Combo Box",
      image: "/products/p5.png",
      price: 2499,
      oldPrice: 3200,
      rating: 4.9,
      reviews: 342,
      tag: "Gift Choice"
    },
  ];

  if (!mounted) return null;

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
          <Swiper
            onSwiper={setSwiper}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnHover: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              576: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className={bestStyles.bsSwiper}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className={bestStyles.bsArrows}>
            <button 
              className={bestStyles.bsArrowBtn} 
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous slide"
            >
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 20 }} />
            </button>
            <button 
              className={bestStyles.bsArrowBtn} 
              onClick={() => swiper?.slideNext()}
              aria-label="Next slide"
            >
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function ProductCard({ product }) {
  return (
    <div className={bestStyles.bsCard}>
      <div className={bestStyles.bsImgWrap}>
        {product.tag && <span className={bestStyles.bsCardTag}>{product.tag}</span>}
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
             sx={{ color: "#C89B3C" }}
             emptyIcon={<StarBorderRoundedIcon fontSize="inherit" style={{ color: "#E0E0E0" }} />}
          />
          <span className={bestStyles.bsReviews}>({product.reviews})</span>
        </div>
        
        <h5 className={bestStyles.bsName}>{product.name}</h5>
        
        <div className={bestStyles.bsPriceWrap}>
          <span className={bestStyles.bsPrice}>₹{product.price}</span>
          {product.oldPrice && <span className={bestStyles.bsOldPrice}>₹{product.oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;