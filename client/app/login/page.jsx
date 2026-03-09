"use client";
import { useAuth } from "@/context/AuthContext";
import { Facebook, Google } from "@mui/icons-material";
import { Button, Divider, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

 
 const UserLogin = () => {
  const {setUser} = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter()
    const loginHandler = async () =>{
      try{
        const res = await axios.post("http://localhost:5000/api/auth/login",{email,password});
        setUser(res.data);
        router.push("/")
      }
      catch(err){
        console.log("Cannot Login")
      }
    }
   return (
     <section className="login-wrapper">
        <div className="login-card">
            <h3 className="login-title">Welcome Back</h3>

            <TextField size="small" label="Email" fullWidth className="mb-3" value={email} onChange={(e)=>setEmail(e.target.value)} />

            <TextField size="small" label="Password" type="password" fullWidth value={password} className="mb-3" onChange={(e)=>setPassword(e.target.value)} />

            <Button fullWidth variant="contained" onClick={loginHandler} className="login-btn mb-3" >
              Login 
            </Button>

            <p className="text-muted mt-3 text-center">Don't Have An Account <Link href="/register">Register Now</Link></p>
            <Divider>
              OR
            </Divider>

            <div className="d-flex gap-4 mt-4">
              <Button variant="outlined" startIcon={<Google/>} className="google-btn">
              Google
              </Button>

              <Button startIcon={<Facebook/>} variant="outlined" className="facebook-btn">
              Facebook
              </Button>
            </div>
        </div>
     </section>
   )
 }
 
 export default UserLogin