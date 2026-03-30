"use client";

import CheckoutStyles from "./checkout.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const AddressForm = () => {
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
            <input type="text" className={CheckoutStyles.customInput} placeholder="Enter your full name" />
          </div>
        </div>

        <div className="col-md-6">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Phone Number</label>
            <input type="tel" className={CheckoutStyles.customInput} placeholder="Enter mobile number" />
          </div>
        </div>

        <div className="col-12">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Street Address</label>
            <input type="text" className={CheckoutStyles.customInput} placeholder="House no., building, street, area" />
          </div>
        </div>

        <div className="col-md-4">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>City</label>
            <input type="text" className={CheckoutStyles.customInput} placeholder="Enter city" />
          </div>
        </div>

        <div className="col-md-4">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>State</label>
            <input type="text" className={CheckoutStyles.customInput} placeholder="Enter state" />
          </div>
        </div>

        <div className="col-md-4">
          <div className={CheckoutStyles.inputGroup}>
            <label className={CheckoutStyles.inputLabel}>Pincode</label>
            <input type="text" className={CheckoutStyles.customInput} placeholder="6-digit pincode" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressForm;