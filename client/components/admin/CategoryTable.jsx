"use client";

import { DeleteRounded, EditRounded, Inventory2Rounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const CategoryTable = ({ categories, onDelete }) => {
    const router = useRouter();
    
    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Category Details</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Active Products</th>
                        <th style={{ ...headerStyle, textAlign: "right" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat._id} style={{ 
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
                            {/* Details Column */}
                            <td style={{ ...cellStyle, borderRadius: "16px 0 0 16px", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <div style={{ 
                                        width: "60px", 
                                        height: "60px", 
                                        borderRadius: "14px",
                                        overflow: "hidden",
                                        background: "#FAFAFA",
                                        border: "1px solid rgba(0,0,0,0.05)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        {cat.image ? (
                                            <img src={cat.image} alt={cat.cname} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        ) : (
                                            <Inventory2Rounded sx={{ color: "#CCC", fontSize: 24 }} />
                                        )}
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 800, fontSize: "16px", color: "var(--color-primary, #5c4033)", letterSpacing: "-0.3px" }}>
                                            {cat.cname}
                                        </p>
                                        <small style={{ color: "var(--color-gold, #c89b3c)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", fontSize: "10px" }}>
                                            ID: {cat._id.substring(cat._id.length - 6)}
                                        </small>
                                    </div>
                                </div>
                            </td>

                            {/* Active Products Column */}
                            <td style={{ ...cellStyle, textAlign: "center" }}>
                                <span style={{
                                    background: cat.activeProducts > 0 ? "rgba(107, 142, 35, 0.1)" : "rgba(211, 47, 47, 0.05)",
                                    color: cat.activeProducts > 0 ? "var(--color-olive, #6b8e23)" : "#D32F2F",
                                    padding: "8px 20px",
                                    borderRadius: "50px",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px"
                                }}>
                                    <span style={{ fontSize: "16px" }}>{cat.activeProducts ?? 0}</span> 
                                    <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Items</span>
                                </span>
                            </td>

                            {/* Actions Column */}
                            <td style={{ ...cellStyle, textAlign: "right", borderRadius: "0 16px 16px 0", borderRight: "1px solid rgba(0,0,0,0.04)" }}>
                                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                    <Tooltip title="Edit Category" placement="top" arrow>
                                        <IconButton 
                                            onClick={() => router.push(`/admin/category/edit/${cat._id}`)}
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

                                    <Tooltip title="Delete Category" placement="top" arrow>
                                        <IconButton 
                                            onClick={() => onDelete(cat._id)}
                                            sx={{ 
                                                background: "rgba(211, 47, 47, 0.05)", 
                                                border: "1px solid rgba(211, 47, 47, 0.1)",
                                                color: "#D32F2F",
                                                "&:hover": { background: "#D32F2F", color: "#FFF", transform: "scale(1.1)" },
                                                transition: "all 200ms ease"
                                            }}
                                        >
                                            <DeleteRounded sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const headerStyle = {
    padding: "0 24px 16px 24px",
    color: "#999",
    fontWeight: 800,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "1px solid rgba(0,0,0,0.06)"
};

const cellStyle = {
    padding: "16px 24px",
    borderTop: "1px solid rgba(0,0,0,0.04)",
    borderBottom: "1px solid rgba(0,0,0,0.04)"
};

export default CategoryTable;
