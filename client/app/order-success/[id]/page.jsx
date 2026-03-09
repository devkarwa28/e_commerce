"use client";

import { CheckCircle } from '@mui/icons-material';
import successStyles from './orderSucess.module.css'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';

const OrderSuccessPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const orderId = params.get("id");
  return (
    <section className='container py-3'>
        <div className={successStyles.successWrapper}>
            <div className={successStyles.successIcon}>
                <CheckCircle sx={{fontSize:90,color:"#5c4033"}} />
            </div>

            <h2 className='fw-bold mt-3'>Order Placed Successfully 🎉</h2>

            <p className='text-muted'>
                Thank you for shopping with us. Your order has been confirmed.
            </p>

            {
                orderId && (
                    <p className={successStyles.orderID}>
                        ORDER ID : <strong>{orderId}</strong>
                    </p>
                )
            }
            <div className='d-flex justify-content-center mt-4 gap-4'> 
                <Button variant='contained' onClick={()=>router.push("/orders")} >
                    View Orders
                </Button>

                <Button variant='outlined' onClick={()=>router.push("/products")}>
                    Countinue Shopping
                </Button>
            </div>
        </div>
    </section>
  )
}

export default OrderSuccessPage