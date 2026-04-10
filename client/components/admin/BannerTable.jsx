"use client";

import { DeleteRounded, EditRounded, ImageNotSupportedRounded } from "@mui/icons-material";
import { IconButton, Switch, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const BannerTable = ({ banners, onDelete }) => {
    const router = useRouter();
    
    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Banner Preview</th>
                        <th style={headerStyle}>Details</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Status</th>
                        <th style={{ ...headerStyle, textAlign: "right" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map(banner => (
                        <tr key={banner._id} style={{ 
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
                            {/* Preview Column */}
                            <td style={{ ...cellStyle, borderRadius: "16px 0 0 16px", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
                                <div style={{ 
                                    width: "120px", 
                                    height: "60px", 
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    background: "#FAFAFA",
                                    border: "1px solid rgba(0,0,0,0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}>
                                    {banner.image ? (
                                        <img src={banner.image} alt={banner.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <ImageNotSupportedRounded sx={{ color: "#CCC", fontSize: 24 }} />
                                    )}
                                </div>
                            </td>

                            {/* Details Column */}
                            <td style={{ ...cellStyle }}>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 800, fontSize: "16px", color: "var(--color-primary, #5c4033)", letterSpacing: "-0.3px" }}>
                                        {banner.title} {banner.titleAccent && <span style={{ color: "var(--color-gold, #c89b3c)" }}>{banner.titleAccent}</span>}
                                    </p>
                                    <small style={{ color: "#666", fontWeight: 500, display: "block", marginTop: "4px" }}>
                                        {banner.subtitle || "No subtitle"}
                                    </small>
                                    {banner.badge && (
                                        <span style={{ 
                                            display: "inline-block", 
                                            marginTop: "6px", 
                                            background: "rgba(200, 155, 60, 0.1)", 
                                            color: "var(--color-gold, #c89b3c)", 
                                            padding: "2px 8px", 
                                            borderRadius: "4px", 
                                            fontSize: "10px", 
                                            fontWeight: 700, 
                                            textTransform: "uppercase" 
                                        }}>
                                            {banner.badge}
                                        </span>
                                    )}
                                </div>
                            </td>

                            {/* Status Column */}
                            <td style={{ ...cellStyle, textAlign: "center" }}>
                                <span style={{
                                    background: banner.active ? "rgba(107, 142, 35, 0.1)" : "rgba(211, 47, 47, 0.05)",
                                    color: banner.active ? "var(--color-olive, #6b8e23)" : "#D32F2F",
                                    padding: "6px 12px",
                                    borderRadius: "50px",
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    display: "inline-flex",
                                    alignItems: "center"
                                }}>
                                    {banner.active ? "Active" : "Inactive"}
                                </span>
                            </td>

                            {/* Actions Column */}
                            <td style={{ ...cellStyle, textAlign: "right", borderRadius: "0 16px 16px 0", borderRight: "1px solid rgba(0,0,0,0.04)" }}>
                                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                    <Tooltip title="Edit Banner" placement="top" arrow>
                                        <IconButton 
                                            onClick={() => router.push(`/admin/hero-banner/edit/${banner._id}`)}
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

                                    <Tooltip title="Delete Banner" placement="top" arrow>
                                        <IconButton 
                                            onClick={() => onDelete(banner._id)}
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
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    textAlign: "left"
};

const cellStyle = {
    padding: "16px 24px",
    borderTop: "1px solid rgba(0,0,0,0.04)",
    borderBottom: "1px solid rgba(0,0,0,0.04)"
};

export default BannerTable;
