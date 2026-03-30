"use client";
import { useState } from "react";
import productStyles from './productDetail.module.css';

const ProductGallery = ({ product }) => {
    const images = [product.mainImage, ...(product.images || [])];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={productStyles.galleryWrap}>
            <div className={productStyles.mainImageWrap}>
                <img 
                    src={images[activeIndex]} 
                    alt="Product Main" 
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
                            <img src={img} alt={`Thumbnail ${index}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductGallery;