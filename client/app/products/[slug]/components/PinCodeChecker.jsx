"use client";
import { useState } from "react";
import productStyles from './productDetail.module.css';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const PinCodeChecker = () => {
    const [pincode, setPincode] = useState("");

    return (
        <div className={productStyles.pincodeBox}>
            <div className={productStyles.pincodeHeader}>
                <LocalShippingOutlinedIcon sx={{ color: "var(--color-gold)", fontSize: 22 }} />
                <span>Check Delivery Availability</span>
            </div>
            
            <div className={productStyles.pincodeInputWrap}>
                <input 
                    type="text" 
                    className={productStyles.pincodeInput} 
                    placeholder="Enter 6-digit Pincode" 
                    value={pincode} 
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                />
                <button className={productStyles.pincodeBtn}>Verify</button>
            </div>
        </div>
    )
}

export default PinCodeChecker;