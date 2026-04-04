"use client";

import { useCart } from "@/context/CartContext";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import NoItemsInCart from "@/components/cart/NoItemsInCart";

const Cart = () => {
  const { cart, loading, fetchCart } = useCart();

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <NoItemsInCart />;
  }

  return (
    <section className="container py-5">
      <h2 className="mb-4 fw-bold" style={{ color: "#5C4033" }}>Your Cart</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.items.map((item) => (
            <CartItems 
              key={`${item.product._id}-${item.weightLabel}`} 
              item={item} 
              refreshCart={fetchCart} 
            />
          ))}
        </div>
        <div className="col-lg-4">
          <CartSummary cart={cart} />
        </div>
      </div>
    </section>
  );
};

export default Cart;