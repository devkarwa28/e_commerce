"use client";

import { useCart } from "@/context/CartContext";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import NoItemsInCart from "@/components/cart/NoItemsInCart";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Cart = () => {
  const { cart, loading, fetchCart } = useCart();

  if (loading) {
    return (
      <div className="container py-5 text-center d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem", color: "var(--color-primary)" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <NoItemsInCart />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <section className="container py-5" style={{ minHeight: "80vh" }}>
      {/* Premium Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex align-items-center gap-3 mb-5 pb-3 border-bottom"
      >
        <div style={{ background: "rgba(200, 155, 60, 0.1)", padding: "12px", borderRadius: "14px", display: "flex" }}>
          <ShoppingCartOutlinedIcon style={{ fontSize: "32px", color: "var(--color-gold)" }} />
        </div>
        <div>
          <h2 className="fw-bold m-0" style={{ color: "var(--color-primary)", letterSpacing: "-0.5px" }}>Your Shopping Cart</h2>
          <p className="text-muted m-0 mt-1" style={{ fontSize: "14px", fontWeight: "500" }}>{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </motion.div>

      <div className="row g-4 g-lg-5">
        <motion.div className="col-lg-8" variants={containerVariants} initial="hidden" animate="show">
          <AnimatePresence>
            {cart.items.map((item) => (
              <CartItems 
                key={`${item.product._id}-${item.weightLabel}`} 
                item={item} 
                refreshCart={fetchCart} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        <motion.div className="col-lg-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <CartSummary cart={cart} />
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;