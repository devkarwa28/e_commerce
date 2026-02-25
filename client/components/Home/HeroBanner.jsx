"use client";
import Slider from "react-slick";
import homestyles from './home.module.css'
import { Button } from "@mui/material";


const HeroBanner = () => {
    function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}
    const slides = [
        {
            title: "Premium Dry Fruits For Every Occasion",
            subtitle:
                "Naturally sourced, freshly packed and delivered with care.",
            image: "/hero1.jpg",
            badge: "UP TO 40% OFF",
        },
        {
            title: "Healthy Snacking Starts Here",
            subtitle:
                "Rich in nutrients, full of taste and premium quality.",
            image: "/hero2.jpg",
            badge: "FESTIVE SPECIAL",
        },
        {
            title: "Luxury Gifting Combos",
            subtitle:
                "Elegant dry fruit boxes for weddings & celebrations.",
            image: "/hero3.jpg",
            badge: "LIMITED OFFER",
        },
    ];
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear",
         nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
    };
    return (
        <section className={homestyles.heroBanner}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index}>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className={homestyles.heroContent}>
                                        <h5 className='px-3 py-1 mb-2 d-inline-block'>UP TO 40% OFF</h5>
                                        <h1>Premium Dry Fruits <br />For Every Occasion</h1>
                                        <p>
                                            Naturally sourced, freshly packed and delivered
                                            with care. Experience the finest quality nuts,
                                            berries and seeds.
                                        </p>
                                        <Button variant="contained">
                                            Shop Now
                                        </Button>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <img src={slide.image} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default HeroBanner;
