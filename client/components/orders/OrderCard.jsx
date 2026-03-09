"use client"
import { useRouter } from "next/navigation"
import orderCardStyles from './orders.module.css'
import { Button } from "@mui/material";

 


const OrderCard = ({order}) => {
    const router = useRouter();

  return (
    <div className={`${orderCardStyles.orderCard} mb-4`}>
        <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
                <h6 className="fw-bold">Order #{order._id.slice(-6)} </h6>
                <p>{new Date(order.createdAt).toDateString()}</p>
            </div>

            <div>
                <span className={orderCardStyles.orderStatus}>{order.orderStatus}</span>
            </div>
        </div>

        <div className="row">
            {
                order.items.map(item => (
                    <div key={item._id} className="col-md-3">
                        <img src={item.mainImage} className={orderCardStyles.orderPImg}/>
                        <p className="mb-1 fw-semibold">{item.pname}</p>
                        <p className="text-muted small">
                            {item.weightLabel} X {item.quantity}
                        </p>
                    </div>
                ))
            }
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
            <h6 className="fw-bold">Total ₹{order.finalAmount}</h6>
            <Button variant="outlined" onClick={()=>router.push(`/orders/${order._id}`)} >
                View Details
            </Button>
        </div>

    </div>
  )
}

export default OrderCard