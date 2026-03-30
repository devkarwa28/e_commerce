"use client"
import { useRouter } from "next/navigation"
import orderCardStyles from './orders.module.css'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

const OrderCard = ({order}) => {
    const router = useRouter();

    const getStatusIcon = (status) => {
        if(status.toLowerCase().includes('deliv')) return <CheckCircleOutlineIcon sx={{fontSize: 18}} />;
        return <PendingOutlinedIcon sx={{fontSize: 18}} />;
    }

  return (
    <div className={orderCardStyles.orderCard}>
        <div className={orderCardStyles.orderHeader}>
            <div className="d-flex align-items-center gap-3">
                <div className={orderCardStyles.iconWrap}>
                    <ReceiptOutlinedIcon sx={{color: "var(--color-gold)"}}/>
                </div>
                <div>
                    <h6 className={orderCardStyles.orderId}>Order #{order._id.slice(-6).toUpperCase()}</h6>
                    <p className={orderCardStyles.orderDate}>{new Date(order.createdAt).toDateString()}</p>
                </div>
            </div>

            <div className={orderCardStyles.statusWrap}>
                <span className={`${orderCardStyles.orderStatus} ${order.orderStatus.toLowerCase().includes('deliv') ? orderCardStyles.statusSuccess : orderCardStyles.statusPending}`}>
                    {getStatusIcon(order.orderStatus)}
                    {order.orderStatus}
                </span>
            </div>
        </div>

        <div className={orderCardStyles.orderBody}>
            <div className="row g-3">
                {order.items.map(item => (
                    <div key={item._id} className="col-lg-3 col-md-4 col-sm-6">
                        <div className={orderCardStyles.itemCard}>
                            <img src={item.mainImage} className={orderCardStyles.orderPImg} alt={item.pname}/>
                            <div className={orderCardStyles.itemDetails}>
                                <p className={orderCardStyles.itemName}>{item.pname}</p>
                                <p className={orderCardStyles.itemMeta}>
                                    {item.weightLabel} <span className={orderCardStyles.qtyMultiplier}>x</span> {item.quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className={orderCardStyles.orderFooter}>
            <h6 className={orderCardStyles.orderTotal}>Total: <span>₹{order.finalAmount.toLocaleString()}</span></h6>
            <button className={orderCardStyles.viewDetailsBtn} onClick={()=>router.push(`/orders/${order._id}`)}>
                View Details
            </button>
        </div>
    </div>
  )
}

export default OrderCard;