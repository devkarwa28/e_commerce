"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import CircularProgress from "@mui/material/CircularProgress";

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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <CircularProgress style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <h2 className="fw-bold" style={{ color: "var(--color-primary)" }}>Please Login</h2>
        <p className="text-muted">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container">
        
        {/* Profile Header */}
        <div className="row mb-4">
          <div className="col-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-4 position-relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--color-primary) 0%, #30221A 100%)",
                color: "white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
              }}
            >
              {/* Decorative elements */}
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}></div>
              <div style={{ position: "absolute", bottom: "-20px", right: "50px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}></div>

              <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-3 gap-md-4 position-relative z-index-1">
                <div style={{position: "relative"}}>
                  <div 
                    style={{
                      width: "100px", 
                      height: "100px", 
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      border: "4px solid rgba(255,255,255,0.2)",
                      position: "relative"
                    }}
                  >
                    {avatarUploading ? (
                       <CircularProgress size={30} style={{ color: "var(--color-primary)" }} />
                    ) : user.avatar ? (
                      <img src={user.avatar} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <PersonIcon style={{ fontSize: "50px", color: "var(--color-primary)" }} />
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      background: "var(--color-gold)",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                      transition: "all 0.3s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <PhotoCameraIcon style={{ color: "white", fontSize: "16px" }} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: "none" }} 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </div>
                <div>
                  <h2 className="mb-1 fw-bold">{user.uname || "User"}</h2>
                  <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                    <EmailIcon fontSize="small"/> {user.email}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-lg-3 mb-4 mb-lg-0">
            <div className="card border-0 rounded-4 overflow-hidden" style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.06)" }}>
              <div className="card-body p-2 d-flex flex-row flex-lg-column gap-2 overflow-auto">
                <button
                  className={`flex-fill text-center text-lg-start px-3 px-lg-4 py-3 border-0 rounded-3 ${activeTab === "profile" ? "fw-bold" : ""}`}
                  style={{
                    background: activeTab === "profile" ? "rgba(200, 155, 60, 0.1)" : "transparent",
                    color: activeTab === "profile" ? "var(--color-primary)" : "var(--color-text-secondary)",
                    transition: "all 0.3s",
                    minWidth: "120px"
                  }}
                  onClick={() => setActiveTab("profile")}
                >
                  <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 gap-lg-3">
                    <PersonIcon fontSize="small" />
                    <span className="d-none d-sm-inline d-lg-inline">Personal Info</span>
                    <span className="d-inline d-sm-none" style={{fontSize: "14px"}}>Profile</span>
                  </div>
                </button>
                <button
                  className={`flex-fill text-center text-lg-start px-3 px-lg-4 py-3 border-0 rounded-3 ${activeTab === "addresses" ? "fw-bold" : ""}`}
                  style={{
                    background: activeTab === "addresses" ? "rgba(200, 155, 60, 0.1)" : "transparent",
                    color: activeTab === "addresses" ? "var(--color-primary)" : "var(--color-text-secondary)",
                    transition: "all 0.3s",
                    minWidth: "120px"
                  }}
                  onClick={() => setActiveTab("addresses")}
                >
                  <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 gap-lg-3">
                    <LocationOnIcon fontSize="small"/>
                    <span className="d-none d-sm-inline d-lg-inline">Addresses</span>
                    <span className="d-inline d-sm-none" style={{fontSize: "14px"}}>Addresses</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-9">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "profile" && (
                <div className="card border-0 rounded-4 p-4 p-md-5" style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.06)" }}>
                  <h4 className="fw-bold mb-4 text-center text-md-start" style={{ color: "var(--color-primary)" }}>Personal Information</h4>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label text-muted mb-2">Full Name</label>
                        <input
                          required
                          type="text"
                          className="form-control px-3 py-2"
                          value={uname}
                          onChange={(e) => setUname(e.target.value)}
                          style={{
                            borderRadius: "8px",
                            border: "1px solid var(--color-border)",
                            boxShadow: "none"
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted mb-2">Email Address</label>
                        <input
                          type="email"
                          className="form-control px-3 py-2 bg-light"
                          value={user.email}
                          disabled
                          style={{
                            borderRadius: "8px",
                            border: "1px solid var(--color-border)",
                            boxShadow: "none"
                          }}
                        />
                        <small className="text-muted mt-1 d-block">Email address cannot be changed.</small>
                      </div>
                      <div className="col-12 mt-4 pt-3 border-top text-end">
                        <button 
                          type="submit" 
                          className="btn text-white px-4 py-2"
                          style={{ 
                            background: "linear-gradient(135deg, var(--color-primary), #8B5E3C)",
                            borderRadius: "8px",
                            transition: "all 0.3s"
                          }}
                          disabled={updatingProfile}
                        >
                          {updatingProfile ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
                    <h4 className="fw-bold mb-0 text-center text-sm-start" style={{ color: "var(--color-primary)" }}>Saved Addresses</h4>
                    <button 
                      className="btn text-white px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                      style={{ 
                        background: "var(--color-olive)",
                        borderRadius: "8px",
                        transition: "all 0.3s"
                      }}
                      onClick={() => openAddressModal()}
                    >
                      <AddIcon fontSize="small"/> <span>Add New Address</span>
                    </button>
                  </div>

                  {loadingAddresses ? (
                     <div className="text-center py-5">
                       <CircularProgress style={{ color: "var(--color-primary)" }} />
                     </div>
                  ) : addresses.length === 0 ? (
                    <div className="card border-0 rounded-4 p-4 p-md-5 text-center" style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.06)" }}>
                      <LocationOnIcon style={{ fontSize: "60px", color: "var(--color-border)", margin: "0 auto 15px auto" }} />
                      <h5 className="fw-bold" style={{ color: "var(--color-primary)" }}>No addresses saved yet</h5>
                      <p className="text-muted mb-4">Add an address to speed up checkout and delivery.</p>
                      <button 
                        className="btn btn-outline-primary px-4 py-2 mx-auto"
                        style={{ 
                          borderColor: "var(--color-primary)",
                          color: "var(--color-primary)",
                          borderRadius: "8px"
                        }}
                        onClick={() => openAddressModal()}
                      >
                        Add Your First Address
                      </button>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {addresses.map((address) => (
                        <div key={address._id} className="col-md-6">
                          <div className="card border-0 rounded-4 h-100 position-relative" style={{ 
                            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                            borderTop: address.isDefault ? "4px solid var(--color-gold)" : "4px solid transparent",
                            transition: "all 0.3s"
                          }}>
                            {address.isDefault && (
                              <span className="badge position-absolute" style={{ 
                                top: "15px", 
                                right: "15px", 
                                background: "var(--color-gold)",
                                fontSize: "0.75rem",
                                padding: "5px 10px",
                                borderRadius: "4px"
                              }}>
                                Default
                              </span>
                            )}
                            <div className="card-body p-4 d-flex flex-column">
                              <div className="d-flex align-items-center gap-2 mb-3">
                                <div style={{ 
                                  background: "rgba(92, 64, 51, 0.1)", 
                                  padding: "8px", 
                                  borderRadius: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}>
                                  {address.type === "home" ? (
                                    <HomeIcon style={{ color: "var(--color-primary)", fontSize: "20px" }}/>
                                  ) : (
                                    <BusinessIcon style={{ color: "var(--color-primary)", fontSize: "20px" }}/>
                                  )}
                                </div>
                                <h6 className="fw-bold mb-0 text-capitalize" style={{ color: "var(--color-primary)" }}>{address.type}</h6>
                              </div>
                              <h5 className="fw-bold mb-1">{address.fullName}</h5>
                              <p className="text-muted mb-2 d-flex align-items-center gap-2" style={{ fontSize: "0.9rem" }}>
                                {address.phone}
                              </p>
                              <p className="text-muted mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
                                {address.street}
                                {address.landmark && <><br/>{address.landmark}</>}
                                <br />
                                {address.city}, {address.state} - <span className="fw-medium">{address.pincode}</span>
                              </p>
                              
                              <div className="d-flex justify-content-between pt-3 border-top mt-auto">
                                <button className="btn btn-sm btn-link p-0 text-decoration-none d-flex align-items-center gap-1" style={{ color: "var(--color-primary)", fontWeight: 600 }} onClick={() => openAddressModal(address)}>
                                  <EditIcon style={{ fontSize: "18px" }}/> Edit
                                </button>
                                <button className="btn btn-sm btn-link p-0 text-decoration-none text-danger d-flex align-items-center gap-1" style={{ fontWeight: 600 }} onClick={() => handleDeleteAddress(address._id)}>
                                  <DeleteIcon style={{ fontSize: "18px" }}/> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
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
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={closeAddressModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="card border-0 rounded-4 w-100"
              style={{ maxWidth: "650px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="card-header bg-white border-bottom-0 pt-4 pb-2 px-4 position-relative">
                <h4 className="fw-bold m-0" style={{ color: "var(--color-primary)" }}>
                  {editingAddressId ? "Edit Address" : "Add New Address"}
                </h4>
                <button 
                  onClick={closeAddressModal}
                  className="btn-close position-absolute"
                  style={{ top: "25px", right: "25px" }}
                ></button>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddressSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-medium">Full Name *</label>
                      <input required type="text" className="form-control px-3 py-2" value={addressForm.fullName} onChange={e => setAddressForm({...addressForm, fullName: e.target.value})} style={{ borderRadius: "8px" }}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-medium">Phone Number *</label>
                      <input required type="text" pattern="[0-9]{10}" title="10 digit phone number" className="form-control px-3 py-2" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} style={{ borderRadius: "8px" }}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-medium">Pincode *</label>
                      <input required type="text" pattern="[0-9]{6}" title="6 digit pincode" className="form-control px-3 py-2" value={addressForm.pincode} onChange={e => setAddressForm({...addressForm, pincode: e.target.value})} style={{ borderRadius: "8px" }}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-medium">City *</label>
                      <input required type="text" className="form-control px-3 py-2" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} style={{ borderRadius: "8px" }}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-medium">State *</label>
                      <input required type="text" className="form-control px-3 py-2" value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} style={{ borderRadius: "8px" }}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted mb-1 fw-medium">Landmark (Optional)</label>
                      <input type="text" className="form-control px-3 py-2" value={addressForm.landmark} onChange={e => setAddressForm({...addressForm, landmark: e.target.value})} style={{ borderRadius: "8px" }}/>
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted mb-1 fw-medium">Street / House No / Area *</label>
                      <textarea required className="form-control px-3 py-2" rows="3" value={addressForm.street} onChange={e => setAddressForm({...addressForm, street: e.target.value})} style={{ borderRadius: "8px", resize: "none" }}></textarea>
                    </div>
                    <div className="col-md-6 mt-4">
                      <label className="form-label text-muted mb-2 d-block fw-medium">Address Type</label>
                      <div className="btn-group w-100" role="group" style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.05)", borderRadius: "8px" }}>
                        <input type="radio" className="btn-check" id="typeHome" autoComplete="off" checked={addressForm.type === 'home'} onChange={() => setAddressForm({...addressForm, type: 'home'})} />
                        <label className="btn btn-outline-secondary" htmlFor="typeHome" style={{ padding: "10px", borderColor: "var(--color-border)" }}>Home</label>
                        <input type="radio" className="btn-check" id="typeWork" autoComplete="off" checked={addressForm.type === 'work'} onChange={() => setAddressForm({...addressForm, type: 'work'})} />
                        <label className="btn btn-outline-secondary" htmlFor="typeWork" style={{ padding: "10px", borderColor: "var(--color-border)" }}>Work</label>
                      </div>
                    </div>
                    <div className="col-md-6 mt-4 d-flex align-items-center">
                      <div className="form-check form-switch pt-md-4">
                        <input className="form-check-input" type="checkbox" id="isDefaultCheck" checked={addressForm.isDefault} onChange={e => setAddressForm({...addressForm, isDefault: e.target.checked})} style={{ cursor: "pointer", width: "40px", height: "20px" }}/>
                        <label className="form-check-label text-muted ms-2 fw-medium" htmlFor="isDefaultCheck" style={{ cursor: "pointer", paddingTop: "2px" }}>Set as Default Address</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-top d-flex flex-column flex-sm-row justify-content-end gap-3">
                    <button type="button" className="btn btn-light px-4 py-2 rounded-3 order-2 order-sm-1 fw-medium" onClick={closeAddressModal}>Cancel</button>
                    <button type="submit" className="btn text-white px-4 py-2 rounded-3 order-1 order-sm-2 fw-medium" style={{ background: "var(--color-primary)", boxShadow: "0 4px 10px rgba(92, 64, 51, 0.3)" }} disabled={addressSubmitLoading}>
                      {addressSubmitLoading ? <CircularProgress size={24} style={{ color: 'white' }} /> : (editingAddressId ? "Update Address" : "Save Address")}
                    </button>
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