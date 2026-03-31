"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    SearchRounded,
    AddRounded,
    DeleteOutlineRounded,
    ConfirmationNumberRounded,
    TimerOutlined,
    CheckCircleRounded,
    CancelRounded,
    RefreshRounded
} from "@mui/icons-material";
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
    Tooltip,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Switch,
    InputAdornment
} from "@mui/material";
import styles from "./coupons.module.css";

const CouponsAdminPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: 0,
        maxDiscount: "",
        usageLimit: 0,
        expiresAt: ""
    });

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/admin`, { withCredentials: true });
            if (res.data.success) {
                setCoupons(res.data.coupons);
            }
        } catch (err) {
            console.error("Error fetching coupons:", err);
        }
        setLoading(false);
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/admin/${id}`, {}, { withCredentials: true });
            setCoupons(prev => prev.map(c => c._id === id ? { ...c, isActive: !c.isActive } : c));
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this coupon?")) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/admin/${id}`, { withCredentials: true });
            setCoupons(prev => prev.filter(c => c._id !== id));
        } catch (err) {
            console.error("Error deleting coupon:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons`, formData, { withCredentials: true });
            if (res.data.success) {
                setCoupons([res.data.coupon, ...coupons]);
                setOpenModal(false);
                setFormData({
                    code: "",
                    discountType: "percentage",
                    discountValue: "",
                    minOrderAmount: 0,
                    maxDiscount: "",
                    usageLimit: 0,
                    expiresAt: ""
                });
            }
        } catch (err) {
            console.error("Error creating coupon:", err);
            alert(err.response?.data?.message || "Failed to create coupon");
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const filteredCoupons = coupons.filter(c => {
        const matchesSearch = c.code.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "" ? true : (statusFilter === "active" ? c.isActive : !c.isActive);
        return matchesSearch && matchesStatus;
    });

    return (
        <section className={styles.adminContainer}>
            <div className={styles.headerContainer}>
                <div>
                    <h2 className={styles.pageTitle}>Coupons Management</h2>
                    <p className={styles.pageSubtitle}>Create and manage promotional discounts</p>
                </div>
                <div className={styles.headerActions}>
                    <Tooltip title="Refresh data">
                        <IconButton onClick={fetchCoupons} className={styles.refreshButton}>
                            <RefreshRounded />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="contained"
                        startIcon={<AddRounded />}
                        onClick={() => setOpenModal(true)}
                        className={styles.createButton}
                    >
                        Create Coupon
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-4 mb-5">
                <div className="col-lg-4">
                    <div className={styles.statCard}>
                        <div className={styles.statIconBox} style={{ background: "rgba(200, 155, 60, 0.1)", color: "#c89b3c" }}>
                            <ConfirmationNumberRounded />
                        </div>
                        <div>
                            <p className={styles.statLabel}>Total Coupons</p>
                            <h3 className={styles.statValue}>{coupons.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className={styles.statCard}>
                        <div className={styles.statIconBox} style={{ background: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}>
                            <CheckCircleRounded />
                        </div>
                        <div>
                            <p className={styles.statLabel}>Active Coupons</p>
                            <h3 className={styles.statValue}>{coupons.filter(c => c.isActive).length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className={styles.statCard}>
                        <div className={styles.statIconBox} style={{ background: "rgba(244, 67, 54, 0.1)", color: "#F44336" }}>
                            <TimerOutlined />
                        </div>
                        <div>
                            <p className={styles.statLabel}>Expired</p>
                            <h3 className={styles.statValue}>{coupons.filter(c => c.expiresAt && new Date(c.expiresAt) < new Date()).length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mainTableContainer}>
                <div className={styles.filterBar}>
                    <div className={styles.searchBox}>
                        <SearchRounded sx={{ color: "#AAA", fontSize: 22 }} />
                        <input
                            type="text"
                            placeholder="Find coupon code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <FormControl size="small" sx={{ width: "180px" }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={styles.statusSelect}
                        >
                            <MenuItem value="">All Statuses</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {loading ? (
                    <div className="d-flex justify-content-center py-5">
                        <CircularProgress sx={{ color: "#c89b3c" }} />
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className={`table table-hover ${styles.couponTable}`}>
                            <thead>
                                <tr>
                                    <th>Coupon Code</th>
                                    <th>Type</th>
                                    <th>Value</th>
                                    <th>Min. Order</th>
                                    <th>Usage</th>
                                    <th>Expiry</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoupons.map((coupon) => (
                                    <tr key={coupon._id} className={styles.couponTableRow}>
                                        <td className="py-4 px-3">
                                            <div className={styles.couponCodeBadge}>
                                                {coupon.code}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.typeBadge} ${coupon.discountType === 'percentage' ? styles.typeBadgePercentage : styles.typeBadgeFixed}`}>
                                                {coupon.discountType}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.discountValue}>
                                                {coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.minOrderValue}>₹{coupon.minOrderAmount}</span>
                                        </td>
                                        <td>
                                            <div className={styles.usageText}>
                                                {coupon.usedCount} / <span className={styles.usageMax}>{coupon.usageLimit > 0 ? coupon.usageLimit : "∞"}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.expiryText}>
                                                {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : "Never"}
                                            </span>
                                        </td>
                                        <td>
                                            <Switch
                                                checked={coupon.isActive}
                                                onChange={() => handleToggleStatus(coupon._id)}
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': { color: "#c89b3c" },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: "#c89b3c" }
                                                }}
                                            />
                                        </td>
                                        <td className="text-end">
                                            <Tooltip title="Delete Coupon">
                                                <IconButton onClick={() => handleDelete(coupon._id)} sx={{ color: "#F44336" }}>
                                                    <DeleteOutlineRounded />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredCoupons.length === 0 && (
                            <div className={styles.emptyState}>
                                <ConfirmationNumberRounded sx={{ fontSize: 60, opacity: 0.1, mb: 2 }} />
                                <p>No coupons found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                PaperProps={{
                    sx: { borderRadius: "24px", width: "500px", maxWidth: "90%" }
                }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 800, color: "#5c4033", pt: 4, px: 4 }}>Create New Coupon</DialogTitle>
                    <DialogContent sx={{ px: 4, pb: 2 }}>
                        <div className="row g-3 pt-2">
                            <div className="col-12">
                                <TextField
                                    fullWidth
                                    label="Coupon Code"
                                    placeholder="e.g. LUXURY20"
                                    required
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div className="col-6">
                                <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={formData.discountType}
                                        label="Type"
                                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                    >
                                        <MenuItem value="percentage">Percentage (%)</MenuItem>
                                        <MenuItem value="fixed">Fixed (₹)</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-6">
                                <TextField
                                    fullWidth
                                    label="Value"
                                    type="number"
                                    required
                                    value={formData.discountValue}
                                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{formData.discountType === 'percentage' ? '%' : '₹'}</InputAdornment>,
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    fullWidth
                                    label="Min Order Amount"
                                    type="number"
                                    value={formData.minOrderAmount}
                                    onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    fullWidth
                                    label="Usage Limit"
                                    type="number"
                                    placeholder="0 for ♾️"
                                    value={formData.usageLimit}
                                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                />
                            </div>
                            <div className="col-12">
                                <TextField
                                    fullWidth
                                    label="Expiry Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.expiresAt}
                                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ p: 4, pt: 2 }}>
                        <Button onClick={() => setOpenModal(false)} sx={{ color: "#888", fontWeight: 700, textTransform: "none" }}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                background: "#18110D",
                                color: "#FFF",
                                borderRadius: "10px",
                                px: 4,
                                fontWeight: 700,
                                textTransform: "none",
                                '&:hover': { background: "#c89b3c" }
                            }}
                        >
                            Save Coupon
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </section>
    );
};

export default CouponsAdminPage;