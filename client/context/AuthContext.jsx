"use client";
import axios from 'axios';
import React, { useContext, createContext ,useEffect, useState } from 'react';

axios.defaults.withCredentials = true;
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const fetchUser = async () =>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,{withCredentials: true});
            setUser(res.data.user);
        }
        catch(err){
            setUser(null)
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchUser();
    },[])

    const logOut = async () =>{
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,{},{withCredentials: true});
        setUser(null)
    }
  return (
    <AuthContext.Provider value={{user,setUser,loading,logOut}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext)