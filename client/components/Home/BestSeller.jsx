"use client";
import { Button, Rating } from '@mui/material';
import bestStyles from './home.module.css'
import Slider from 'react-slick'

const BestSeller = () => {
     const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 992,
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
    },
    {
      name: "Jumbo Cashews",
      image: "/products/p2.png",
      price: 1099,
      rating: 4.7,
    },
    {
      name: "Afghani Dates",
      image: "/products/p3.png",
      price: 749,
      rating: 4.3,
    },
    {
      name: "Mixed Seeds Pack",
      image: "/products/p4.png",
      price: 599,
      rating: 4.6,
    },
    {
      name: "Luxury Combo Box",
      image: "/products/p5.png",
      price: 2499,
      rating: 4.9,
    },
  ];
  return (
    <section className={`${bestStyles.bestSeller} py-5`}>
        <div className="container">
            <h1 className='text-center mb-5 fw-bolder'> Best Sellers    </h1>
            <Slider {...settings}>
                {
                    products.map((product,index)=>(
                        <div key={index} className='px-3'>
                            <ProductCard product={product}/>
                        </div>
                    ))
                }
            </Slider>
        </div>
    </section>
  )
}

function ProductCard({product}){
    return(
        <div className={`${bestStyles.productCard} card border-0 shadow-sm`}>
            <img src={product.image} alt={product.name} className='card-img-top' />
            <div className='card-body text-center'>
                <h5 className='fw-bold mb-3'>{product.name}</h5>
                <Rating value={product.rating} precision={0.5} readOnly size='small' />
                <p className='fw-bold mt-2'> ₹{product.price}</p>
                <Button variant='contained' fullWidth>Add To Cart</Button>
            </div>
        </div>
    )
}
export default BestSeller