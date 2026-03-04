"use client";
import Slider from "react-slick";
import productGalleryStyles from './productDetail.module.css'


const ProductGallery = ({ product }) => {

    const images = [product.mainImage, ...(product.images || [])];
    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${productGalleryStyles.custom_next_arrow}`}
                style={{ ...style, display: "block",  }}
                onClick={onClick}
            />
        );
    }

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${productGalleryStyles.custom_prev_arrow}`}
                style={{ ...style, display: "block", }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
    };
    return (
        <div>
            <Slider {...settings}>
                {
                    images.map((img, index) => (
                        <div key={index}>
                            <div style={{ position: "relative", height: "450px" }}>
                                <img src={img} alt="Product" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </div>
                        </div>
                    ))
                }
            </Slider>

            <div className="d-flex gap-2 mt-3">
                {
                    images.map((img, index) => (
                        <div key={index} className={productGalleryStyles.productDetail_thumnail}>
                            <img src={img} alt="" style={{ objectFit: "cover" }} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ProductGallery