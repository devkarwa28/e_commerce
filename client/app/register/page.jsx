"use client";
import { Facebook, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterUser = () => {
    const router = useRouter()
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler =  async () =>{
        if( password !== confirmPassword)
        {
            alert("Password Does Not Match")
            return;
        }
        try{
            await axios.post("http://localhost:5000/api/auth/register",{uname,email,password},{withCredentials:true});
            router.push("/login")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <section className='login-wrapper'>
            <div className='login-card'>
                <h3 className='login-title'>Create Account</h3>

                <TextField size='small' label="Full Name" fullWidth className='mb-3' value={uname} onChange={(e) => setUname(e.target.value)} />

                <TextField size='small' label="Email" fullWidth className='mb-3' value={email} onChange={(e) => setEmail(e.target.value)} />

                <TextField size='small' label="Password" type={showPassword ? "text" : "password"} fullWidth className='mb-3' value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{
                    endAdornment:
                        <InputAdornment posistion="end" >
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                }} />

                <TextField size='small' label="Confirm Password" fullWidth type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <Button fullWidth variant='contained' onClick={submitHandler} className='mt-3 login-btn'>
                    Register
                </Button>
                <p className='mt-3 text-center'>
                    Already have an account?{" "}
                    <Link href="/login">Login</Link>
                </p>
                <Divider className='my-4' sx={{color:"#5c4033", fontWeight:700}} >
                    Or Register With
                </Divider>
                <div className="d-flex gap-4 mt-4">
                    <Button variant="outlined" startIcon={<Google />} className="google-btn">
                        Google
                    </Button>

                    <Button startIcon={<Facebook />} variant="outlined" className="facebook-btn">
                        Facebook
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default RegisterUser