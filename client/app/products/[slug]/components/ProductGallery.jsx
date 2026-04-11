"use client";
import { useState } from "react";
import productStyles from './productDetail.module.css';
import Image from "next/image";

const ProductGallery = ({ product }) => {
    const images = [product.mainImage, ...(product.images || [])];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={productStyles.galleryWrap}>
            <div className={productStyles.mainImageWrap}>
                <Image
                    src={images[activeIndex]} 
                    alt="Product Main" 
                    fill
                    className={productStyles.mainImage} 
                />
            </div>

            {images.length > 1 && (
                <div className={productStyles.thumbnailStrip}>
                    {images.map((img, index) => (
                        <div 
                            key={index} 
                            className={`${productStyles.thumbnail} ${activeIndex === index ? productStyles.activeThumbnail : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <Image src={img} alt={`Thumbnail ${index}`} width={100} height={100} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductGallery;