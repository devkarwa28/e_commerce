"use client";

import { Button } from "@mui/material";
import axios from "axios";
import CartStyles from "./cart.module.css"
import { Delete } from "@mui/icons-material";

const CartItems = ({ item, refreshCart }) => {
    const updateQuantity = async (qty) => {
        await axios.put("http://localhost:5000/api/cart", {
            productId: item.product._id,
            weightLabel: item.weightLabel,
            quantity: qty
        }, { withCredentials: true });
        refreshCart();
    }

    const removeItem = async () => {
        await axios.delete("http://localhost:5000/api/cart", {
            data: {
                productId: item.product._id,
                weightLabel: item.weightLabel
            }, withCredentials: true
        })
        refreshCart();
    }
    return (
        <div className={`${CartStyles.card_item} d-flex align-items-center p-3 mb-4 bg-white rounded-4 shadow-sm`}>
            <img src={item.product.mainImage} className={CartStyles.cartImage} alt="" />

            <div className="ms-4 flex-grow-1">

                <h6 className="fw-semibold mb-1">{item.product.pname}</h6>
                <p className="text-muted mb-2">{item.weightLabel}</p>

                <div className="d-flex align-items-center justify-content-between">
                    <div className={`${CartStyles.qtyBox} d-flex align-items-center`}>
                        <button onClick={() => updateQuantity(item.quantity - 1)}>-</button>

                        <span>{item.quantity}</span>

                        <button onClick={() => updateQuantity(item.quantity + 1)}>+</button>
                    </div>
                    <h6 className="fw-blod">
                         ₹ {item.price * item.quantity}
                    </h6>
                </div>
                <Button onClick={removeItem} className={CartStyles.removeBtn}>
                    <Delete/>
                </Button>
            </div>



            {/* <img src={item.product.mainImage} width="100" alt={item.product.pname}/>

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
        </div> */}
        </div>
    )
}

export default CartItems