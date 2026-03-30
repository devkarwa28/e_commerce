"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import chartStyles from './admin.module.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: "16px",
                padding: "20px 24px",
                boxShadow: "0 12px 40px rgba(92, 64, 51, 0.12)",
                backdropFilter: "blur(10px)"
            }}>
                <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Daily Earnings · {label}
                </p>
                <p style={{ margin: "6px 0 0", fontSize: "28px", fontWeight: 800, color: "var(--color-primary)", lineHeight: 1 }}>
                    ₹{payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

const DailySalesChart = ({ data }) => {
    const formattedData = data.map(item => (
        {
            date: String(item._id).slice(5).replace('-', ' '), 
            revenue: item.revenue
        }
    ));

    return (
        <div className={chartStyles.adminCard} style={{ 
            padding: "36px", 
            borderRadius: "24px", 
            background: "#FFFFFF", 
            boxShadow: "0 12px 35px rgba(92, 64, 51, 0.04)", 
            border: "1px solid rgba(200, 155, 60, 0.1)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Soft decorative background glow */}
            <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "rgba(200, 155, 60, 0.05)", filter: "blur(60px)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', position: "relative", zIndex: 1 }}>
                <div>
                    <h5 style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-primary)", margin: 0, letterSpacing: "-0.5px" }}>Revenue Overview</h5>
                    <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: "6px 0 0", fontWeight: 500 }}>Daily tracking over the last 30 days</p>
                </div>
                <div style={{ background: "rgba(107, 142, 35, 0.1)", color: "var(--color-olive)", padding: "10px 20px", borderRadius: "50px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "14px" }}>
                    <TrendingUpRoundedIcon sx={{ fontSize: 20 }} />
                    Live Metrics
                </div>
            </div>
            
            <div style={{ width: '100%', height: 380, position: "relative", zIndex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                        <defs>
                            <linearGradient id="premiumRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#c89b3c" stopOpacity={0.4} />
                                <stop offset="60%" stopColor="#c89b3c" stopOpacity={0.1} />
                                <stop offset="100%" stopColor="#c89b3c" stopOpacity={0.0} />
                            </linearGradient>
                            
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#5c4033" floodOpacity="0.15" />
                            </filter>
                        </defs>

                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(0,0,0,0.06)" />
                        
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: "#999", fontSize: 13, fontWeight: 600 }} 
                            dy={16} 
                        />
                        
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: "#999", fontSize: 13, fontWeight: 600 }} 
                            tickFormatter={(val) => `₹${val >= 1000 ? (val/1000).toFixed(1) + 'k' : val}`}
                            dx={-10}
                        />
                        
                        <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ stroke: 'rgba(200, 155, 60, 0.3)', strokeWidth: 2, strokeDasharray: '4 4' }} 
                        />
                        
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#c89b3c"
                            strokeWidth={4}
                            fill="url(#premiumRevenueGrad)"
                            activeDot={{ r: 8, strokeWidth: 4, stroke: "#FFFFFF", fill: "var(--color-primary)" }}
                            style={{ filter: "drop-shadow(0px 8px 12px rgba(200,155,60,0.15))" }}
                            animationBegin={100}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default DailySalesChart