"use client";
import { useState, useRef } from "react";
import { Rating } from "@mui/material";
import testiStyles from "./home.module.css";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function Testimonials() {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      name: "Keshav Karwa",
      location: "Mumbai",
      text: "Absolutely premium quality almonds and cashews. Freshness is unmatched. Highly recommended for anyone who values quality!",
      rating: 5,
      initials: "KK",
    },
    {
      name: "Dev Karwa",
      location: "Delhi",
      text: "The packaging feels luxury and delivery was super quick. Loved the dry fruit combo box — perfect for gifting.",
      rating: 4.5,
      initials: "DK",
    },
    {
      name: "Harshit Vijaywargiya",
      location: "Jaipur",
      text: "Best dry fruits brand I've ever tried. Quality and taste both are excellent. My family absolutely loves it.",
      rating: 5,
      initials: "HV",
    },
    {
      name: "Ayushi Maheshwari",
      location: "Ahmedabad",
      text: "Ordered the premium mixed nuts box and was blown away by the freshness. Will definitely be a regular customer!",
      rating: 5,
      initials: "AM",
    },
    {
      name: "Radika Maheshwari",
      location: "Bangalore",
      text: "The festive gift box was a hit at our Diwali celebration. Beautifully packed and absolutely delicious!",
      rating: 4.5,
      initials: "RM",
    },
  ];

  const settings = {
    infinite: true,
    speed: 600,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    beforeChange: (_, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className={testiStyles.testiSection}>
      <div className="container">
        <div className={testiStyles.testiHeader}>
          <div className={testiStyles.testiBadge}>
            <FormatQuoteRoundedIcon sx={{ fontSize: 16 }} />
            <span>Testimonials</span>
          </div>
          <h2 className={testiStyles.testiTitle}>
            What Our <span className={testiStyles.testiHighlight}>Customers</span> Say
          </h2>
          <p className={testiStyles.testiSubtitle}>
            Real stories from real customers who trust Nutrivia for quality and freshness.
          </p>
        </div>

        <div className={testiStyles.testiSliderWrap}>
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((item, index) => (
              <div key={index} className="px-3">
                <div className={testiStyles.testiCard}>
                  <div className={testiStyles.testiQuoteIcon}>
                    <FormatQuoteRoundedIcon sx={{ fontSize: 24 }} />
                  </div>

                  <Rating
                    value={item.rating}
                    precision={0.5}
                    readOnly
                    sx={{
                      color: "#C89B3C",
                      fontSize: 20,
                      marginBottom: "16px",
                    }} />

                  <p className={testiStyles.testiText}>&ldquo;{item.text}&rdquo;</p>

                  <div className={testiStyles.testiDivider}></div>

                  <div className={testiStyles.testiCustomer}>
                    <div className={testiStyles.testiAvatar}>
                      {item.initials}
                    </div>
                    <div>
                      <h6 className={testiStyles.testiName}>{item.name}</h6>
                      <span className={testiStyles.testiLocation}>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className={testiStyles.testiControls}>
          <div className={testiStyles.testiDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${testiStyles.testiDot} ${activeSlide === index ? testiStyles.testiDotActive : ""}`}
                onClick={() => sliderRef.current?.slickGoTo(index)} />
            ))}
          </div>

          <div className={testiStyles.testiArrows}>
            <button
              className={testiStyles.testiArrowBtn}
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous testimonial"
            >
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              className={testiStyles.testiArrowBtn}
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next testimonial"
            >
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;