"use client";

import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import CouponBox from "@/components/cart/CouponBox";
import NoItemsInCart from "@/components/cart/NoItemsInCart";
import axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cart,setCart] = useState(null);
  const fetchCart = async () =>{
    try{
      const res = await axios.get("http://localhost:5000/api/cart");
      setCart(res.data);
    }
    catch(err){
      console.log("Cannot Fetch The Cart",err);
    }
  }
  
  useEffect(()=>{
    fetchCart();
  },[]);

  if(!cart)
  {
    return <NoItemsInCart/>
  }
  return (
    <section className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="row">
        <div className="col-lg-8">
          {
            cart.items.length === 0 ? (
              <p>Your Cart Is Empty</p>
            ) : (
              cart.items.map(item=>(
                <CartItems key={item._id}  item={item} refreshCart={fetchCart} />
              ))
            )
          }
        </div>
        <div className="col-lg-4">
          <CartSummary cart={cart}/>
        </div>
      </div>
    </section>
  )
}

export default Cart