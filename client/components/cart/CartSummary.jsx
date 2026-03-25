"use client";

import { Button, Divider } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import CouponBox from "./CouponBox";
import { useRouter } from "next/navigation";

const CartSummary = ({cart}) => {
    const [discount,setDiscount] = useState(0);
    const finalTotal = cart.totalAmount - discount;
    const router = useRouter();
  return (
    <div className="summary-card">
        <h5 className="mb-3">Cart Summary</h5>

        <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>₹{cart.totalAmount}</span>
        </div>
        <CouponBox cartTotal={cart.totalAmount} setDiscount={setDiscount}/>
        {
            discount > 0 && (
                <div className="d-flex justify-content-between text-success">
                    <span>Discount</span>
                    <span>-₹ {discount}</span>
                </div>
            )
        }
        <div className="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
        </div>
        <Divider className="my-2"/>
        <div className="d-flex justify-content-between fw-bold mb-3">
            <span>Total</span>
            <span>₹{finalTotal}</span>
        </div>
        <Button fullWidth variant="contained" onClick={()=>router.push('/checkout')}>
            Proceed To Checkout
        </Button>
    </div>
  )
}

export default CartSummary;