"use client";

import ProductTable from "@/components/admin/ProductTable";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState();

    const router = useRouter();

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products", { withCredentials: true });
            setProducts(res.data.products);
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <section className="container py-4">
            <div className="admin-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products</h2>
                <Button variant="contained" onClick={() => router.push("/admin/products/create")}>
                    Add Product
                </Button>
            </div>
            <TextField fullWidth placeholder="Search Products" value={search} onChange={(e) => setSearch(e.target.value)} sx={{my: 3}}/>

            <ProductTable products={products} />
            </div>
        </section>
    )
}

export default ProductsPage