"use client";

import { IconButton } from "@mui/material";
import axios from "axios";
import CartStyles from "./cart.module.css";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const CartItems = ({ item, refreshCart }) => {
    const updateQuantity = async (qty) => {
        if (qty < 1) return;
        try {
            await axios.put("http://localhost:5000/api/cart", {
                productId: item.product._id,
                weightLabel: item.weightLabel,
                quantity: qty
            }, { withCredentials: true });
            refreshCart();
        } catch (error) {
            console.error("Error updating quantity", error);
        }
    }

    const removeItem = async () => {
        try {
            await axios.delete("http://localhost:5000/api/cart", {
                data: {
                    productId: item.product._id,
                    weightLabel: item.weightLabel
                },
                withCredentials: true
            });
            refreshCart();
        } catch (error) {
            console.error("Error removing item", error);
        }
    }

    return (
        <div className={CartStyles.cartItemCard}>
            <div className={CartStyles.cartImageWrap}>
                <img src={item.product?.mainImage} className={CartStyles.cartImage} alt={item.product?.pname} />
            </div>

            <div className={CartStyles.cartItemDetails}>
                <div className={CartStyles.cartItemHeader}>
                    <div>
                        <h6 className={CartStyles.cartItemTitle}>{item.product?.pname}</h6>
                        <span className={CartStyles.cartItemWeight}>{item.weightLabel}</span>
                    </div>
                    <IconButton onClick={removeItem} className={CartStyles.removeBtn} aria-label="remove item">
                        <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </div>

                <div className={CartStyles.cartItemActions}>
                    <div className={CartStyles.qtySelector}>
                        <button className={CartStyles.qtyBtn} onClick={() => updateQuantity(item.quantity - 1)}>
                            <RemoveRoundedIcon sx={{ fontSize: 16 }} />
                        </button>
                        <span className={CartStyles.qtyValue}>{item.quantity}</span>
                        <button className={CartStyles.qtyBtn} onClick={() => updateQuantity(item.quantity + 1)}>
                            <AddRoundedIcon sx={{ fontSize: 16 }} />
                        </button>
                    </div>
                    <div className={CartStyles.cartItemPrice}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;