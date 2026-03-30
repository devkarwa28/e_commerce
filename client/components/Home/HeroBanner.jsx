"use client";
import { useState, useRef } from "react";
import Slider from "react-slick";
import homestyles from "./home.module.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const HeroBanner = () => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    arrows: false,
    fade: true,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  return (
    <section className={homestyles.heroSection}>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className={homestyles.heroSlide}>
              <div className={homestyles.heroImgWrap}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={homestyles.heroImg}
                />
                <div className={homestyles.heroImgOverlay}></div>
              </div>

              <div className="container position-relative" style={{ zIndex: 3 }}>
                <div className="row align-items-center" style={{ minHeight: "520px" }}>
                  <div className="col-lg-6">
                    <div className={homestyles.heroContent}>
                      <div className={homestyles.heroBadge}>{slide.badge}</div>
                      <h1 className={homestyles.heroTitle}>
                        {slide.title}
                        <br />
                        <span className={homestyles.heroTitleGold}>
                          {slide.titleAccent}
                        </span>
                      </h1>
                      <p className={homestyles.heroSubtitle}>{slide.subtitle}</p>
                      <button className={homestyles.heroBtn}>
                        <span>Shop Now</span>
                        <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className={homestyles.heroControls}>
        <div className={homestyles.heroDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${homestyles.heroDot} ${
                activeSlide === index ? homestyles.heroDotActive : ""
              }`}
              onClick={() => sliderRef.current?.slickGoTo(index)}
            />
          ))}
        </div>
        <div className={homestyles.heroArrows}>
          <button
            className={homestyles.heroArrowBtn}
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous slide"
          >
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
          </button>
          <button
            className={homestyles.heroArrowBtn}
            onClick={() => sliderRef.current?.slickNext()}
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
