"use client";
import React from 'react';

const StatCard = ({ title, value, color, icon }) => {
    return (
        <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(92, 64, 51, 0.05)",
            border: `1px solid ${color}20`,
            position: "relative",
            overflow: "hidden",
            transition: "all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "20px"
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = `0 15px 40px ${color}30`;
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(92, 64, 51, 0.05)";
        }}
        >
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "150px",
                height: "150px",
                background: `radial-gradient(circle at top right, ${color}20, transparent 70%)`,
                opacity: 0.8,
                pointerEvents: "none"
            }} />
            

            <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: `${color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: color,
                flexShrink: 0
            }}>
                {icon}
            </div>


            <div style={{ zIndex: 1 }}>
                <h6 style={{ fontSize: "13px", fontWeight: 700, color: "#888", margin: "0 0 4px 0", letterSpacing: "0.5px", textTransform: "uppercase" }}>{title}</h6>
                <h3 style={{ fontSize: "26px", fontWeight: 800, color: "var(--color-primary, #5c4033)", margin: 0, lineHeight: 1 }}>{value}</h3>
            </div>
        </div>
    )
}

export default StatCard