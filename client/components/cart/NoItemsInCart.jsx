"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBasket, ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import cartStyles from './cart.module.css';

const NoItemsInCart = () => {
  return (
    <div className={cartStyles.emptyCartContainer}>
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cartStyles.emptyCartContent}
        >
            <motion.div 
                className={cartStyles.emptyIconCircle}
                animate={{ 
                    y: [-10, 10, -10],
                }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            >
                <div className={cartStyles.iconGlow}></div>
                <ShoppingBasket sx={{ fontSize: 80, color: 'var(--color-primary)' }} />
            </motion.div>

            <motion.h2 
                className={cartStyles.emptyTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Your cart is currently empty
            </motion.h2>

            <motion.p 
                className={cartStyles.emptySubtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Looks like you haven't added anything to your cart yet. 
                Discover our premium collections and start your journey with Nutrivia.
            </motion.p>
            <div className='d-flex align-items-center justify-content-center'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
            >
                <Link href="/products" className={cartStyles.startShoppingBtn}>
                    Explore Collection
                    <ArrowForward sx={{ fontSize: 18 }} />
                </Link>
            </motion.div>
            </div>
        </motion.div>
    </div>
  )
}

export default NoItemsInCart;