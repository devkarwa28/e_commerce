"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";


const OrderSummary = () => {
    const {cart} = useCart();
    const router = useRouter();

    const placeOrder = async () =>{
        
        const res = await axios.post("http://localhost:5000/api/order",{shippingAddress:{address:"Test Address",city:"Jodhpur",pincode:"342001"},paymentMethod:"COD"},{withCredentials:true});

            const oderId = res.data.order._id
            router.push(`/order-success/${oderId}`)
    };
    if(!cart) return null;
  return (
    <div className="summary-card">
        <h5 className="mb-3">Order Summary</h5>

        <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>₹{cart.totalAmount}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
        </div>

        <div className="d-flex justify-content-between fw-bold mb-3">
            <span>Total</span>
            <span>₹{cart.totalAmount}</span>
        </div>

        <Button fullWidth variant="contained" onClick={placeOrder} style={{background:"#5c4033", "&:hover":{background:"#4a3328"}}} >
            Place Order
        </Button>



    </div>
  )
}

export default OrderSummary