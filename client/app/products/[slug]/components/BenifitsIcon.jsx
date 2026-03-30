"use client";
import { FavoriteBorder, FitnessCenter, HealthAndSafety, Spa } from "@mui/icons-material";
import productStyles from './productDetail.module.css';

const BenifitsIcon = () => {
    const benefits = [
        { icon: <FavoriteBorder />, title: "Heart Healthy" },
        { icon: <Spa />, title: "Gluten Free" },
        { icon: <FitnessCenter />, title: "Powerful Nutrition" },
        { icon: <HealthAndSafety />, title: "Cholesterol Free" }
    ];

    return (
        <div className={productStyles.benefitsWrap}>
            {benefits.map((item, index) => (
                <div key={index} className={productStyles.benefitItem}>
                    <div className={productStyles.benefitIcon}>
                        {item.icon}
                    </div>
                    <p className={productStyles.benefitTitle}>
                        {item.title}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default BenifitsIcon;