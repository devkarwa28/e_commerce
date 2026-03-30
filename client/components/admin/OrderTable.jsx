"use client";

import { VisibilityRounded, ShoppingBagRounded, PersonRounded, CalendarMonthRounded, PaymentsRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const OrderTable = ({ orders, onViewDetails }) => {
    
    const getStatusColor = (status) => {
        switch (status) {
            case "Processing": return { bg: "rgba(200, 155, 60, 0.1)", color: "#c89b3c" };
            case "Shipped": return { bg: "rgba(107, 142, 35, 0.1)", color: "#6b8e23" };
            case "Delivered": return { bg: "rgba(46, 125, 50, 0.1)", color: "#2E7D32" };
            case "Cancelled": return { bg: "rgba(211, 47, 47, 0.1)", color: "#D32F2F" };
            default: return { bg: "#f5f5f5", color: "#666" };
        }
    };

    const getPaymentColor = (status) => {
        switch (status) {
            case "Paid": return { bg: "rgba(46, 125, 50, 0.1)", color: "#2E7D32" };
            case "Pending": return { bg: "rgba(200, 155, 60, 0.1)", color: "#c89b3c" };
            case "Failed": return { bg: "rgba(211, 47, 47, 0.1)", color: "#D32F2F" };
            default: return { bg: "#f5f5f5", color: "#666" };
        }
    };

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Order ID</th>
                        <th style={headerStyle}>Customer</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Date</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Amount</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Status</th>
                        <th style={{ ...headerStyle, textAlign: "center" }}>Payment</th>
                        <th style={{ ...headerStyle, textAlign: "right" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const orderStatusStyle = getStatusColor(order.orderStatus);
                        const paymentStatusStyle = getPaymentColor(order.paymentStatus);

                        return (
                            <tr key={order._id} style={{ 
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
                                {/* Order ID Column */}
                                <td style={{ padding: "16px 20px", borderRadius: "16px 0 0 16px", borderTop: "1px solid rgba(0,0,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.04)", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{ 
                                            width: "40px", 
                                            height: "40px", 
                                            borderRadius: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "rgba(92, 64, 51, 0.05)",
                                            color: "#5c4033"
                                        }}>
                                            <ShoppingBagRounded sx={{ fontSize: 20 }} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 800, fontSize: "14px", color: "#333", fontFamily: "monospace" }}>
                                                #{order._id?.toString().slice(-6).toUpperCase()}
                                            </p>
                                            <small style={{ color: "#999", fontSize: "11px", fontWeight: 600 }}>ID: {order._id}</small>
                                        </div>
                                    </div>
                                </td>

                                {/* Customer Column */}
                                <td style={cellStyle}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{ 
                                            width: "36px", 
                                            height: "36px", 
                                            borderRadius: "50%",
                                            background: "#f0f0f0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#888"
                                        }}>
                                            <PersonRounded sx={{ fontSize: 18 }} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: "#333" }}>{order.user?.uname || "Guest Customer"}</p>
                                            <p style={{ margin: 0, fontSize: "12px", color: "#888", fontWeight: 500 }}>{order.user?.email || "No email"}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Date Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#666" }}>
                                        <CalendarMonthRounded sx={{ fontSize: 16 }} />
                                        <span style={{ fontSize: "13px", fontWeight: 600 }}>
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </td>

                                {/* Amount Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", color: "#5c4033", fontWeight: 800 }}>
                                        <span>₹{order.finalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <small style={{ fontSize: "10px", color: "#999", display: "block" }}>{order.items.length} Items</small>
                                </td>

                                {/* Order Status Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <span style={{
                                        background: orderStatusStyle.bg,
                                        color: orderStatusStyle.color,
                                        padding: "6px 14px",
                                        borderRadius: "50px",
                                        fontWeight: 800,
                                        fontSize: "11px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        display: "inline-block",
                                        minWidth: "100px"
                                    }}>
                                        {order.orderStatus}
                                    </span>
                                </td>

                                {/* Payment Status Column */}
                                <td style={{ ...cellStyle, textAlign: "center" }}>
                                    <span style={{
                                        background: paymentStatusStyle.bg,
                                        color: paymentStatusStyle.color,
                                        padding: "6px 14px",
                                        borderRadius: "8px",
                                        fontWeight: 700,
                                        fontSize: "11px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px"
                                    }}>
                                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor" }} />
                                        {order.paymentStatus}
                                    </span>
                                </td>

                                {/* Actions Column */}
                                <td style={{ ...cellStyle, textAlign: "right", borderRadius: "0 16px 16px 0", borderRight: "1px solid rgba(0,0,0,0.04)" }}>
                                    <Tooltip title="View Order Details" placement="top" arrow>
                                        <IconButton 
                                            onClick={() => onViewDetails(order)}
                                            sx={{ 
                                                background: "rgba(200, 155, 60, 0.05)", 
                                                border: "1px solid rgba(200, 155, 60, 0.1)",
                                                color: "#c89b3c",
                                                "&:hover": { background: "#c89b3c", color: "#FFF", transform: "scale(1.1)" },
                                                transition: "all 200ms ease"
                                            }}
                                        >
                                            <VisibilityRounded sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
            {(!orders || orders.length === 0) && (
                <div style={{ textAlign: "center", padding: "80px 0", background: "#fdfdfd", borderRadius: "24px", border: "2px dashed #eee" }}>
                    <ShoppingBagRounded sx={{ fontSize: 48, color: "#eee", marginBottom: "16px" }} />
                    <p style={{ margin: 0, color: "#999", fontSize: "16px", fontWeight: 600 }}>No orders found!</p>
                </div>
            )}
        </div>
    );
};

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

export default OrderTable;
