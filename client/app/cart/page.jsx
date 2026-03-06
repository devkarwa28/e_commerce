"use client";

import CartItems from "@/components/cart/CartItems";
import { useState } from "react";

const Cart = () => {
  const [cart,setCart] = useState(null);
  if(!cart)
  {
    return <p>Cart Loading.......</p>
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

        </div>
      </div>
    </section>
  )
}

export default Cart