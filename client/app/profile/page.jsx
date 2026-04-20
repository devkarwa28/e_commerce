"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmailIcon from "@mui/icons-material/Email";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export default function ProfilePage() {
  const { user, fetchUser, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  
  // Profile State
  const [uname, setUname] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    street: "",
    landmark: "",
    type: "home",
    isDefault: false,
  });
  const [addressSubmitLoading, setAddressSubmitLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUname(user.uname || "");
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === "addresses") {
      fetchAddresses();
    }
  }, [activeTab]);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/get-addresses`, {
        withCredentials: true,
      });
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error(err);
    }
    setLoadingAddresses(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-profile`,
        { uname },
        { withCredentials: true }
      );
      await fetchUser();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
    setUpdatingProfile(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setAvatarUploading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-avatar`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await fetchUser();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to upload avatar");
    }
    setAvatarUploading(false);
  };

  const resetAddressForm = () => {
    setAddressForm({
      fullName: "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      street: "",
      landmark: "",
      type: "home",
      isDefault: false,
    });
    setEditingAddressId(null);
  };

  const openAddressModal = (address = null) => {
    if (address) {
      setEditingAddressId(address._id);
      setAddressForm({
        fullName: address.fullName,
        phone: address.phone,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
        street: address.street,
        landmark: address.landmark || "",
        type: address.type || "home",
        isDefault: address.isDefault || false,
      });
    } else {
      resetAddressForm();
    }
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
    resetAddressForm();
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setAddressSubmitLoading(true);
    try {
      if (editingAddressId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-address/${editingAddressId}`,
          addressForm,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/add-address`,
          addressForm,
          { withCredentials: true }
        );
      }
      await fetchAddresses();
      closeAddressModal();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
    setAddressSubmitLoading(false);
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete-address/${id}`, {
        withCredentials: true,
      });
      await fetchAddresses();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete address");
    }
  };

  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh", background: "var(--color-bg-light)" }}>
        <CircularProgress style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <PersonIcon sx={{ fontSize: 80, color: "var(--color-border)", mb: 2 }} />
          <h2 className="fw-bold" style={{ color: "var(--color-primary)" }}>Please Login</h2>
          <p className="text-muted">You need to be logged in to view your profile.</p>
        </motion.div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", minHeight: "100vh", padding: "40px 0 80px 0" }}>
      <div className="container">
        
        {/* Profile Header (Glassmorphism & Premium Design) */}
        <div className="row mb-4">
          <div className="col-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 p-md-5 rounded-4 position-relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--color-primary) 0%, #30221A 100%)",
                color: "white",
                boxShadow: "0 12px 35px rgba(92, 64, 51, 0.25)"
              }}
            >
              {/* Refined Decorative elements */}
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200, 155, 60, 0.15) 0%, rgba(255,255,255,0) 70%)" }}></div>
              <div style={{ position: "absolute", bottom: "-50px", left: "20%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255,255,255,0) 70%)" }}></div>

              <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-4 position-relative z-index-1">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} style={{position: "relative"}}>
                  <div 
                    style={{
                      width: "120px", 
                      height: "120px", 
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      border: "3px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      position: "relative"
                    }}
                  >
                    {avatarUploading ? (
                       <CircularProgress size={30} style={{ color: "var(--color-gold)" }} />
                    ) : user.avatar ? (
                      <img src={user.avatar} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <PersonIcon style={{ fontSize: "60px", color: "white" }} />
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      background: "var(--color-gold)",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    }}
                    onMouseOver={(e) => {e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.background = "#dfb455";}}
                    onMouseOut={(e) => {e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "var(--color-gold)";}}
                  >
                    <PhotoCameraIcon style={{ color: "var(--color-primary)", fontSize: "18px" }} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: "none" }} 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </motion.div>
                <div>
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                    <h2 className="mb-0 fw-bold" style={{ letterSpacing: "-0.5px" }}>{user.uname || "User"}</h2>
                    <VerifiedUserOutlinedIcon style={{ color: "var(--color-gold)", fontSize: "24px" }} />
                  </div>
                  <p className="mb-0 d-flex align-items-center justify-content-center justify-content-md-start gap-2 mt-2" style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px" }}>
                    <EmailIcon fontSize="small" style={{ color: "var(--color-gold)" }}/> {user.email}
                  </p>
                  <div className="mt-3 d-inline-block px-3 py-1 rounded-pill" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                    Nutrivia Member
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-lg-3 mb-4 mb-lg-0">
            <div className="card border-0 rounded-4 overflow-hidden position-sticky" style={{ top: "100px", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <div className="card-body p-3 d-flex flex-row flex-lg-column gap-2 overflow-auto" style={{ scrollbarWidth: "none" }}>
                <button
                  className={`flex-fill text-center text-lg-start px-3 px-lg-4 py-3 border-0 rounded-3 ${activeTab === "profile" ? "fw-bold" : ""}`}
                  style={{
                    background: activeTab === "profile" ? "rgba(92, 64, 51, 0.06)" : "transparent",
                    color: activeTab === "profile" ? "var(--color-primary)" : "#8d7a70",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    minWidth: "120px",
                    position: "relative"
                  }}
                  onClick={() => setActiveTab("profile")}
                >
                  {activeTab === "profile" && <motion.div layoutId="activeTabIndicator" style={{ position: "absolute", left: 0, top: "10%", bottom: "10%", width: "4px", background: "var(--color-primary)", borderRadius: "0 4px 4px 0" }} className="d-none d-lg-block" />}
                  <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 gap-lg-3">
                    <PersonIcon fontSize="small" style={{ color: activeTab === "profile" ? "var(--color-primary)" : "inherit" }} />
                    <span className="d-none d-sm-inline d-lg-inline">Personal Info</span>
                    <span className="d-inline d-sm-none" style={{fontSize: "13px", fontWeight: 600}}>Profile</span>
                  </div>
                </button>
                <button
                  className={`flex-fill text-center text-lg-start px-3 px-lg-4 py-3 border-0 rounded-3 ${activeTab === "addresses" ? "fw-bold" : ""}`}
                  style={{
                    background: activeTab === "addresses" ? "rgba(92, 64, 51, 0.06)" : "transparent",
                    color: activeTab === "addresses" ? "var(--color-primary)" : "#8d7a70",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    minWidth: "120px",
                    position: "relative"
                  }}
                  onClick={() => setActiveTab("addresses")}
                >
                  {activeTab === "addresses" && <motion.div layoutId="activeTabIndicator" style={{ position: "absolute", left: 0, top: "10%", bottom: "10%", width: "4px", background: "var(--color-primary)", borderRadius: "0 4px 4px 0" }} className="d-none d-lg-block" />}
                  <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 gap-lg-3">
                    <LocationOnIcon fontSize="small" style={{ color: activeTab === "addresses" ? "var(--color-primary)" : "inherit" }}/>
                    <span className="d-none d-sm-inline d-lg-inline">Addresses</span>
                    <span className="d-inline d-sm-none" style={{fontSize: "13px", fontWeight: 600}}>Addresses</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              >
                {activeTab === "profile" && (
                  <div className="card border-0 rounded-4 p-4 p-md-5" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
                    <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                      <PersonIcon style={{ color: "var(--color-gold)", fontSize: "28px" }} />
                      <h4 className="fw-bold m-0" style={{ color: "var(--color-primary)", letterSpacing: "-0.5px" }}>Personal Information</h4>
                    </div>
                    <form onSubmit={handleProfileUpdate}>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="form-label mb-2 fw-medium" style={{ color: "#8d7a70", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Full Name</label>
                          <input
                            required
                            type="text"
                            className="form-control px-4 py-3"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            style={{
                              borderRadius: "12px",
                              border: "1.5px solid rgba(0,0,0,0.08)",
                              boxShadow: "none",
                              fontSize: "15px",
                              backgroundColor: "#FAFAF9",
                              transition: "all 0.3s"
                            }}
                            onFocus={(e) => { e.target.style.borderColor = "var(--color-gold)"; e.target.style.backgroundColor = "#fff"; }}
                            onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.08)"; e.target.style.backgroundColor = "#FAFAF9"; }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label mb-2 fw-medium" style={{ color: "#8d7a70", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email Address</label>
                          <input
                            type="email"
                            className="form-control px-4 py-3"
                            value={user.email}
                            disabled
                            style={{
                              borderRadius: "12px",
                              border: "1.5px solid rgba(0,0,0,0.04)",
                              boxShadow: "none",
                              fontSize: "15px",
                              backgroundColor: "#F5F5F5",
                              color: "#888"
                            }}
                          />
                          <small className="text-muted mt-2 d-inline-flex gap-1 align-items-center" style={{ fontSize: "12px" }}>
                            <VerifiedUserOutlinedIcon sx={{ fontSize: 14, color: "var(--color-success)" }} /> Email verified and secured.
                          </small>
                        </div>
                        <div className="col-12 mt-5 pt-4 border-top text-end">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="btn text-white px-5 py-3 fw-bold"
                            style={{ 
                              background: "linear-gradient(135deg, var(--color-primary), #7a5c4e)",
                              borderRadius: "12px",
                              boxShadow: "0 8px 20px rgba(92, 64, 51, 0.2)",
                              letterSpacing: "0.5px"
                            }}
                            disabled={updatingProfile}
                          >
                            {updatingProfile ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "addresses" && (
                  <div>
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3 bg-white p-4 rounded-4" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
                      <div className="d-flex align-items-center gap-3">
                        <LocationOnIcon style={{ color: "var(--color-gold)", fontSize: "28px" }} />
                        <h4 className="fw-bold m-0" style={{ color: "var(--color-primary)", letterSpacing: "-0.5px" }}>Saved Addresses</h4>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn text-white px-4 py-2 d-flex align-items-center justify-content-center gap-2 fw-medium"
                        style={{ 
                          background: "var(--color-primary)",
                          borderRadius: "10px",
                          boxShadow: "0 4px 12px rgba(92, 64, 51, 0.2)"
                        }}
                        onClick={() => openAddressModal()}
                      >
                        <AddIcon fontSize="small"/> <span>Add New Address</span>
                      </motion.button>
                    </div>

                    {loadingAddresses ? (
                       <div className="text-center py-5">
                         <CircularProgress style={{ color: "var(--color-primary)" }} />
                       </div>
                    ) : addresses.length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card border-0 rounded-4 p-5 text-center" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
                        <div style={{ width: "80px", height: "80px", background: "rgba(200, 155, 60, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", margin: "0 auto 20px" }}>
                          <LocationOnIcon style={{ fontSize: "40px", color: "var(--color-gold)" }} />
                        </div>
                        <h5 className="fw-bold" style={{ color: "var(--color-primary)" }}>No addresses saved yet</h5>
                        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "400px" }}>Add your home or work address for a faster, smoother checkout experience on your next purchase.</p>
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="btn px-4 py-2 mx-auto fw-bold"
                          style={{ 
                            border: "1.5px solid var(--color-primary)",
                            color: "var(--color-primary)",
                            borderRadius: "10px",
                            backgroundColor: "transparent"
                          }}
                          onClick={() => openAddressModal()}
                        >
                          Add Your First Address
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div className="row g-4" variants={containerVariants} initial="hidden" animate="show">
                        {addresses.map((address) => (
                          <motion.div variants={itemVariants} key={address._id} className="col-md-6">
                            <div className="card border-0 rounded-4 h-100 position-relative pb-0" style={{ 
                              boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                              border: address.isDefault ? "1.5px solid var(--color-primary)" : "1.5px solid transparent",
                              overflow: "hidden"
                            }}>
                              {address.isDefault && (
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "var(--color-primary)" }} />
                              )}
                              
                              <div className="card-body p-4 d-flex flex-column h-100">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <div style={{ 
                                      background: address.isDefault ? "rgba(92, 64, 51, 0.1)" : "rgba(0,0,0,0.04)", 
                                      padding: "10px", 
                                      borderRadius: "12px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: address.isDefault ? "var(--color-primary)" : "#666"
                                    }}>
                                      {address.type === "home" ? <HomeOutlinedIcon /> : <BusinessOutlinedIcon />}
                                    </div>
                                    <h6 className="fw-bold mb-0 text-capitalize" style={{ color: "var(--color-primary)", fontSize: "16px" }}>{address.type}</h6>
                                  </div>
                                  {address.isDefault && (
                                    <div className="d-flex align-items-center gap-1" style={{ color: "var(--color-primary)", fontSize: "12px", fontWeight: "700", background: "rgba(92, 64, 51, 0.08)", padding: "4px 10px", borderRadius: "20px" }}>
                                      <CheckCircleRoundedIcon sx={{ fontSize: 14 }} /> Default
                                    </div>
                                  )}
                                </div>
                                <h5 className="fw-bold mb-1" style={{ color: "#1E1B18" }}>{address.fullName}</h5>
                                <p className="mb-2 fw-medium" style={{ fontSize: "14px", color: "var(--color-primary)" }}>
                                  {address.phone}
                                </p>
                                <p className="text-muted mb-4" style={{ fontSize: "14.5px", lineHeight: "1.6", flex: 1 }}>
                                  {address.street}
                                  {address.landmark && <><br/><span style={{ fontSize: "13px", opacity: 0.8 }}>Landmark: {address.landmark}</span></>}
                                  <br />
                                  {address.city}, {address.state} - <span className="fw-bold" style={{ color: "#1E1B18" }}>{address.pincode}</span>
                                </p>
                                
                                <div className="d-flex gap-2 pt-3 border-top mt-auto mx-n2">
                                  <motion.button whileHover={{ backgroundColor: "rgba(92, 64, 51, 0.05)" }} className="btn flex-fill py-2 d-flex justify-content-center align-items-center gap-1 rounded-3" style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "14px" }} onClick={() => openAddressModal(address)}>
                                    <EditIcon style={{ fontSize: "16px" }}/> Edit
                                  </motion.button>
                                  <motion.button whileHover={{ backgroundColor: "rgba(229, 57, 53, 0.05)" }} className="btn flex-fill py-2 d-flex justify-content-center align-items-center gap-1 rounded-3" style={{ color: "#E53935", fontWeight: 600, fontSize: "14px" }} onClick={() => handleDeleteAddress(address._id)}>
                                    <DeleteOutlineIcon style={{ fontSize: "16px" }}/> Delete
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Address Modal Overlay */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(30, 27, 24, 0.8)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px"
            }}
            onClick={closeAddressModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="card border-0 rounded-4 w-100"
              style={{ maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.3)", position: "relative" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Add a premium top bar to modal */}
              <div style={{ height: "6px", width: "100%", background: "linear-gradient(90deg, var(--color-gold), var(--color-primary))" }} />
              
              <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 position-relative d-flex justify-content-between align-items-center">
                <h4 className="fw-bold m-0 d-flex align-items-center gap-2" style={{ color: "var(--color-primary)", letterSpacing: "-0.5px" }}>
                  <LocationOnIcon style={{ color: "var(--color-gold)" }}/> {editingAddressId ? "Edit Address" : "Add New Address"}
                </h4>
                <button 
                  onClick={closeAddressModal}
                  className="btn d-flex align-items-center justify-content-center p-2 rounded-circle"
                  style={{ background: "rgba(0,0,0,0.05)", border: "none", transition: "all 0.2s" }}
                  onMouseOver={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "rotate(90deg)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "rotate(0deg)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="card-body p-4 pt-3">
                <form onSubmit={handleAddressSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>Full Name *</label>
                      <input required type="text" className="form-control px-3 py-2" value={addressForm.fullName} onChange={e => setAddressForm({...addressForm, fullName: e.target.value})} style={{ borderRadius: "10px", fontSize: "15px", border: "1.5px solid rgba(0,0,0,0.08)", background: "#FAFAF9" }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>Phone Number *</label>
                      <input required type="text" pattern="[0-9]{10}" title="10 digit phone number" className="form-control px-3 py-2" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} style={{ borderRadius: "10px", fontSize: "15px", border: "1.5px solid rgba(0,0,0,0.08)", background: "#FAFAF9" }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>Pincode *</label>
                      <input required type="text" pattern="[0-9]{6}" title="6 digit pincode" className="form-control px-3 py-2" value={addressForm.pincode} onChange={e => setAddressForm({...addressForm, pincode: e.target.value})} style={{ borderRadius: "10px", fontSize: "15px", border: "1.5px solid rgba(0,0,0,0.08)", background: "#FAFAF9" }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>City *</label>
                      <input required type="text" className="form-control px-3 py-2" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} style={{ borderRadius: "10px", fontSize: "15px", border: "1.5px solid rgba(0,0,0,0.08)", background: "#FAFAF9" }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>State *</label>
                      <input required type="text" className="form-control px-3 py-2" value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} style={{ borderRadius: "10px", fontSize: "15px", border: "1.5px solid rgba(0,0,0,0.08)", background: "#FAFAF9" }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>Landmark <span style={{ textTransform: "none", fontWeight: 400 }}>(Optional)</span></label>
                      <input type="text" className="form-control px-3 py-2" value={addressForm.landmark} onChange={e => setAddressForm({...addressForm, landmark: e.target.value})} style={{ borderRadius: "10px", fontSize: "15px", border: "1.5px solid rgba(0,0,0,0.08)", background: "#FAFAF9" }} />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted mb-1 fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>Street / Area *</label>
                      <textarea required className="form-control px-3 py-2" rows="2" value={addressForm.street} onChange={e => setAddressForm({...addressForm, street: e.target.value})} style={{ borderRadius: "10px", fontSize: "15px", border: "1.5px solid rgba(0,0,0,0.08)", background: "#FAFAF9", resize: "none" }}></textarea>
                    </div>
                    
                    <div className="col-12 mt-3 pt-3 border-top d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                      <div>
                        <label className="form-label text-muted mb-2 d-block fw-bold" style={{ fontSize: "12px", textTransform: "uppercase" }}>Save As</label>
                        <div className="d-flex gap-2">
                          <button 
                            type="button"
                            className={`btn d-flex align-items-center gap-1 ${addressForm.type === 'home' ? 'bg-light' : ''}`}
                            style={{ 
                              padding: "6px 16px", 
                              borderRadius: "20px", 
                              border: addressForm.type === 'home' ? "1.5px solid var(--color-primary)" : "1.5px solid rgba(0,0,0,0.1)",
                              color: addressForm.type === 'home' ? "var(--color-primary)" : "#666",
                              fontSize: "14px",
                              fontWeight: 600
                            }}
                            onClick={() => setAddressForm({...addressForm, type: 'home'})}
                          >
                            <HomeOutlinedIcon sx={{ fontSize: 18 }}/> Home
                          </button>
                          <button 
                            type="button"
                            className={`btn d-flex align-items-center gap-1 ${addressForm.type === 'work' ? 'bg-light' : ''}`}
                            style={{ 
                              padding: "6px 16px", 
                              borderRadius: "20px", 
                              border: addressForm.type === 'work' ? "1.5px solid var(--color-primary)" : "1.5px solid rgba(0,0,0,0.1)",
                              color: addressForm.type === 'work' ? "var(--color-primary)" : "#666",
                              fontSize: "14px",
                              fontWeight: 600
                            }}
                            onClick={() => setAddressForm({...addressForm, type: 'work'})}
                          >
                            <BusinessOutlinedIcon sx={{ fontSize: 18 }}/> Work
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-check form-switch d-flex align-items-center mb-0 mt-md-4 pe-md-2">
                        <input className="form-check-input" type="checkbox" id="isDefaultCheck" checked={addressForm.isDefault} onChange={e => setAddressForm({...addressForm, isDefault: e.target.checked})} style={{ cursor: "pointer", width: "40px", height: "20px", marginTop: 0 }}/>
                        <label className="form-check-label ms-2 fw-medium" htmlFor="isDefaultCheck" style={{ cursor: "pointer", color: "#1E1B18", fontSize: "14px" }}>Set as Default</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-top d-flex gap-3">
                    <button type="button" className="btn flex-fill py-2 rounded-3 fw-bold" style={{ backgroundColor: "rgba(0,0,0,0.04)", color: "#1E1B18" }} onClick={closeAddressModal}>Cancel</button>
                    <motion.button whileTap={{ scale: 0.98 }} type="submit" className="btn text-white flex-fill py-2 rounded-3 fw-bold" style={{ background: "var(--color-primary)", boxShadow: "0 4px 12px rgba(92, 64, 51, 0.25)" }} disabled={addressSubmitLoading}>
                      {addressSubmitLoading ? <CircularProgress size={24} style={{ color: 'white' }} /> : (editingAddressId ? "Update Address" : "Save Address")}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}