"use client";

import { useState } from "react";
import Slider from "react-slick";
import productGalleryStyles from './productDetail.module.css'


const ProductGallery = ({product}) => {
    const images = [product.mainImage,...(product.images || [])];
    const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
        <Slider {...settings}>
            {
                images.map((img,index)=>(
                    <div key={index}>
                        <div style={{position:"relative",height:"450px"}}>
                            <img src={img} alt="Product" style={{objectFit:"cover", width:"100%", height:"100%"}} />
                        </div>
                    </div>
                ))
            }
        </Slider>

        <div className="d-flex gap-2 mt-3">
            {
                images.map((img,index)=>(
                    <div key={index} className={productGalleryStyles.productDetail_thumnail}>
                        <img src={img} alt="" style={{objectFit:"cover"}} />
                    </div>
                ))
            }
        </div>
    </div>
  );
}

export default ProductGallery