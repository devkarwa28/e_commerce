"use client";
import { Avatar, IconButton, Badge } from '@mui/material';
import topbarStyles from './admin.module.css';
import { useAuth } from '@/context/AuthContext';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Topbar = () => {
    const { user } = useAuth();
    
    // Determine greeting based on time of day
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <div style={{
            height: "80px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            boxShadow: "0 4px 30px rgba(92, 64, 51, 0.04)",
            borderBottom: "1px solid rgba(0,0,0,0.03)",
            position: "sticky",
            top: 0,
            zIndex: 90
        }}>
            {/* Left Box - Greeting */}
            <div>
                <h6 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "var(--color-primary, #5c4033)", letterSpacing: "-0.5px" }}>
                    {greeting}, {user?.uname ? user.uname.split(' ')[0] : 'Admin'}
                </h6>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--color-text-secondary, #666)", fontWeight: 500 }}>
                    Here is a quick overview of your metrics.
                </p>
            </div>

            {/* Right Box - Actions & Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                
                {/* Search Bar */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#FAFAFA",
                    borderRadius: "50px",
                    padding: "10px 18px",
                    gap: "10px",
                    width: "280px",
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
                    <SearchRoundedIcon sx={{ color: "#999", fontSize: 20 }} />
                    <input 
                        type="text" 
                        placeholder="Search products, orders..." 
                        style={{
                            border: "none",
                            background: "transparent",
                            outline: "none",
                            fontSize: "14px",
                            color: "var(--color-text-primary, #333)",
                            width: "100%",
                            fontWeight: 500
                        }}
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    {/* Notifications */}
                    <IconButton sx={{ 
                        background: "#FAFAFA", 
                        border: "1px solid rgba(0,0,0,0.05)",
                        transition: "all 300ms ease",
                        "&:hover": { background: "#FFFFFF", boxShadow: "0 4px 12px rgba(92, 64, 51, 0.08)" }
                    }}>
                        <Badge color="error" variant="dot" overlap="circular">
                            <NotificationsRoundedIcon sx={{ color: "var(--color-primary, #5c4033)", fontSize: 22 }} />
                        </Badge>
                    </IconButton>

                    {/* Vertical Divider */}
                    <div style={{ width: "1px", height: "32px", background: "rgba(0,0,0,0.08)" }} />

                    {/* User Profile Container */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "6px 14px 6px 6px",
                        borderRadius: "50px",
                        cursor: "pointer",
                        transition: "all 300ms ease",
                        border: "1px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#FAFAFA";
                        e.currentTarget.style.border = "1px solid rgba(0,0,0,0.05)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.border = "1px solid transparent";
                    }}
                    >
                        <Avatar sx={{ 
                            background: "var(--color-primary, #5c4033)", 
                            width: 42, 
                            height: 42, 
                            fontSize: "16px", 
                            fontWeight: 700, 
                            boxShadow: "0 4px 15px rgba(92, 64, 51, 0.2)" 
                        }}>
                            {user?.uname ? user.uname.charAt(0).toUpperCase() : "A"}
                        </Avatar>
                        
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--color-text-primary, #333)", lineHeight: 1.2 }}>
                                {user?.uname || "Admin User"}
                            </span>
                            <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--color-gold, #c89b3c)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                Store Manager
                            </span>
                        </div>
                        <KeyboardArrowDownRoundedIcon sx={{ color: "#999", fontSize: 20, marginLeft: "4px" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar;