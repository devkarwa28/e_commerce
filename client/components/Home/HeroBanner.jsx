"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from "axios";
import homestyles from "./home.module.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { motion, AnimatePresence } from "framer-motion";

const HeroBanner = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackSlides = [
    {
      title: "Premium Dry Fruits",
      titleAccent: "For Every Occasion",
      subtitle:
        "Naturally sourced from the finest orchards, freshly packed and delivered with care to your doorstep.",
      image: "/hero1.jpg",
      badge: "UP TO 40% OFF",
    },
    {
      title: "Healthy Snacking",
      titleAccent: "Starts Here",
      subtitle:
        "Rich in nutrients, full of natural taste — premium quality dry fruits for a healthier lifestyle.",
      image: "/hero2.jpg",
      badge: "FESTIVE SPECIAL",
    },
    {
      title: "Luxury Gifting",
      titleAccent: "Combos",
      subtitle:
        "Elegant dry fruit gift boxes crafted for weddings, festivals and celebrations.",
      image: "/hero3.jpg",
      badge: "LIMITED OFFER",
    },
  ];

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`);
        if (data && data.length > 0) {
          setSlides(data);
        } else {
          setSlides(fallbackSlides);
        }
      } catch (error) {
        console.error("Error fetching hero banners:", error);
        setSlides(fallbackSlides);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  if (loading) {
    return (
      <section className={homestyles.heroSection}>
        <div style={{ height: "520px", display: "flex", alignItems: "center", justifyContent: "center", color: "#cca750" }}>
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            Loading Premium Assets...
          </motion.h4>
        </div>
      </section>
    );
  }

  return (
    <section className={homestyles.heroSection}>
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveSlide(s.realIndex)}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop={true}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className={homestyles.heroSwiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={homestyles.heroSlide}>
              <div className={homestyles.heroImgWrap}>
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: activeSlide === index ? 1 : 1.1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  src={slide.image}
                  alt={slide.title}
                  className={homestyles.heroImg}
                />
                <div className={homestyles.heroImgOverlay}></div>
              </div>

              <div className="container position-relative" style={{ zIndex: 3 }}>
                <div className={`row align-items-center ${homestyles.heroRow}`}>
                  <div className="col-lg-6">
                    <AnimatePresence mode="wait">
                      {activeSlide === index && (
                        <div className={homestyles.heroContent}>
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={homestyles.heroBadge}
                          >
                            {slide.badge}
                          </motion.div>
                          
                          <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={homestyles.heroTitle}
                          >
                            {slide.title}
                            <br />
                            <span className={homestyles.heroTitleGold}>
                              {slide.titleAccent}
                            </span>
                          </motion.h1>

                          <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={homestyles.heroSubtitle}
                          >
                            {slide.subtitle}
                          </motion.p>

                          <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={homestyles.heroBtn}
                          >
                            <span>Shop Now</span>
                            <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
                          </motion.button>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={homestyles.heroControls}>
        <div className={homestyles.heroDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${homestyles.heroDot} ${
                activeSlide === index ? homestyles.heroDotActive : ""
              }`}
              onClick={() => swiper?.slideToLoop(index)}
            />
          ))}
        </div>
        <div className={homestyles.heroArrows}>
          <button
            className={homestyles.heroArrowBtn}
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous slide"
          >
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
          </button>
          <button
            className={homestyles.heroArrowBtn}
            onClick={() => swiper?.slideNext()}
            aria-label="Next slide"
          >
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

