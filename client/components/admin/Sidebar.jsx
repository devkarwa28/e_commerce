"use client";

import {
    CategoryRounded,
    DashboardRounded,
    Inventory2Rounded,
    LocalOfferRounded,
    ShoppingBagRounded,
    StorefrontRounded,
    LogoutRounded,
    Image
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
    const path = usePathname();
    const [hoveredPath, setHoveredPath] = useState(null);

    const menu = [
        { label: "Dashboard", href: "/admin", icon: <DashboardRounded /> },
        { label: "Products", href: "/admin/products", icon: <Inventory2Rounded /> },
        { label: "Categories", href: "/admin/category", icon: <CategoryRounded /> },
        { label: "Orders", href: "/admin/orders", icon: <ShoppingBagRounded /> },
        { label: "Coupons", href: "/admin/coupons", icon: <LocalOfferRounded /> },
        {label: "Hero Banner", href: "/admin/hero-banner", icon: <Image />}

    ];

    return (
        <aside style={{
            width: "280px",
            minWidth: "280px",
            background: "#18110D", // Deep luxury chocolate
            minHeight: "100vh",
            position: "sticky",
            top: 0,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "4px 0 24px rgba(0,0,0,0.2)",
            zIndex: 100
        }}>
            {/* Logo Area */}
            <div style={{
                padding: "36px 32px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "24px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                        width: "44px",
                        height: "44px",
                        background: "var(--color-gold, #c89b3c)",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        boxShadow: "0 6px 20px rgba(200, 155, 60, 0.35)",
                        flexShrink: 0
                    }}>
                        <StorefrontRounded sx={{ fontSize: 24 }} />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, color: "#FFFFFF", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px" }}>Nutrivia</h4>
                        <span style={{ fontSize: "11px", color: "var(--color-gold, #c89b3c)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px" }}>Workspace</span>
                    </div>
                </div>
            </div>

            {/* Menu Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 20px", flexGrow: 1 }}>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", padding: "0 12px", marginBottom: "8px" }}>Main Menu</p>
                {menu.map(item => {
                    const isActive = path === item.href;
                    const isHovered = hoveredPath === item.href;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onMouseEnter={() => setHoveredPath(item.href)}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "14px 16px",
                                borderRadius: "14px",
                                textDecoration: "none",
                                background: isActive ? "rgba(200, 155, 60, 0.12)" : (isHovered ? "rgba(255, 255, 255, 0.04)" : "transparent"),
                                color: isActive ? "var(--color-gold, #c89b3c)" : (isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)"),
                                transition: "all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                position: "relative",
                                overflow: "hidden",
                                transform: isHovered && !isActive ? "translateX(6px)" : "none",
                                boxShadow: isActive ? "inset 0 0 0 1px rgba(200, 155, 60, 0.2)" : "none"
                            }}
                        >
                            {/* Active Indicator Bar */}
                            {isActive && (
                                <div style={{
                                    position: "absolute",
                                    left: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    height: "50%",
                                    width: "4px",
                                    background: "var(--color-gold, #c89b3c)",
                                    borderRadius: "0 4px 4px 0",
                                    boxShadow: "0 0 10px rgba(200, 155, 60, 0.5)"
                                }} />
                            )}

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                transform: isHovered || isActive ? "scale(1.15)" : "scale(1)"
                            }}>
                                {item.icon}
                            </div>
                            <span style={{ fontSize: "15px", fontWeight: isActive ? 700 : 600 }}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        borderRadius: "14px",
                        background: "rgba(211, 47, 47, 0.1)",
                        color: "#D32F2F",
                        border: "1px solid rgba(211, 47, 47, 0.2)",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "15px",
                        transition: "all 300ms ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#D32F2F";
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(211, 47, 47, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(211, 47, 47, 0.1)";
                        e.currentTarget.style.color = "#D32F2F";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    <LogoutRounded sx={{ fontSize: 20 }} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar;