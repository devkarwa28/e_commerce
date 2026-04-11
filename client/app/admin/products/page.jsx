"use client";

import ProductTable from "@/components/admin/ProductTable";
import { AddRounded, SearchRounded } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [search, setSearch] = useState("");

    const router = useRouter();

    const fetchProducts = async () => {
        console.log(" API CALLED (Products Admin Page)");
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { withCredentials: true });
            return res.data.product;
        }
        catch (err) {
            console.log(err)
        }
    }
    
    const toggleStatus = async (id) => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,{},{ withCredentials:true });
            setProducts(prev =>
                prev.map(p =>
                    p._id === id ? { ...p, isActive: !p.isActive } : p
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

   const {data: product, isLoading, refetch} = useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 3
   })

    const filteredProducts = product.filter(p => 
        p.pname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="container py-5" style={{ padding: "40px 20px" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
                <div>
                    <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--color-primary, #5c4033)", margin: "0 0 8px 0", letterSpacing: "-1px" }}>Product Management</h2>
                    <p style={{ fontSize: "16px", color: "var(--color-text-secondary, #666)", margin: 0, fontWeight: 500 }}>Control your entire inventory and catalog</p>
                </div>
                
                <button 
                    onClick={() => router.push("/admin/products/create")}
                    style={{
                        background: "var(--color-gold, #c89b3c)",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "12px",
                        padding: "12px 24px",
                        fontWeight: 700,
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        boxShadow: "0 8px 20px rgba(200, 155, 60, 0.3)",
                        transition: "all 300ms ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(200, 155, 60, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(200, 155, 60, 0.3)";
                    }}
                >
                    <AddRounded sx={{ fontSize: 20 }} /> Add New Product
                </button>
            </div>

            {/* Main Card Wrapper */}
            <div style={{
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 12px 35px rgba(92, 64, 51, 0.04)",
                border: "1px solid rgba(0,0,0,0.03)"
            }}>
                {/* Search Bar */}
                <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        background: "#FAFAFA",
                        borderRadius: "16px",
                        padding: "12px 20px",
                        gap: "12px",
                        width: "360px",
                        border: "1px solid rgba(0,0,0,0.04)",
                        transition: "all 300ms ease"
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.background = "#FFFFFF";
                        e.currentTarget.style.border = "1px solid var(--color-gold, #c89b3c)";
                        e.currentTarget.style.boxShadow = "0 0 0 4px rgba(200, 155, 60, 0.1)";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.background = "#FAFAFA";
                        e.currentTarget.style.border = "1px solid rgba(0,0,0,0.04)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                    >
                        <SearchRounded sx={{ color: "#999", fontSize: 22 }} />
                        <input 
                            type="text" 
                            placeholder="Search completely by product name..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                border: "none",
                                background: "transparent",
                                outline: "none",
                                fontSize: "15px",
                                color: "var(--color-text-primary, #333)",
                                width: "100%",
                                fontWeight: 500
                            }}
                        />
                    </div>
                    
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#888" }}>
                        Showing {filteredProducts.length} items
                    </div>
                </div>

                <ProductTable products={filteredProducts} onToggleStatus={toggleStatus} />
            </div>
        </section>
    )
}

export default ProductsPage;