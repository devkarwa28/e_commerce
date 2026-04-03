"use client";

import { useState } from "react";
import CheckoutStyles from "./checkout.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const AddressForm = ({ addressData, setAddressData }) => {
  const [errors, setErrors] = useState({});
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) error = "Phone number must be exactly 10 digits.";
    } else if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) error = "Pincode must be exactly 6 digits.";
    } else if (name === "fullname") {
      if (value.trim().length < 3) error = "Name must be at least 3 characters.";
    } else if (name === "address") {
      if (value.trim().length < 10) error = "Please provide a more detailed address.";
    }
    return error;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));

    if (name === "pincode" && value.length === 6) {
      setPincodeLoading(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();
        
        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setAddressData(prev => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State
          }));
          setErrors(prev => ({ ...prev, pincode: "" }));
        } else {
          setErrors(prev => ({ ...prev, pincode: "Invalid Pincode. Please check again." }));
        }
      } catch (err) {
        console.error("Pincode API Error:", err);
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  return (
    <div className={CheckoutStyles.formContainer}>
      <h3 className={CheckoutStyles.sectionTitle}>
        <HomeOutlinedIcon sx={{ fontSize: 26 }} />
        Shipping Address
      </h3>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Full Name</label>
            <input 
              type="text" 
              name="fullname"
              className={`${CheckoutStyles.customInput} ${errors.fullname ? CheckoutStyles.inputError : ""}`} 
              placeholder="Enter your full name" 
              value={addressData.fullname}
              onChange={handleChange}
              required
            />
            {errors.fullname && <span className={CheckoutStyles.errorText}>{errors.fullname}</span>}
          </div>
        </div>

        <div className="col-md-6">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              className={`${CheckoutStyles.customInput} ${errors.phone ? CheckoutStyles.inputError : ""}`} 
              placeholder="Enter mobile number" 
              value={addressData.phone}
              onChange={handleChange}
              required
              maxLength={10}
            />
            {errors.phone && <span className={CheckoutStyles.errorText}>{errors.phone}</span>}
          </div>
        </div>

        <div className="col-12">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Street Address</label>
            <input 
              type="text" 
              name="address"
              className={`${CheckoutStyles.customInput} ${errors.address ? CheckoutStyles.inputError : ""}`} 
              placeholder="House no., building, street, area" 
              value={addressData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className={CheckoutStyles.errorText}>{errors.address}</span>}
          </div>
        </div>

        <div className="col-md-4">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>City</label>
            <input 
              type="text" 
              name="city"
              className={CheckoutStyles.customInput} 
              placeholder="Enter city" 
              value={addressData.city}
              onChange={handleChange}
              required
              readOnly={pincodeLoading}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>State</label>
            <input 
              type="text" 
              name="state"
              className={CheckoutStyles.customInput} 
              placeholder="Enter state" 
              value={addressData.state}
              onChange={handleChange}
              required
              readOnly={pincodeLoading}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Pincode</label>
            <div className={CheckoutStyles.inputWithLoader}>
              <input 
                type="text" 
                name="pincode"
                className={`${CheckoutStyles.customInput} ${errors.pincode ? CheckoutStyles.inputError : ""}`} 
                placeholder="6-digit pincode" 
                value={addressData.pincode}
                onChange={handleChange}
                required
                maxLength={6}
              />
              {pincodeLoading && <div className={CheckoutStyles.loaderSmall}></div>}
            </div>
            {errors.pincode && <span className={CheckoutStyles.errorText}>{errors.pincode}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;