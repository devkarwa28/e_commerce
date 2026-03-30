"use client";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import orderStatusStyles from './admin.module.css';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: "16px",
                padding: "16px 20px",
                boxShadow: "0 12px 35px rgba(92, 64, 51, 0.08)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "12px"
            }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: payload[0].payload.fill }} />
                <div>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
                        {payload[0].name}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: 800, color: "var(--color-text-primary, #333)", lineHeight: 1 }}>
                        {payload[0].value} <span style={{fontSize: "13px", color: "#999", fontWeight: 600}}>Orders</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload }) => {
    return (
        <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0 0", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: "#555" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: entry.color }} />
                    {entry.value}
                </li>
            ))}
        </ul>
    );
};

const OrderStatusChart = ({ data }) => {

    const STATUS_COLORS = {
        "Pending": "#c89b3c",    
        "Processing": "#8B6508", 
        "Shipped": "#5c4033",    
        "Delivered": "#6b8e23",  
        "Cancelled": "#D32F2F"   
    };
    
    const DEFAULT_COLORS = ["#c89b3c", "#6b8e23", "#5c4033", "#E6C27A", "#8FBC8F"];

    const formattedData = data.map((item, index) => {
        const statusName = String(item._id).charAt(0).toUpperCase() + String(item._id).slice(1).toLowerCase();
        return {
            name: statusName || "Unknown",
            value: item.count,
            fill: STATUS_COLORS[statusName] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
        };
    });

    return (
        <div className={orderStatusStyles.adminCard} style={{ 
            padding: "36px", 
            borderRadius: "24px", 
            background: "#FFFFFF", 
            boxShadow: "0 12px 35px rgba(92, 64, 51, 0.04)", 
            border: "1px solid rgba(107, 142, 35, 0.1)",
            position: "relative",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 250, height: 250, background: "rgba(107, 142, 35, 0.04)", filter: "blur(60px)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', position: "relative", zIndex: 1 }}>
                <div>
                    <h5 style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-primary, #5c4033)", margin: 0, letterSpacing: "-0.5px" }}>Order Status</h5>
                    <p style={{ fontSize: "14px", color: "var(--color-text-secondary, #666)", margin: "6px 0 0", fontWeight: 500 }}>Current distribution of orders</p>
                </div>
                <div style={{ background: "rgba(200, 155, 60, 0.1)", color: "var(--color-gold, #c89b3c)", padding: "10px 16px", borderRadius: "50px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "14px" }}>
                    <PieChartRoundedIcon sx={{ fontSize: 20 }} />
                </div>
            </div>

            <div style={{ flexGrow: 1, width: '100%', minHeight: 320, position: "relative", zIndex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <defs>
                            <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.08" />
                            </filter>
                        </defs>
                        <Pie 
                            data={formattedData} 
                            cx="50%"
                            cy="45%"
                            innerRadius={75}
                            outerRadius={115}
                            paddingAngle={6}
                            dataKey="value"
                            stroke="none"
                            style={{ filter: "url(#pieShadow)" }}
                            animationDuration={1500}
                            animationEasing='ease-out'
                        >
                            {
                                formattedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))
                            }
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default OrderStatusChart