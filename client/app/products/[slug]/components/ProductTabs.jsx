"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function ProductTabs({ product }) {
    const [value, setValue] = useState(0);
    return (
        <Box className="mt-5">
            <Tabs variant="fullWidth" value={value} onChange={(e, newval) => setValue(newval)} textColor="primary" indicatorColor="primary">
                <Tab label="Description" />
                <Tab label="Benifits" />
                <Tab label="Reviews" />
                <Tab label="Specifiactions" />
                <Tab label="Nutrition Info" />
                <Tab label="FAQ" />
            </Tabs>

            <Box className="mt-4">
                {value === 0 && <p>{product.description}</p>}
                {
                    value === 1 && (
                        <ul>
                            {product.benifits?.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    )
                }
                {value === 2 && <p>Reveiws Section Adding Soon................</p>}
                {
                    value === 3 && (
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td><b>Brand</b></td>
                                    <td>{product.specifications?.brandName}</td>
                                </tr>
                                <tr>
                                    <td><b>Ingredients</b></td>
                                    <td>{product.specifications?.ingredients}</td>
                                </tr>

                                <tr>
                                    <td><b>Country of Origin</b></td>
                                    <td>{product.specifications?.countryOfOrigin}</td>
                                </tr>

                                <tr>
                                    <td><b>Shelf Life</b></td>
                                    <td>{product.specifications?.shelfLife}</td>
                                </tr>

                                <tr>
                                    <td><b>Vegetarian</b></td>
                                    <td>
                                        {product.specifications?.vegetarian ? "Yes" : "No"}
                                    </td>
                                </tr>

                                <tr>
                                    <td><b>Manufacturer</b></td>
                                    <td>{product.specifications?.manufacturer}</td>
                                </tr>

                                <tr>
                                    <td><b>Dimensions</b></td>
                                    <td>{product.specifications?.dimensions}</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }

                {
                    value === 4 && (
                        <table className="table table-striped">
                            <tbody>

                                <tr>
                                    <td><b>Energy</b></td>
                                    <td>{product.nutritionInfo?.energy} kcal</td>
                                </tr>

                                <tr>
                                    <td><b>Protein</b></td>
                                    <td>{product.nutritionInfo?.protein} g</td>
                                </tr>

                                <tr>
                                    <td><b>Carbohydrates</b></td>
                                    <td>{product.nutritionInfo?.carbohydrates} g</td>
                                </tr>

                                <tr>
                                    <td><b>Sugar</b></td>
                                    <td>{product.nutritionInfo?.sugar} g</td>
                                </tr>

                                <tr>
                                    <td><b>Total Fat</b></td>
                                    <td>{product.nutritionInfo?.totalFat} g</td>
                                </tr>

                            </tbody>
                        </table>
                    )
                }
            </Box>
        </Box>
    )
}

export default ProductTabs