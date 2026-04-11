"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import dryfruitStyles from "./home.module.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Image from "next/image";

const DryFruitSlider = () => {
  const [swiper, setSwiper] = useState(null);

  const items = [
    { name: "Raisin", image: "/dryfruits/almonds.png", tag: "Popular" },
    { name: "Walnut", image: "/dryfruits/walnut.png", tag: "Omega-3" },
    { name: "Pista", image: "/dryfruits/pista.png", tag: "Crunchy" },
    { name: "Cashew", image: "/dryfruits/cashew.png", tag: "Creamy" },
    { name: "Almond", image: "/dryfruits/almonds.png", tag: "Superfood" },
    { name: "Fig", image: "/dryfruits/cashew.png", tag: "Natural" },
    { name: "Dates", image: "/dryfruits/almonds.png", tag: "Energetic" },
    { name: "Apricot", image: "/dryfruits/pista.png", tag: "Vibrant" },
  ];

  return (
    <section className={dryfruitStyles.dfSection}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={dryfruitStyles.dfHeader}
        >
          <div>
            <h3 className={dryfruitStyles.dfTitle}>Shop by <span className={dryfruitStyles.dfHighlight}>Dry Fruits</span></h3>
            <p className={dryfruitStyles.dfSubtitle}>
              Explore our finest selection of premium nuts and dried fruits
            </p>
          </div>
          <div className={dryfruitStyles.dfArrows}>
            <button
              className={dryfruitStyles.dfArrowBtn}
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous"
            >
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
            </button>
            <button
              className={dryfruitStyles.dfArrowBtn}
              onClick={() => swiper?.slideNext()}
              aria-label="Next"
            >
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={dryfruitStyles.dfSliderWrap}
        >
          <Swiper
            onSwiper={setSwiper}
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1400: {
                slidesPerView: 6,
                spaceBetween: 30,
              }
            }}
            className={dryfruitStyles.dfSwiper}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={dryfruitStyles.dfCard}
                >
                  <div className={dryfruitStyles.dfCardTag}>{item.tag}</div>
                  <div className={dryfruitStyles.dfImgContent}>
                      <div className={dryfruitStyles.dfImgWrap}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          className={dryfruitStyles.dfImg}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className={dryfruitStyles.dfCardOverlay}></div>
                  </div>
                  <div className={dryfruitStyles.dfCardInfo}>
                    <h5 className={dryfruitStyles.dfCardName}>{item.name}</h5>
                    <div className={dryfruitStyles.dfCardLine}></div>
                    <button className={dryfruitStyles.dfExploreBtn}>Explore</button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default DryFruitSlider;