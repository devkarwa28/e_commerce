"use client";

import { EditRounded, VisibilityOffRounded, VisibilityRounded, StarRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const ProductTable = ({ products, onToggleStatus }) => {
    const router = useRouter();

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Product</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Price Range</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Variants</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Total Stock</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Rating</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Status</th>
                        <th style={{ ...headerStyle, textAlign: "right" }}>Actions</th>
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
                            <tr key={product._id} style={{ 
                                background: "#FFFFFF",
                                transition: "all 300ms ease",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "0 12px 25px rgba(92, 64, 51, 0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
                            }}
                            >
                                {/* Product Info Column */}
                                <td style={{ padding: "16px 20px", borderRadius: "16px 0 0 16px", borderTop: "1px solid rgba(0,0,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.04)", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <div style={{ 
                                            width: "56px", 
                                            height: "56px", 
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            background: "#FAFAFA",
                                            border: "1px solid rgba(0,0,0,0.05)",
                                            flexShrink: 0
                                        }}>
                                            <img 
                                                src={product.mainImage} 
                                                alt={product.pname}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                            />
                                        </div>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                                <p style={{ margin: 0, fontWeight: 800, fontSize: "15px", color: "var(--color-text-primary, #333)" }}>
                                                    {product.pname}
                                                </p>
                                                {product.isFeatured && (
                                                    <span style={{ 
                                                        background: "var(--color-gold, #c89b3c)", 
                                                        color: "#FFF", 
                                                        fontSize: "10px", 
                                                        fontWeight: 800, 
                                                        padding: "2px 8px", 
                                                        borderRadius: "50px",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.5px"
                                                    }}>
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <small style={{ color: "#888", fontWeight: 600 }}>
                                                {product.category?.name || "Uncategorized"}
                                            </small>
                                        </div>
                                    </div>
                                </td>

                                {/* Price Column */}
                                <td style={{ ...cellStyle, textAlign: "center", fontWeight: 700, color: "var(--color-primary, #5c4033)" }}>
                                    ₹{minPrice} {minPrice !== maxPrice ? `- ₹${maxPrice}` : ''}
                                </td>

                                {/* Variants Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <span style={{ 
                                        background: "#F5F5F5", 
                                        color: "#555", 
                                        padding: "6px 12px", 
                                        borderRadius: "50px", 
                                        fontWeight: 700,
                                        fontSize: "12px" 
                                    }}>
                                        {product.weightOptions.length} Options
                                    </span>
                                </td>

                                {/* Total Stock Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <span style={{ 
                                        background: totalStock > 20 ? "rgba(107, 142, 35, 0.1)" : "rgba(200, 155, 60, 0.1)", 
                                        color: totalStock > 20 ? "var(--color-olive, #6b8e23)" : "var(--color-gold, #c89b3c)", 
                                        padding: "6px 16px", 
                                        borderRadius: "50px", 
                                        fontWeight: 800,
                                        fontSize: "13px" 
                                    }}>
                                        {totalStock}
                                    </span>
                                </td>

                                {/* Rating Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                        <StarRounded sx={{ color: "var(--color-gold, #c89b3c)", fontSize: 18 }} />
                                        <span style={{ fontWeight: 800, color: "#333", fontSize: "14px" }}>{product.ratings || "0.0"}</span>
                                    </div>
                                </td>

                                {/* Status Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <span style={{
                                        background: product.isActive ? "rgba(107, 142, 35, 0.1)" : "rgba(211, 47, 47, 0.1)",
                                        color: product.isActive ? "var(--color-olive, #6b8e23)" : "#D32F2F",
                                        padding: "6px 16px",
                                        borderRadius: "50px",
                                        fontWeight: 800,
                                        fontSize: "12px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    }}>
                                        {product.isActive ? "Active" : "Disabled"}
                                    </span>
                                </td>

                                {/* Actions Column */}
                                <td style={{ ...cellStyle, textAlign: "right", borderRadius: "0 16px 16px 0", borderRight: "1px solid rgba(0,0,0,0.04)" }}>
                                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                        <Tooltip title="Edit Product" placement="top" arrow>
                                            <IconButton 
                                                onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                                                sx={{ 
                                                    background: "#FAFAFA", 
                                                    border: "1px solid rgba(0,0,0,0.05)",
                                                    color: "var(--color-gold, #c89b3c)",
                                                    "&:hover": { background: "var(--color-gold, #c89b3c)", color: "#FFF", transform: "scale(1.1)" },
                                                    transition: "all 200ms ease"
                                                }}
                                            >
                                                <EditRounded sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        <Tooltip title={product.isActive ? "Disable Product" : "Enable Product"} placement="top" arrow>
                                            <IconButton 
                                                onClick={() => onToggleStatus(product._id)}
                                                sx={{ 
                                                    background: product.isActive ? "rgba(211, 47, 47, 0.05)" : "rgba(107, 142, 35, 0.05)", 
                                                    border: `1px solid ${product.isActive ? "rgba(211, 47, 47, 0.1)" : "rgba(107, 142, 35, 0.1)"}`,
                                                    color: product.isActive ? "#D32F2F" : "var(--color-olive, #6b8e23)",
                                                    "&:hover": { background: product.isActive ? "#D32F2F" : "var(--color-olive, #6b8e23)", color: "#FFF", transform: "scale(1.1)" },
                                                    transition: "all 200ms ease"
                                                }}
                                            >
                                                {product.isActive ? <VisibilityOffRounded sx={{ fontSize: 18 }} /> : <VisibilityRounded sx={{ fontSize: 18 }} />}
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
            {(!products || products.length === 0) && (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#999", fontSize: "16px", fontWeight: 600 }}>
                    No products found matching your criteria.
                </div>
            )}
        </div>
    )
}

const headerStyle = {
    padding: "0 20px 16px 20px",
    color: "#999",
    fontWeight: 800,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "1px solid rgba(0,0,0,0.06)"
};

const cellStyle = {
    padding: "16px 20px",
    borderTop: "1px solid rgba(0,0,0,0.04)",
    borderBottom: "1px solid rgba(0,0,0,0.04)"
};

export default ProductTable;