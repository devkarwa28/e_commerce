"use client";

import axios from "axios";

const { createContext, useState, useEffect, useContext } = require("react");
const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart,setCart] = useState(null);
    const [loading,setLoading] = useState(true);

    const fetchCart = async () =>{
        try{
            const res = await axios.get("http://localhost:5000/api/cart",{withCredentials:true});
            setCart(res.data);
        }
        catch(err){
            setCart(null)
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchCart();
    },[])

    const addToCart = async (productId,weightLabel,quantity) =>{
        await axios.post("http://localhost:5000/api/cart",{productId,weightLabel,quantity},{withCredentials:true});
        fetchCart();
    }
    const removeFromCart = async (productId,weightLabel) =>{
        await axios.delete("http://localhost:5000/api/cart",{data:{productId,weightLabel},withCredentials:true});
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