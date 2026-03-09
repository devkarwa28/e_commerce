"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import orderDetailStyles from './orderDetail.module.css'
import { Divider } from "@mui/material";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null)

    const fetchOrder = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/order/${id}`, { withCredentials: true });
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
            <div className="container py-5 text-center">
                Loding your order.....
            </div>
        )
    }
    return (
        <section className="container py-5">
            <h2 className="fw-bold mb-3" style={{ color: "#5c4033" }}>Order Details</h2>
            <div className={`${orderDetailStyles.orderCard} mb-4`}>
                <div className="d-flex justify-content-between">
                    <div>
                        <h5>Order #{order._id.slice(-6)}</h5>
                        <p className="text-muted">{new Date(order.createdAt).toDateString()}</p>
                    </div>
                    <span className="orderStatus">{order.orderStatus}</span>
                </div>
            </div>

            <div className={`${orderDetailStyles.orderCard} mb-4`}>
                <h5 className="mb-3">Items</h5>
                <div className="row">
                    {
                        order.items.map(item => (
                            <div key={item._id} className="col-lg-3 text-center">
                                <img src={item.mainImage} className={orderDetailStyles.orderImg} />
                                <p className="fw-semibold mb-1">{item.pname}</p>
                                <p className="text-muted small">{item.weightLabel} X {item.quantity}</p>

                            </div>
                        ))
                    }

                </div>
            </div>

            <div className={`${orderDetailStyles.orderCard} mb-4`}>
                <h5 className="mb-3">Shipping Address</h5>
                <p className="mb-1">{order.shippingAddress.address}</p>
                <p className="mb-1">{order.shippingAddress.city}</p>
                <p className="mb-1">{order.shippingAddress.pincode}</p>
            </div>

            <div className={`${orderDetailStyles.orderCard} mb-4`}>
                <h5 className="mb-3">Payment Method</h5>
                <p>{order.paymentMethod}</p>
            </div>

            <Divider />

            <div className={`${orderDetailStyles.orderCard} mb-4`}>
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                    <span>SubTotal</span>
                    <span>₹{order.totalAmount}</span>
                </div>

                {
                    order.discountAmount > 0 && (
                        <div className="d-flex justify-content-between text-success mb-2">
                            <span>Discount</span>
                            <span>-₹{order.discountAmount}</span>
                        </div>
                    )
                }
                <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>₹{order.finalAmount}</span>
                </div>
            </div>
        </section>
    )
}

export default OrderDetailsPage