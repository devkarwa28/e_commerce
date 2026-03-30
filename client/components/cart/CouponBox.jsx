"use client";

import axios from "axios";
import { useState } from "react";
import CartStyles from './cart.module.css';
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const CouponBox = ({ cartTotal, setDiscount }) => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    const applyCoupon = async () => {
        if (!code.trim()) return;
        setLoading(true);
        setStatus(null);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/apply`, { code }, { withCredentials: true });
            setDiscount(res.data.discount);
            setStatus("success");
            setMessage("Coupon Applied Successfully!");
            sessionStorage.setItem('appliedCoupon', JSON.stringify({ code: code.toUpperCase(), discount: res.data.discount }));
        } catch (err) {
            setDiscount(0);
            setStatus("error");
            setMessage("Invalid or Expired Coupon");
            sessionStorage.removeItem('appliedCoupon');
        }
        setLoading(false);
    }

    return (
        <div className={CartStyles.couponWrapper}>
            <div className={CartStyles.couponHeader}>
                <LocalOfferOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Apply Promo Code</span>
            </div>
            <div className={CartStyles.couponInputWrap}>
                <input
                    type="text"
                    className={CartStyles.couponInput}
                    placeholder="Enter Coupon Code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setStatus(null);
                    }}
                />
                <button 
                    className={CartStyles.couponBtn} 
                    onClick={applyCoupon}
                    disabled={loading || !code.trim() || status === "success"}
                >
                    {loading ? "..." : status === "success" ? <CheckCircleOutlineRoundedIcon sx={{ fontSize: 18 }} /> : "Apply"}
                </button>
            </div>
            {status && (
                <div className={`${CartStyles.couponMsg} ${status === "success" ? CartStyles.msgSuccess : CartStyles.msgError}`}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default CouponBox;