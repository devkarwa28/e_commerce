"use client";

import { useState, useEffect } from "react";
import CheckoutStyles from "./checkout.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AddressForm = ({ addressData, setAddressData }) => {
  const [errors, setErrors] = useState({});
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const { user } = useAuth();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchAddresses = async () => {
        setFetchingAddresses(true);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/get-addresses`,
            {
              withCredentials: true,
            },
          );
          const fetchedAddresses = res.data.addresses || [];
          setSavedAddresses(fetchedAddresses);

          if (fetchedAddresses.length > 0) {
            const defaultAddress =
              fetchedAddresses.find((a) => a.isDefault) || fetchedAddresses[0];
            handleSelectAddress(defaultAddress);
          }
        } catch (err) {
          console.error("Failed to fetch addresses", err);
        }
        setFetchingAddresses(false);
      };
      fetchAddresses();
    }
  }, [user]);

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr._id);
    setAddressData({
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street + (addr.landmark ? `, ${addr.landmark}` : ""),
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    });
    setErrors({});
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "phone") {
      if (!/^\d{10}$/.test(value))
        error = "Phone number must be exactly 10 digits.";
    } else if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) error = "Pincode must be exactly 6 digits.";
    } else if (name === "fullName") {
      if (value.trim().length < 3)
        error = "Name must be at least 3 characters.";
    } else if (name === "street") {
      if (value.trim().length < 5)
        error = "Please provide a more detailed address.";
    }
    return error;
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (selectedAddressId) {
      setSelectedAddressId(null);
    }

    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "pincode" && value.length === 6) {
      setPincodeLoading(true);
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
        );
        const data = await response.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setAddressData((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
          setErrors((prev) => ({ ...prev, pincode: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            pincode: "Invalid Pincode. Please check again.",
          }));
        }
      } catch (err) {
        console.error("Pincode API Error:", err);
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  return (
    <div
      className={CheckoutStyles.formContainer}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Decorative gradient blob background for premium feel */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,155,60,0.06) 0%, rgba(255,255,255,0) 70%)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "-50px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(92,64,51,0.04) 0%, rgba(255,255,255,0) 70%)",
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          className={CheckoutStyles.sectionTitle}
          style={{
            borderBottom: "none",
            marginBottom: "30px",
            fontWeight: "800",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "45px",
              height: "45px",
              borderRadius: "12px",
              background: "rgba(92, 64, 51, 0.08)",
              marginRight: "8px",
            }}
          >
            <HomeOutlinedIcon
              style={{ fontSize: "24px", color: "var(--color-primary)" }}
            />
          </div>
          Shipping Address
        </h3>

        {/* Saved Addresses Selector */}
        {fetchingAddresses ? (
          <div className="d-flex justify-content-center py-4 mb-4">
            <CircularProgress
              size={30}
              style={{ color: "var(--color-primary)" }}
            />
          </div>
        ) : savedAddresses.length > 0 ? (
          <div className="mb-4">
            <h6
              className="fw-semibold text-muted mb-3"
              style={{
                fontSize: "14px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Select Saved Address
            </h6>
            <div className="row g-3">
              {savedAddresses.map((addr) => (
                <div
                  key={addr._id}
                  className="col-md-6"
                  onClick={() => handleSelectAddress(addr)}
                  style={{ cursor: "pointer" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      border:
                        selectedAddressId === addr._id
                          ? "2px solid var(--color-primary)"
                          : "1px solid var(--color-border)",
                      borderRadius: "14px",
                      padding: "18px",
                      background:
                        selectedAddressId === addr._id
                          ? "rgba(92, 64, 51, 0.03)"
                          : "#fff",
                      position: "relative",
                      transition: "all 0.2s",
                      boxShadow:
                        selectedAddressId === addr._id
                          ? "0 8px 20px rgba(92, 64, 51, 0.08)"
                          : "none",
                      height: "100%",
                    }}
                  >
                    {selectedAddressId === addr._id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircleIcon
                          style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            color: "var(--color-primary)",
                          }}
                        />
                      </motion.div>
                    )}
                    <div className="d-flex align-items-center gap-2 mb-2">
                      {addr.type === "home" ? (
                        <HomeIcon
                          fontSize="small"
                          style={{ color: "var(--color-primary)" }}
                        />
                      ) : (
                        <BusinessIcon
                          fontSize="small"
                          style={{ color: "var(--color-primary)" }}
                        />
                      )}
                      <span
                        className="fw-bold"
                        style={{
                          color: "var(--color-primary)",
                          textTransform: "capitalize",
                          fontSize: "14px",
                        }}
                      >
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span
                          className="badge"
                          style={{
                            background: "var(--color-gold)",
                            fontSize: "10px",
                            marginLeft: "auto",
                            marginRight:
                              selectedAddressId === addr._id ? "25px" : "0",
                          }}
                        >
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <p className="mb-1 fw-bold text-dark">
                      {addr.fullName}{" "}
                      <span className="text-muted fw-normal">
                        ({addr.phone})
                      </span>
                    </p>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: "13px", lineHeight: "1.5" }}
                    >
                      {addr.street}
                      {addr.landmark && `, ${addr.landmark}`}
                      <br />
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="d-flex align-items-center my-4">
              <span
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--color-border)",
                }}
              ></span>
              <span
                className="px-3 text-muted fw-medium"
                style={{
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Or enter new address
              </span>
              <span
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--color-border)",
                }}
              ></span>
            </div>
          </div>
        ) : null}

        {/* Address Form Inputs */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className={CheckoutStyles.inputGroup}>
              <label className={CheckoutStyles.inputLabel}>Full Name</label>
              <div style={{ position: "relative" }}>
                <PersonOutlineIcon
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-secondary)",
                    fontSize: "20px",
                  }}
                />
                <input
                  type="text"
                  name="fullName"
                  className={`${CheckoutStyles.customInput} ${errors.fullName ? CheckoutStyles.inputError : ""}`}
                  style={{ paddingLeft: "42px", fontWeight: "500" }}
                  placeholder="Enter your full name"
                  value={addressData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <AnimatePresence>
                {errors.fullName && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={CheckoutStyles.errorText}
                  >
                    {errors.fullName}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="col-md-6">
            <div className={CheckoutStyles.inputGroup}>
              <label className={CheckoutStyles.inputLabel}>Phone Number</label>
              <div style={{ position: "relative" }}>
                <PhoneOutlinedIcon
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-secondary)",
                    fontSize: "20px",
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  className={`${CheckoutStyles.customInput} ${errors.phone ? CheckoutStyles.inputError : ""}`}
                  style={{
                    paddingLeft: "42px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                  }}
                  placeholder="Enter mobile number"
                  value={addressData.phone}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                />
              </div>
              <AnimatePresence>
                {errors.phone && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={CheckoutStyles.errorText}
                  >
                    {errors.phone}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="col-md-5">
            <div className={CheckoutStyles.inputGroup}>
              <label className={CheckoutStyles.inputLabel}>Pincode</label>
              <div style={{ position: "relative" }}>
                <LocationOnOutlinedIcon
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-secondary)",
                    fontSize: "20px",
                  }}
                />
                <input
                  type="text"
                  name="pincode"
                  className={`${CheckoutStyles.customInput} ${errors.pincode ? CheckoutStyles.inputError : ""}`}
                  style={{
                    paddingLeft: "42px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }}
                  placeholder="6-digit pincode"
                  value={addressData.pincode}
                  onChange={handleInputChange}
                  required
                  maxLength={6}
                />
                {pincodeLoading && (
                  <div
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <CircularProgress
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                )}
              </div>
              <AnimatePresence>
                {errors.pincode && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={CheckoutStyles.errorText}
                  >
                    {errors.pincode}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="col-md-3">
            <div className={CheckoutStyles.inputGroup}>
              <label className={CheckoutStyles.inputLabel}>City</label>
              <input
                type="text"
                name="city"
                className={CheckoutStyles.customInput}
                style={{
                  fontWeight: "500",
                  background: addressData.city ? "#f0f0f0" : "#FAFAFA",
                  borderColor: "rgba(0,0,0,0.05)",
                }}
                placeholder="City"
                value={addressData.city}
                onChange={handleInputChange}
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
                style={{
                  fontWeight: "500",
                  background: addressData.state ? "#f0f0f0" : "#FAFAFA",
                  borderColor: "rgba(0,0,0,0.05)",
                }}
                placeholder="State"
                value={addressData.state}
                onChange={handleInputChange}
                required
                readOnly={pincodeLoading}
              />
            </div>
          </div>

          <div className="col-12">
            <div className={CheckoutStyles.inputGroup}>
              <label className={CheckoutStyles.inputLabel}>
                Street Address / Area
              </label>
              <div style={{ position: "relative" }}>
                <MapOutlinedIcon
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "14px",
                    color: "var(--color-text-secondary)",
                    fontSize: "20px",
                  }}
                />
                <textarea
                  name="street"
                  className={`${CheckoutStyles.customInput} ${errors.street ? CheckoutStyles.inputError : ""}`}
                  style={{
                    paddingLeft: "42px",
                    fontWeight: "500",
                    paddingTop: "14px",
                    minHeight: "100px",
                    resize: "none",
                  }}
                  placeholder="House no., building, street, landmark, area"
                  value={addressData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <AnimatePresence>
                {errors.street && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={CheckoutStyles.errorText}
                  >
                    {errors.street}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
