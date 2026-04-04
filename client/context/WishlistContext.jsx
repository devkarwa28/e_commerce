"use client"

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

const WishlistProvider = ({children}) => {
    const [wishlist,setWishlist] = useState([]);

    const fetchWishlist = async () =>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`,{withCredentials:true});
            setWishlist(res.data.products);
        }
        catch(err){
            console.error("Error fetching wishlist:", err);
            setWishlist([]);
        }
    }

    const toggleWishlist = async (productId) =>{
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/toggle`,{productId},{withCredentials:true});
            fetchWishlist();
        }
        catch(err){
            console.log(err);
        }
    }

    const { user } = useAuth();

    useEffect(()=>{
        if(user){
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    },[user])
  return (
    <WishlistContext.Provider value={{wishlist,setWishlist,fetchWishlist,toggleWishlist}}>
        {children}
    </WishlistContext.Provider>
  )
}

export default WishlistProvider
export const useWishlist = () => useContext(WishlistContext);