"use client";
import topProductStyles from './admin.module.css';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

const TopProducts = ({ products }) => {
    return (
        <div className={topProductStyles.adminCard} style={{ 
            padding: "36px", 
            borderRadius: "24px", 
            background: "#FFFFFF", 
            boxShadow: "0 12px 35px rgba(92, 64, 51, 0.04)", 
            border: "1px solid rgba(200, 155, 60, 0.1)",
            position: "relative",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Soft decorative background glow */}
            <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "rgba(200, 155, 60, 0.05)", filter: "blur(60px)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', position: "relative", zIndex: 1 }}>
                <div>
                    <h5 style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-primary, #5c4033)", margin: 0, letterSpacing: "-0.5px" }}>Top Performers</h5>
                    <p style={{ fontSize: "14px", color: "var(--color-text-secondary, #666)", margin: "6px 0 0", fontWeight: 500 }}>Most popular by volume</p>
                </div>
                <div style={{ background: "rgba(200, 155, 60, 0.1)", color: "var(--color-gold, #c89b3c)", padding: "10px 16px", borderRadius: "50px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                    <WorkspacePremiumRoundedIcon sx={{ fontSize: 20 }} />
                </div>
            </div>

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", paddingRight: "4px" }}>
                {products?.map((product, index) => (
                    <div 
                        key={product._id} 
                        style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "space-between",
                            padding: "16px",
                            borderRadius: "16px",
                            background: index === 0 ? "rgba(200, 155, 60, 0.04)" : "#FAFAFA",
                            border: index === 0 ? "1px solid rgba(200, 155, 60, 0.2)" : "1px solid rgba(0,0,0,0.03)",
                            transition: "all 300ms ease",
                            cursor: "default"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateX(5px)";
                            e.currentTarget.style.boxShadow = "0 6px 15px rgba(92, 64, 51, 0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateX(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            {/* Rank Badge */}
                            <div style={{ 
                                width: "36px", 
                                height: "36px", 
                                borderRadius: "10px", 
                                background: index === 0 ? "var(--color-gold, #c89b3c)" : index === 1 ? "#D1D5DB" : index === 2 ? "#D97706" : "#E5E7EB",
                                color: index === 0 ? "#FFF" : index === 1 ? "#374151" : index === 2 ? "#FFF" : "#6B7280",
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center",
                                fontWeight: 800,
                                fontSize: "14px",
                                boxShadow: index === 0 ? "0 4px 12px rgba(200, 155, 60, 0.3)" : "none",
                                flexShrink: 0
                            }}>
                                {index === 0 ? <StarRoundedIcon sx={{ fontSize: 20 }} /> : `${index + 1}`}
                            </div>
                            
                            <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-primary, #333)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "140px" }}>
                                {product.pname}
                            </span>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0 }}>
                            <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-primary, #5c4033)", lineHeight: 1.2 }}>{product.totalSold}</span>
                            <span style={{ fontSize: "11px", color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Sold</span>
                        </div>
                    </div>
                ))}
            </div>
            {(!products || products.length === 0) && (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#999", fontSize: "14px", fontWeight: 600 }}>
                    No products data available.
                </div>
            )}
        </div>
    )
}

export default TopProducts;