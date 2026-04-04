"use client";

import axios from "axios";

import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart,setCart] = useState(null);
    const [loading,setLoading] = useState(true);

    const fetchCart = async () =>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`,{withCredentials:true});
            setCart(res.data);
        }
        catch(err){
            setCart(null)
        }
        setLoading(false);
    }

    const { user } = useAuth();

    useEffect(()=>{
        if(user){
            fetchCart();
        } else {
            setCart(null);
        }
    },[user])

    const addToCart = async (productId,weightLabel,quantity) =>{
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`,{productId,weightLabel,quantity},{withCredentials:true});
        fetchCart();
    }
    const removeFromCart = async (productId,weightLabel) =>{
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`,{data:{productId,weightLabel},withCredentials:true});
        fetchCart();
    }
  return (
    <CartContext.Provider value={{cart,setCart,loading,fetchCart,addToCart,removeFromCart}}>
        {children}
    </CartContext.Provider>
  )
}
export default CartProvider;
export const useCart = () => useContext(CartContext);