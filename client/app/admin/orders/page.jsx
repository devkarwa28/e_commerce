"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import OrderTable from "@/components/admin/OrderTable";
import OrderDetailsModal from "@/components/admin/OrderDetailsModal";
import { 
    SearchRounded, 
    FilterListRounded, 
    TrendingUpRounded, 
    LocalMallRounded, 
    HourglassEmptyRounded, 
    CheckCircleRounded,
    RefreshRounded
} from "@mui/icons-material";
import { MenuItem, Select, FormControl, InputLabel, Pagination, CircularProgress, Tooltip, IconButton } from "@mui/material";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        processing: 0,
        delivered: 0,
        shipped: 0
    });

    const fetchOrders = async () => {
        setLoading(true);
        try {
            console.log("Fetching orders from URL:", `${process.env.NEXT_PUBLIC_API_URL}/api/order/admin`);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/admin`, {
                params: {
                    page,
                    limit: 10,
                    search,
                    status: statusFilter,
                    paymentStatus: paymentFilter
                },
                withCredentials: true
            });
            console.log("Fetch Success. Orders:", res.data.orders?.length);
            setOrders(res.data.orders);
            setTotalPages(res.data.totalPages);
            setTotalOrders(res.data.totalOrders);
            
            if (res.data.totalOrders > 0) {
                 setStats({
                    total: res.data.totalOrders,
                    processing: res.data.orders.filter(o => o.orderStatus === "Processing").length,
                    delivered: res.data.orders.filter(o => o.orderStatus === "Delivered").length,
                    shipped: res.data.orders.filter(o => o.orderStatus === "Shipped").length
                });
            }
        } catch (err) {
            console.error("Error Details:", err.response?.data || err.message);
        }
        setLoading(false);
    };

    const updateOrderStatus = async (orderId, updateData) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/order/admin/${orderId}`, updateData, { withCredentials: true });
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, ...updateData } : o));
            setSelectedOrder(null);
            fetchOrders(); 
        } catch (err) {
            console.error("Error updating order:", err);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchOrders();
        }, 500); 
        return () => clearTimeout(timeoutId);
    }, [search, statusFilter, paymentFilter, page]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    return (
        <section className="container-fluid" style={{ padding: "40px 32px" }}>
            
            {/* Header Area */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
                <div>
                    <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#5c4033", margin: "0 0 8px 0", letterSpacing: "-1.5px" }}>Orders Management</h2>
                    <p style={{ fontSize: "16px", color: "#666", margin: 0, fontWeight: 500 }}>Track every single transaction and fulfillment status</p>
                </div>
                <Tooltip title="Refresh data">
                    <IconButton onClick={fetchOrders} sx={{ background: "#FAFAFA", border: "1px solid #EEE" }}>
                        <RefreshRounded />
                    </IconButton>
                </Tooltip>
            </div>

            {/* Stats Row */}
            <div className="row g-4 mb-5">
                <div className="col-lg-3">
                    <div style={{ ...miniStatCard, background: "linear-gradient(135deg, #18110D 0%, #30241C 100%)", color: "#FFF" }}>
                        <div style={statIconBox}><LocalMallRounded sx={{ fontSize: 22 }} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: "12px", opacity: 0.7, fontWeight: 700, textTransform: "uppercase" }}>Total Orders</p>
                            <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800 }}>{totalOrders}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div style={miniStatCard}>
                        <div style={{ ...statIconBox, background: "rgba(200, 155, 60, 0.1)", color: "#c89b3c" }}><HourglassEmptyRounded sx={{ fontSize: 22 }} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: "12px", color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Pending/Processing</p>
                            <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#c89b3c" }}>{stats.processing}+</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div style={miniStatCard}>
                        <div style={{ ...statIconBox, background: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}><CheckCircleRounded sx={{ fontSize: 22 }} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: "12px", color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Delivered</p>
                            <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#4CAF50" }}>{stats.delivered}+</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div style={miniStatCard}>
                        <div style={{ ...statIconBox, background: "rgba(92, 64, 51, 0.1)", color: "#5c4033" }}><TrendingUpRounded sx={{ fontSize: 22 }} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: "12px", color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Revenue (Current)</p>
                            <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#5c4033" }}>₹{orders.reduce((acc, curr) => acc + curr.finalAmount, 0).toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{
                background: "#FFFFFF",
                borderRadius: "32px",
                padding: "36px",
                boxShadow: "0 20px 60px rgba(92, 64, 51, 0.05)",
                border: "1px solid rgba(0,0,0,0.03)"
            }}>
                {/* Filters & Search */}
                <div style={{ marginBottom: "32px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                    <div style={searchBoxStyle}>
                        <SearchRounded sx={{ color: "#AAA", fontSize: 22 }} />
                        <input 
                            type="text" 
                            placeholder="Search by ID, Name or Email..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={searchInputStyle}
                        />
                    </div>
                    
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#888", marginRight: "8px" }}>
                            <FilterListRounded sx={{ fontSize: 20 }} />
                            <span style={{ fontSize: "14px", fontWeight: 700 }}>Filter By:</span>
                        </div>
                        
                        <FormControl size="small" sx={{ width: "160px" }}>
                            <InputLabel sx={{ fontWeight: 600, fontSize: "13px" }}>Order Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Order Status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                                sx={filterSelectStyle}
                            >
                                <MenuItem value="">All Statuses</MenuItem>
                                <MenuItem value="Processing">Processing</MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ width: "160px" }}>
                            <InputLabel sx={{ fontWeight: 600, fontSize: "13px" }}>Payment Status</InputLabel>
                            <Select
                                value={paymentFilter}
                                label="Payment Status"
                                onChange={(e) => setPaymentFilter(e.target.value)}
                                sx={filterSelectStyle}
                            >
                                <MenuItem value="">All Payments</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Failed">Failed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/* Table Logic */}
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
                        <CircularProgress sx={{ color: "#c89b3c" }} />
                    </div>
                ) : (
                    <>
                        <OrderTable orders={orders} onViewDetails={handleViewDetails} />
                        
                        {/* Pagination Area */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", borderTop: "1px solid #F5F5F5", paddingTop: "24px" }}>
                            <span style={{ fontSize: "14px", color: "#888", fontWeight: 600 }}>
                                Showing {orders.length} of {totalOrders} orders
                            </span>
                            <Pagination 
                                count={totalPages} 
                                page={page} 
                                onChange={(e, v) => setPage(v)}
                                sx={{
                                    '& .MuiPaginationItem-root': { fontWeight: 700, borderRadius: "10px" },
                                    '& .Mui-selected': { background: "var(--color-gold, #c89b3c) !important", color: "#FFF" }
                                }}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            <OrderDetailsModal 
                order={selectedOrder} 
                onClose={() => setSelectedOrder(null)} 
                onUpdateStatus={updateOrderStatus}
            />

            <style jsx>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </section>
    );
};

// Internal Styles
const miniStatCard = {
    background: "#FFF",
    padding: "24px",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.02)",
    height: "100%"
};

const statIconBox = {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
};

const searchBoxStyle = {
    display: "flex",
    alignItems: "center",
    background: "#FAFAFA",
    borderRadius: "16px",
    padding: "12px 20px",
    gap: "12px",
    width: "400px",
    border: "1px solid rgba(0,0,0,0.04)",
    transition: "all 300ms ease"
};

const searchInputStyle = {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "15px",
    color: "#333",
    width: "100%",
    fontWeight: 600
};

const filterSelectStyle = {
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "13px",
    background: "#FAFAFA",
    '& .MuiOutlinedInput-notchedOutline': { borderColor: "rgba(0,0,0,0.04)" },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: "rgba(200, 155, 60, 0.2)" }
};

export default AdminOrdersPage;
