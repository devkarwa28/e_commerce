"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "@/components/products/ProductCard";
import styles from "./wishlist.module.css";
import { FavoriteBorder, ArrowBack, ShoppingBagOutlined, LoginOutlined } from "@mui/icons-material";
import { Container, Typography, Box, Button, Breadcrumbs } from "@mui/material";

const WishlistPage = () => {
    const { wishlist } = useWishlist();
    const { user } = useAuth();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (!user) {
        return (
            <div className={styles.wishlistContainer}>
                <div className={styles.emptyState}>
                    <div className={styles.emptyIconWrapper}>
                        <LoginOutlined style={{ fontSize: 80 }} />
                    </div>
                    <h2 className={styles.emptyTitle}>Please log in</h2>
                    <p className={styles.emptyText}>
                        Log in to view and manage your curated wishlist of favorite products.
                    </p>
                    <Link href="/login" className={styles.shopNowBtn}>
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Container maxWidth="lg" className={styles.wishlistContainer}>
            {/* Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link href="/" style={{ textDecoration: "none", color: "#6C6C6C", fontSize: "0.9rem" }}>
                        Home
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: "0.9rem" }}>Wishlist</Typography>
                </Breadcrumbs>
            </Box>

            {/* Header Section */}
            <div className={styles.headerSection}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.pageTitle}>My Wishlist</h1>
                    <div className={styles.titleUnderline}></div>
                </div>
                {wishlist?.length > 0 && (
                    <Typography variant="body2" sx={{ color: "#6C6C6C", fontWeight: 500 }}>
                        {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} saved
                    </Typography>
                )}
            </div>

            <AnimatePresence mode="wait">
                {wishlist && wishlist.length > 0 ? (
                    <motion.div
                        className={styles.wishlistGrid}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {wishlist.map((product) => (
                            <motion.div key={product._id} variants={itemVariants} layout>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        className={styles.emptyState}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.emptyIconWrapper}>
                            <FavoriteBorder style={{ fontSize: 80 }} />
                        </div>
                        <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
                        <p className={styles.emptyText}>
                            Explore our beautiful collection and save your favorites here. They'll be waiting for you when you're ready to make them yours.
                        </p>
                        <Link href="/products" className={styles.shopNowBtn}>
                            <ShoppingBagOutlined sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }} />
                            Browse Products
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Quick Navigation Footer */}
            {wishlist?.length > 0 && (
                <Box sx={{ mt: 10, textAlign: "center", py: 6, borderTop: "1px solid #E0E0E0" }}>
                    <Typography variant="h6" sx={{ color: "#5C4033", mb: 2, fontWeight: 600 }}>
                        Done with your wishlist?
                    </Typography>
                    <Link href="/products" style={{ textDecoration: "none" }}>
                        <Button 
                            variant="outlined" 
                            startIcon={<ArrowBack />}
                            sx={{ 
                                borderColor: "#5C4033", 
                                color: "#5C4033",
                                "&:hover": { borderColor: "#C89B3C", background: "transparent", color: "#C89B3C" }
                            }}
                        >
                            Continue Shopping
                        </Button>
                    </Link>
                </Box>
            )}
        </Container>
    );
};

export default WishlistPage;
