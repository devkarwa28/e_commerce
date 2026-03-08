"use client";

import { TextField } from "@mui/material";

const AddressForm = () => {
  return (
    <div className="row g-3">
        <div className="col-md-6">
        <TextField label="Full Name" fullWidth/>
      </div>

      <div className="col-md-6">
        <TextField label="Phone Number" fullWidth/>
      </div>

      <div className="col-12">
        <TextField label="Address" fullWidth/>
      </div>

      <div className="col-md-4">
        <TextField label="City" fullWidth/>
      </div>

      <div className="col-md-4">
        <TextField label="State" fullWidth/>
      </div>

      <div className="col-md-4">
        <TextField label="Pincode" fullWidth/>
      </div>

    </div>
  )
}

export default AddressForm