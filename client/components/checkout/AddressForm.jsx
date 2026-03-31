"use client";

import CheckoutStyles from "./checkout.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const AddressForm = ({ addressData, setAddressData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              className={CheckoutStyles.customInput} 
              placeholder="Enter your full name" 
              value={addressData.fullname}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              className={CheckoutStyles.customInput} 
              placeholder="Enter mobile number" 
              value={addressData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-12">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Street Address</label>
            <input 
              type="text" 
              name="address"
              className={CheckoutStyles.customInput} 
              placeholder="House no., building, street, area" 
              value={addressData.address}
              onChange={handleChange}
              required
            />
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
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Pincode</label>
            <input 
              type="text" 
              name="pincode"
              className={CheckoutStyles.customInput} 
              placeholder="6-digit pincode" 
              value={addressData.pincode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;