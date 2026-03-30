"use client";
import { useState } from "react";
import productStyles from './productDetail.module.css';

function ProductTabs({ product }) {
    const tabs = [
        "Description", 
        "Benefits", 
        "Specifications", 
        "Nutrition Info"
    ];
    
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={productStyles.tabsContainer}>
            <div className={productStyles.tabsHeader}>
                {tabs.map((tab, index) => (
                    <button 
                        key={index}
                        className={`${productStyles.tabBtn} ${activeTab === index ? productStyles.activeTab : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className={productStyles.tabContent}>
                {activeTab === 0 && <p style={{ margin: 0 }}>{product.description}</p>}
                
                {activeTab === 1 && (
                    <ul>
                        {product.benifits?.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                )}

                {activeTab === 2 && (
                    <table className={productStyles.specsTable}>
                        <tbody>
                            <tr>
                                <td>Brand</td>
                                <td>{product.specifications?.brandName}</td>
                            </tr>
                            <tr>
                                <td>Ingredients</td>
                                <td>{product.specifications?.ingredients}</td>
                            </tr>
                            <tr>
                                <td>Country of Origin</td>
                                <td>{product.specifications?.countryOfOrigin}</td>
                            </tr>
                            <tr>
                                <td>Shelf Life</td>
                                <td>{product.specifications?.shelfLife}</td>
                            </tr>
                            <tr>
                                <td>Vegetarian</td>
                                <td>{product.specifications?.vegetarian ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Manufacturer</td>
                                <td>{product.specifications?.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Dimensions</td>
                                <td>{product.specifications?.dimensions}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {activeTab === 3 && (
                    <table className={productStyles.specsTable}>
                        <tbody>
                            <tr>
                                <td>Energy</td>
                                <td>{product.nutritionInfo?.energy} kcal</td>
                            </tr>
                            <tr>
                                <td>Protein</td>
                                <td>{product.nutritionInfo?.protein} g</td>
                            </tr>
                            <tr>
                                <td>Carbohydrates</td>
                                <td>{product.nutritionInfo?.carbohydrates} g</td>
                            </tr>
                            <tr>
                                <td>Sugar</td>
                                <td>{product.nutritionInfo?.sugar} g</td>
                            </tr>
                            <tr>
                                <td>Total Fat</td>
                                <td>{product.nutritionInfo?.totalFat} g</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default ProductTabs;