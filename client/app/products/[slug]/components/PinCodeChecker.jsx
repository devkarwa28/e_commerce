"use client";
import { useState } from "react";
import productStyles from './productDetail.module.css';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const PinCodeChecker = () => {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState(null); // 'checking', 'available', 'unavailable', 'error'
  const [message, setMessage] = useState("");

  const handleCheck = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setStatus("error");
      setMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    setStatus("checking");
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === "Success") {
        setStatus("available");
        const district = data[0].PostOffice[0].District;
        const state = data[0].PostOffice[0].State;
        setMessage(`Great! Delivery available to ${district}, ${state}`);
      } else {
        setStatus("unavailable");
        setMessage("Sorry, delivery is not available for this pincode.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Service temporarily unavailable. Please try again later.");
    }
  };

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
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            if (status) setStatus(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
        />
        <button
          className={`${productStyles.pincodeBtn} ${status === 'checking' ? productStyles.pincodeBtnLoading : ''}`}
          onClick={handleCheck}
          disabled={status === 'checking'}
        >
          {status === 'checking' ? "Checking..." : "Verify"}
        </button>
      </div>

      {status && status !== 'checking' && (
        <div className={`${productStyles.pincodeStatus} ${productStyles[status]}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PinCodeChecker;