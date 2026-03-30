"use client";

import OrderCard from "@/components/orders/OrderCard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const {user} = useAuth();
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchOrders = async () =>{
    try{
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/myorders`,{withCredentials:true});
      setOrders(res.data.orders)
    }
    catch(err){
      console.log(err)
    }
    setLoading(false);
  }

  useEffect(()=>{
    if(user){
      fetchOrders();
    }
  },[user])

  if(loading)
  {
    return (
      <div className="container py-5 text-center">
        Loading Your Orders........
      </div>
    )
  }

  if(!user){
    return(
      <div className="container py-5">
        Please Login to see your orders
      </div>
    )
  }

  return (
    <section className="container py-3">
        <h2 className="fw-bold text-center mb-4">My Orders</h2>

        {
          orders.length === 0 ?  (
            <div className="text-center py-5">
              <h5>No Orders Yet</h5>
              <p className="text-muted">Looks Like you Haven't palced a order yet </p>
            </div>
          ) : (
            orders.map(order => (
              <OrderCard key={order._id} order={order}/>
            ))
          )
        }
    </section>
  )
}

export default OrdersPage