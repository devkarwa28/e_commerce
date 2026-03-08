"use client";

import axios from "axios";
import { useState } from "react";
import couponStyle from './cart.module.css'
import { Button, TextField } from "@mui/material";

const CouponBox = ({cartTotal,setDiscount}) => {

    const [code,setCode] = useState("");
    const [loading,setLoading] = useState(false)

    const applyCoupon =  async () =>{
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:5000/api/coupons/apply",{code},{withCredentials:true});
            setDiscount(res.data.discount);
            alert("Coupon Applied")
        }
        catch(err){
            alert("Invalid Coupon")
            console.log(err.response.data)
        }
        setLoading(false);
    }
  return (
    <div className={`${couponStyle.couponBox} my-3 `}>
        <h6 className="mb-2">Apply Coupon</h6>
        <div className="d-flex gap-2">
            <TextField size="small" fullWidth placeholder="Enter Coupon Code" value={code} onChange={(e)=>setCode(e.target.value)} />
            <Button variant="contained" onClick={applyCoupon}>
                Apply
            </Button>
        </div>
    </div>
  )
}

export default CouponBox