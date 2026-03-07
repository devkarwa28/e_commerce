"use client";

import { Button } from "@mui/material";
import Link from "next/link";

const CartSummary = ({cart}) => {
  return (
    <div className="border-2 p-4 rounded-2">
        <h5>Order Summary</h5>
        <p>
            Sub Total
            <span className="float-end">{cart.totalAmount}</span>
        </p>

        <p>
            Shipping
            <span className="float-end">Free</span>
        </p>
        <h5>Total
            <span className="float-end">{cart.totalAmount}</span>
        </h5>
        <Link href="/checkout">
        <Button fullWidth sx={{mt:3,backgroundColor:"#5c4033",color:"white"}}>
            Proceed To Checkout
        </Button>
        </Link>
    </div>
  )
}

export default CartSummary