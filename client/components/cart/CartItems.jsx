"use client";

import { Button } from "@mui/material";
import axios from "axios";

const CartItems = ({item}) => {
    const updateQuantity = async (qty) =>{
        await axios.put("http://localhost:5000/api/cart",{
            productId : item.product._id,
            weightLabel: item.weightLabel,
            quantity: qty
        });
        refreshCart();
    }

    const removeItem = async () =>{
        await axios.delete("http://localhost:5000/api/cart/item",{
            data:{
                productId: item.product._id,
                weightLabel: item.weightLabel
            }
        })
        refreshCart();
    }
  return (
    <div className="d-flex mb-4 border-bottom pb-3">
        <img src={item.product.mainImage} width="100" alt={item.product.pname}/>

        <div className="ms-3 flex-grow-1">
            <h6>{item.product.pname}</h6>
            <p>Weight: {item.weightLabel}</p>
            <p>₹ {item.price}</p>
            <div className="d-flex align-items-center gap-2">
                <Button onClick={()=>updateQuantity(item.quantity-1)} variant="outlined">
                    -
                </Button>
                <span>{item.quantity}</span>
                <Button onClick={()=>updateQuantity(item.quantity+1)} variant="outlined">
                    +
                </Button>
            </div>
            <Button onClick={removeItem} color="error">
                Remove
            </Button>
        </div>
    </div>
  )
}

export default CartItems