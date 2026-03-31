"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { Check, ShoppingBag, Receipt, ArrowForward } from "@mui/icons-material";
import successStyles from "./orderSucess.module.css";

const OrderSuccessPage = () => {
    const router = useRouter();
    const { id: orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) return;
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}`, {
                    withCredentials: true
                });
                setOrder(res.data.order);
            } catch (error) {
                console.error("Failed to fetch order details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className={successStyles.successContainer}>
            <motion.div 
                className={successStyles.successCard}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            >
                {/* Animated Success Icon with Confetti Particles */}
                <div style={{ position: "relative", marginBottom: "2rem" }}>
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{ 
                                scale: [0, 1, 0], 
                                x: Math.cos(i * 45 * Math.PI / 180) * 80, 
                                y: Math.sin(i * 45 * Math.PI / 180) * 80 
                            }}
                            transition={{ 
                                delay: 0.6, 
                                duration: 1, 
                                ease: "easeOut"
                            }}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: i % 2 === 0 ? "#5c4033" : "#d7ccc8",
                                marginLeft: "-4px",
                                marginTop: "-4px",
                                zIndex: 0
                            }}
                        />
                    ))}
                    
                    <motion.div 
                        className={successStyles.iconCircle}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.3 }}
                        >
                            <Check sx={{ fontSize: 56, color: "white" }} />
                        </motion.div>
                    </motion.div>
                </div>

                <motion.h2 className={successStyles.title} variants={itemVariants}>
                    Payment Confirmed
                </motion.h2>

                <motion.p className={successStyles.description} variants={itemVariants}>
                    Thank you for your order! We've received your payment and are now processing your order for shipping.
                </motion.p>

                {loading ? (
                    <CircularProgress size={24} sx={{ color: "#5c4033", mb: 4 }} />
                ) : (
                    <motion.div className={successStyles.idBadge} variants={itemVariants}>
                        <span className={successStyles.idLabel}>Order Ref:</span>
                        <span className={successStyles.idValue}>{orderId}</span>
                    </motion.div>
                )}

                <motion.div className={successStyles.actions} variants={itemVariants}>
                    <Button 
                        className={successStyles.primaryBtn} 
                        onClick={() => router.push("/orders")}
                        startIcon={<Receipt />}
                    >
                        Track Order
                    </Button>
                    <Button 
                        variant="outlined" 
                        className={successStyles.secondaryBtn} 
                        onClick={() => router.push("/products")}
                        endIcon={<ArrowForward />}
                    >
                        Keep Shopping
                    </Button>
                </motion.div>

                {/* Celebration confetti or micro-particles could go here */}
            </motion.div>
        </section>
    );
};

export default OrderSuccessPage;