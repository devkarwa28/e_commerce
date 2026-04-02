"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";

import dryfruitStyles from "./home.module.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const DryFruitSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 2, swipeToSlide: true, arrows: false } },
    ],
  };

  const items = [
    { name: "Raisin", image: "/dryfruits/almonds.png", tag: "Popular" },
    { name: "Walnut", image: "/dryfruits/walnut.png", tag: "Omega-3" },
    { name: "Pista", image: "/dryfruits/pista.png", tag: "Crunchy" },
    { name: "Cashew", image: "/dryfruits/cashew.png", tag: "Creamy" },
    { name: "Almond", image: "/dryfruits/almonds.png", tag: "Superfood" },
    { name: "Fig", image: "/dryfruits/cashew.png", tag: "Natural" },
  ];

  return (
    <section className={dryfruitStyles.dfSection}>
      <div className="container">
        <div className={dryfruitStyles.dfHeader}>
          <div>
            <h3 className={dryfruitStyles.dfTitle}>Shop by Dry Fruits</h3>
            <p className={dryfruitStyles.dfSubtitle}>
              Explore our finest selection of premium nuts and dried fruits
            </p>
          </div>
          <div className={dryfruitStyles.dfArrows}>
            <button
              className={dryfruitStyles.dfArrowBtn}
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous"
            >
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
            </button>
            <button
              className={dryfruitStyles.dfArrowBtn}
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next"
            >
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        </div>

        <div className={dryfruitStyles.dfSliderWrap}>
          <Slider ref={sliderRef} {...settings}>
            {items.map((item, index) => (
              <div key={index} className="px-2">
                <div className={dryfruitStyles.dfCard}>
                  <div className={dryfruitStyles.dfCardTag}>{item.tag}</div>
                  <div className={dryfruitStyles.dfImgWrap}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={dryfruitStyles.dfImg}
                    />
                  </div>
                  <h5 className={dryfruitStyles.dfCardName}>{item.name}</h5>
                  <div className={dryfruitStyles.dfCardLine}></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default DryFruitSlider;