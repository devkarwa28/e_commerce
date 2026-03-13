"use client";

import { Delete, Edit, Star } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import productTableStyle from './admin.module.css';

const ProductTable = ({ products,onToggleStatus }) => {
    const router = useRouter()
    return (
        <table className={`${productTableStyle.ProductTable} table table-hover align-middle`}>

            <thead>

                <tr>
                    <th>Product</th>
                    <th className=" text-center">Price</th>
                    <th className=" text-center">Variants</th>
                    <th className=" text-center">Total Stock</th>
                    <th className=" text-center">Rating</th>
                    <th className=" text-center">Status</th>
                    <th className=" text-center">Actions</th>
                </tr>

            </thead>

            <tbody>

                {products.map(product => {

                    const prices = product.weightOptions.map(w => w.price);
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);

                    const totalStock = product.weightOptions.reduce(
                        (acc, item) => acc + item.stock,
                        0
                    );

                    return (

                        <tr key={product._id} className={productTableStyle.productRow}>

                            <td>

                                <div className="d-flex align-items-center gap-3">

                                    <img src={product.mainImage} className={productTableStyle.productImg} />

                                    <div>

                                        <p className="fw-semibold mb-0">

                                            {product.pname}

                                            {product.isFeatured && (
                                                <span className="badge bg-warning ms-2">
                                                    Featured
                                                </span>
                                            )}

                                        </p>

                                        <small className="text-muted">
                                            {product.category?.name}
                                        </small>

                                    </div>

                                </div>

                            </td>

                            <td className="text-center" style={{ fontWeight: 600, color: "#5c4033" }}>
                                ₹{minPrice} - ₹{maxPrice}
                            </td>

                            <td className="text-center">
                                <span className="badge bg-secondary">
                                    {product.weightOptions.length} Variants
                                </span>
                            </td>

                            <td className="text-center">

                                <span className={`badge ${totalStock > 20 ? "bg-success" : "bg-warning"
                                    }`}>

                                    {totalStock}

                                </span>

                            </td>

                            <td className="text-center">
                                {<Star color="secondary" />} {product.ratings}
                            </td>

                            <td className="text-center">

                                <span className={`badge ${product.isActive ? "bg-success" : "bg-danger"
                                    }`}>

                                    {product.isActive ? "Active" : "Disabled"}

                                </span>

                            </td>

                            <td>

                                <div className="d-flex gap-2 justify-content-center">

                                    <Button size="medium" startIcon={<Edit />} variant="contained" onClick={() => router.push(`/admin/products/edit/${product._id}`)}>
                                        Edit
                                    </Button>

                                    <Button
                                        size="medium"
                                        startIcon={<Delete />}
                                        variant="outlined"
                                        color={product.isActive ? "error" : "success"}
                                        onClick={() => onToggleStatus(product._id)}
                                    >
                                        {product.isActive ? "Disable" : "Enable"}
                                    </Button>
                                </div>

                            </td>

                        </tr>

                    );

                })}

            </tbody>

        </table>

    )
}

export default ProductTable