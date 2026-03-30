"use client";

import { 
    CloseRounded, 
    LocalShippingRounded, 
    PersonRounded, 
    PaymentsRounded, 
    ReceiptRounded,
    ShoppingBagRounded,
    SaveRounded,
    EditRounded
} from "@mui/icons-material";
import { IconButton, MenuItem, Select, FormControl, InputLabel, Button, Divider } from "@mui/material";
import { useState, useEffect } from "react";

const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus || "");
    const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus || "");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (order) {
            setOrderStatus(order.orderStatus);
            setPaymentStatus(order.paymentStatus);
        }
    }, [order]);

    if (!order) return null;

    const handleUpdate = async () => {
        setUpdating(true);
        await onUpdateStatus(order._id, { orderStatus, paymentStatus });
        setUpdating(false);
    };

    return (
        <div style={modalBackdropStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={modalHeaderStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={iconBadgeStyle}>
                            <ShoppingBagRounded />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#333" }}>Order Details</h3>
                            <p style={{ margin: 0, fontSize: "12px", color: "#888", fontWeight: 600 }}>Order ID: {order._id}</p>
                        </div>
                    </div>
                    <IconButton onClick={onClose} sx={{ background: "#f5f5f5", "&:hover": { background: "#eee" } }}>
                        <CloseRounded sx={{ fontSize: 20 }} />
                    </IconButton>
                </div>

                <div style={modalBodyStyle}>
                    <div className="row g-4">
                        {/* Left Side: Items & Order Info */}
                        <div className="col-lg-7">
                            <div style={sectionStyle}>
                                <div style={sectionTitleStyle}>
                                    <ReceiptRounded sx={{ fontSize: 20 }} />
                                    <span>Ordered Items ({order.items.length})</span>
                                </div>
                                <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "8px" }}>
                                    {order.items.map((item, index) => (
                                        <div key={index} style={itemCardStyle}>
                                            <div style={itemImageWrapperStyle}>
                                                <img src={item.mainImage} alt={item.pname} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            </div>
                                            <div style={{ flexGrow: 1 }}>
                                                <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700 }}>{item.pname}</h4>
                                                <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#888", fontWeight: 600 }}>
                                                    <span>{item.weightLabel}</span>
                                                    <span>Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <p style={{ margin: 0, fontWeight: 800, color: "#5c4033", fontSize: "14px" }}>₹{(Number(item.price) * item.quantity).toLocaleString()}</p>
                                                <small style={{ fontSize: "11px", color: "#999" }}>₹{Number(item.price).toLocaleString()} / unit</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={sectionStyle}>
                                <div style={sectionTitleStyle}>
                                    <PaymentsRounded sx={{ fontSize: 20 }} />
                                    <span>Summary & Billing</span>
                                </div>
                                <div style={summaryRowStyle}>
                                    <span>Subtotal:</span>
                                    <span>₹{order.totalAmount?.toLocaleString()}</span>
                                </div>
                                {order.couponCode && (
                                    <div style={{ ...summaryRowStyle, color: "#6b8e23" }}>
                                        <span>Discount ({order.couponCode}):</span>
                                        <span>- ₹{order.discountAmount?.toLocaleString()}</span>
                                    </div>
                                )}
                                <Divider sx={{ margin: "12px 0", borderColor: "rgba(0,0,0,0.06)" }} />
                                <div style={{ ...summaryRowStyle, fontWeight: 800, fontSize: "18px", color: "#5c4033" }}>
                                    <span>Total Amount:</span>
                                    <span>₹{order.finalAmount?.toLocaleString()}</span>
                                </div>
                                <div style={{ ...summaryRowStyle, marginTop: "12px", fontSize: "12px", color: "#888" }}>
                                    <span>Payment Method:</span>
                                    <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{order.paymentMethod}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Customer info & Status Update */}
                        <div className="col-lg-5">
                            <div style={sectionStyle}>
                                <div style={sectionTitleStyle}>
                                    <PersonRounded sx={{ fontSize: 20 }} />
                                    <span>Customer Info</span>
                                </div>
                                <div style={userInfoBoxStyle}>
                                    <p style={{ margin: "0 0 4px 0", fontWeight: 800, color: "#333" }}>{order.user?.uname || "Guest Customer"}</p>
                                    <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#666" }}>{order.user?.email || "No email provided"}</p>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                        <LocalShippingRounded sx={{ fontSize: 18, color: "#c89b3c", marginTop: "2px" }} />
                                        <div>
                                            <p style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 700, color: "#333" }}>Shipping Address:</p>
                                            <p style={{ margin: 0, fontSize: "12px", color: "#888", lineHeight: "1.5", fontWeight: 500 }}>
                                                {order.shippingAddress?.fullname}<br/>
                                                {order.shippingAddress?.phone}<br/>
                                                {order.shippingAddress?.address}, {order.shippingAddress?.city}<br/>
                                                {order.shippingAddress?.state}, {order.shippingAddress?.pincode}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ ...sectionStyle, background: "#fdfdfd", border: "1px solid rgba(200, 155, 60, 0.1)" }}>
                                <div style={{ ...sectionTitleStyle, color: "#c89b3c" }}>
                                    <EditRounded sx={{ fontSize: 18 }} />
                                    <span>Update Order Status</span>
                                </div>
                                
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "8px" }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ fontWeight: 600, fontSize: "13px" }}>Order Status</InputLabel>
                                        <Select
                                            value={orderStatus}
                                            label="Order Status"
                                            onChange={(e) => setOrderStatus(e.target.value)}
                                            sx={{ borderRadius: "12px", fontWeight: 600, fontSize: "14px" }}
                                        >
                                            <MenuItem value="Processing">Processing</MenuItem>
                                            <MenuItem value="Shipped">Shipped</MenuItem>
                                            <MenuItem value="Delivered">Delivered</MenuItem>
                                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ fontWeight: 600, fontSize: "13px" }}>Payment Status</InputLabel>
                                        <Select
                                            value={paymentStatus}
                                            label="Payment Status"
                                            onChange={(e) => setPaymentStatus(e.target.value)}
                                            sx={{ borderRadius: "12px", fontWeight: 600, fontSize: "14px" }}
                                        >
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Paid">Paid</MenuItem>
                                            <MenuItem value="Failed">Failed</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Button 
                                        variant="contained" 
                                        startIcon={<SaveRounded />}
                                        onClick={handleUpdate}
                                        disabled={updating}
                                        fullWidth
                                        sx={{ 
                                            background: "var(--color-gold, #c89b3c)", 
                                            color: "#FFF", 
                                            borderRadius: "12px", 
                                            padding: "10px", 
                                            fontWeight: 700,
                                            boxShadow: "0 8px 20px rgba(200, 155, 60, 0.2)",
                                            "&:hover": { background: "#b38a34", boxShadow: "0 10px 25px rgba(200, 155, 60, 0.3)" }
                                        }}
                                    >
                                        {updating ? "Saving..." : "Update Order"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles
const modalBackdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px"
};

const modalContentStyle = {
    background: "#FFF",
    width: "100%",
    maxWidth: "1000px",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    overflow: "hidden",
    animation: "modalFadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1)"
};

const modalHeaderStyle = {
    padding: "24px 32px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fdfdfd"
};

const modalBodyStyle = {
    padding: "32px",
    maxHeight: "80vh",
    overflowY: "auto"
};

const iconBadgeStyle = {
    width: "48px",
    height: "48px",
    background: "var(--color-gold, #c89b3c)",
    color: "#FFF",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 15px rgba(200, 155, 60, 0.25)"
};

const sectionStyle = {
    background: "#FAFAFA",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "24px",
    border: "1px solid rgba(0,0,0,0.03)"
};

const sectionTitleStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    fontWeight: 800,
    color: "#5c4033",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "20px"
};

const itemCardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "#FFF",
    padding: "12px",
    borderRadius: "16px",
    marginBottom: "12px",
    border: "1px solid rgba(0,0,0,0.03)"
};

const itemImageWrapperStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    overflow: "hidden",
    flexShrink: 0
};

const summaryRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 600,
    color: "#666",
    marginBottom: "8px"
};

const userInfoBoxStyle = {
    background: "#FFF",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid rgba(0,0,0,0.03)"
};

export default OrderDetailsModal;
