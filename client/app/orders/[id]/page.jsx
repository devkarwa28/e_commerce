"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import orderDetailStyles from './orderDetail.module.css'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState(null)

    const fetchOrder = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}`, { withCredentials: true });
            setOrder(res.data.order);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    if (!order) {
        return (
            <div className={orderDetailStyles.loaderContainer}>
                <div className={orderDetailStyles.loaderSpinner}></div>
                <p>Loading your order details...</p>
            </div>
        )
    }

    const isDelivered = order.orderStatus.toLowerCase().includes('deliv');

    return (
        <section className={orderDetailStyles.pageWrapper}>
            <div className="container py-5">
                
                <div className={orderDetailStyles.pageHeader}>
                    <button className={orderDetailStyles.backBtn} onClick={()=> router.push('/orders')}>
                        <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
                        Back to Orders
                    </button>
                    <h2 className={orderDetailStyles.pageTitle}>Order Documentation</h2>
                </div>

                <div className={orderDetailStyles.statusCard}>
                    <div className={orderDetailStyles.statusLeft}>
                        <div className={orderDetailStyles.statusIconWrap}>
                            <ReceiptLongOutlinedIcon sx={{ color: "var(--color-gold)", fontSize: 28 }} />
                        </div>
                        <div>
                            <h4 className={orderDetailStyles.orderIdMain}>Order #{order._id.slice(-6).toUpperCase()}</h4>
                            <p className={orderDetailStyles.orderDateMain}>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className={`${orderDetailStyles.statusBadge} ${isDelivered ? orderDetailStyles.badgeSuccess : orderDetailStyles.badgePending}`}>
                        {isDelivered ? <CheckCircleOutlineIcon sx={{fontSize: 20}} /> : <PendingOutlinedIcon sx={{fontSize: 20}} />}
                        <span>{order.orderStatus}</span>
                    </div>
                </div>

                <div className="row g-4 mt-1">
                    <div className="col-lg-8">
                        <div className={orderDetailStyles.cardBlock}>
                            <h5 className={orderDetailStyles.cardTitle}>Items Ordered</h5>
                            <div className={orderDetailStyles.itemsList}>
                                {order.items.map(item => (
                                    <div key={item._id} className={orderDetailStyles.itemRow}>
                                        <div className={orderDetailStyles.itemImageWrap}>
                                            <img src={item.mainImage} className={orderDetailStyles.itemImage} alt={item.pname} />
                                        </div>
                                        <div className={orderDetailStyles.itemInfo}>
                                            <h6 className={orderDetailStyles.itemName}>{item.pname}</h6>
                                            <span className={orderDetailStyles.itemWeight}>{item.weightLabel}</span>
                                        </div>
                                        <div className={orderDetailStyles.itemQtyPrice}>
                                            <span className={orderDetailStyles.itemQty}>Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        
                        <div className={orderDetailStyles.cardBlock}>
                            <h5 className={orderDetailStyles.cardTitle}>
                                <LocalShippingOutlinedIcon sx={{ fontSize: 22, marginRight: 1, color: "var(--color-gold)" }} />
                                Shipping & Payment
                            </h5>
                            
                            <div className={orderDetailStyles.infoGroup}>
                                <p className={orderDetailStyles.infoLabel}>Delivery Address</p>
                                <p className={orderDetailStyles.infoText}>
                                    {order.shippingAddress.address}<br/>
                                    {order.shippingAddress.city}, {order.shippingAddress.pincode}
                                </p>
                            </div>
                            
                            <div className={orderDetailStyles.infoGroup}>
                                <p className={orderDetailStyles.infoLabel}>Payment Method</p>
                                <div className={orderDetailStyles.paymentMethodBox}>
                                    <PaymentOutlinedIcon sx={{ fontSize: 20 }} />
                                    <span>{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</span>
                                </div>
                            </div>
                        </div>

                        <div className={orderDetailStyles.summaryCard}>
                            <h5 className={orderDetailStyles.cardTitle}>Order Summary</h5>
                            
                            <div className={orderDetailStyles.summaryRow}>
                                <span className={orderDetailStyles.summaryLabel}>Subtotal</span>
                                <span className={orderDetailStyles.summaryValue}>₹{order.totalAmount.toLocaleString()}</span>
                            </div>

                            {order.discountAmount > 0 && (
                                <div className={`${orderDetailStyles.summaryRow} ${orderDetailStyles.discountRow}`}>
                                    <span className={orderDetailStyles.summaryLabel}>Discount</span>
                                    <span className={orderDetailStyles.discountValue}>-₹{order.discountAmount.toLocaleString()}</span>
                                </div>
                            )}

                            <div className={orderDetailStyles.summaryRow}>
                                <span className={orderDetailStyles.summaryLabel}>Shipping</span>
                                <span className={orderDetailStyles.summaryValueFree}>Free</span>
                            </div>

                            <hr className={orderDetailStyles.summaryDivider} />

                            <div className={orderDetailStyles.summaryRowTotal}>
                                <span className={orderDetailStyles.totalLabel}>Total</span>
                                <span className={orderDetailStyles.totalValue}>₹{order.finalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default OrderDetailsPage;