"use client";
import { Rating } from '@mui/material';
import testiStyles from './home.module.css'
import Slider from 'react-slick'

const Testimonials = () => {
    const settings = {
    infinite: true,
    speed: 600,
    autoplay: true,
    slidesToShow: 3,
    autoplaySpeed: 4500,
    arrows: false,
  };

  const testimonials = [
    {
      name: "Rohit Sharma",
      text: "Absolutely premium quality almonds and cashews. Freshness is unmatched. Highly recommended!",
      rating: 5,
    },
    {
      name: "Ananya Verma",
      text: "The packaging feels luxury and delivery was super quick. Loved the dry fruit combo box.",
      rating: 4.5,
    },
    {
      name: "Vikram Singh",
      text: "Best dry fruits brand I've tried. Quality and taste both are excellent.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      text: "Best dry fruits brand I've tried. Quality and taste both are excellent.",
      rating: 5,
    },
  ];
  return (
    <section className={`${testiStyles.testi} py-5`} style={{background: "white"}}>
        <div className="container">
            <h1 className='fw-bolder text-center'>What Our Customers Say</h1>
            <div style={{ margin: "0 auto"}}>
                <Slider {...settings}>
                    {
                        testimonials.map((item,index)=>(
                            <div key={index} className='px-4'>
                                <div className='p-4 shadow-sm' style={{backgroundColor:"white",borderRadius:"16px"}}>
                                    <Rating value={item.rating} precision={0.5} readOnly sx={{color:"#c89b3c"}}/>
                                    <p className='mt-3'> “{item.text}”</p>
                                    <h5 className='mt-3 fw-semibold'> — {item.name}</h5>
                                </div>
                            </div>
                        ))
                    } 
            </Slider>
            </div>
        </div>
    </section>
  )
}

export default Testimonials