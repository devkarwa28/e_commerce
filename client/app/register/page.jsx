"use client";

import { Facebook, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import RegisterStyles from './register.module.css';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

const RegisterUser = () => {
    const router = useRouter()
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        if (!uname || !email || !password || !confirmPassword) {
            setError("Please fill in all details.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { uname, email, password }, { withCredentials: true });
            router.push("/login")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            console.log(err);
        }
        setLoading(false);
    }
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    }
    return (
        <section className={RegisterStyles.pageWrapper}>
            <div className={RegisterStyles.registerCard}>
                <div className={RegisterStyles.registerHeader}>
                    <h3 className={RegisterStyles.registerTitle}>Create Account</h3>
                    <p className={RegisterStyles.registerSubtitle}>Join Nutrivia for a premium experience</p>
                </div>

                {error && <div className={RegisterStyles.errorMsg}>{error}</div>}

                <form className={RegisterStyles.formArea} onSubmit={submitHandler}>
                    <div className={RegisterStyles.inputGroup}>
                        <label className={RegisterStyles.inputLabel}>Full Name</label>
                        <input 
                            type="text" 
                            className={RegisterStyles.customInput} 
                            placeholder="Enter your full name"
                            value={uname} 
                            onChange={(e) => setUname(e.target.value)} 
                        />
                    </div>

                    <div className={RegisterStyles.inputGroup}>
                        <label className={RegisterStyles.inputLabel}>Email Address</label>
                        <input 
                            type="email" 
                            className={RegisterStyles.customInput} 
                            placeholder="Enter your email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className="row g-3">
                        <div className="col-sm-6">
                            <div className={`${RegisterStyles.inputGroup} mb-0`}>
                                <label className={RegisterStyles.inputLabel}>Password</label>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className={RegisterStyles.customInput} 
                                    placeholder="Enter password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <button type="button" className={RegisterStyles.passVisibilityBtn} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff sx={{fontSize: 20}} /> : <Visibility sx={{fontSize: 20}} />}
                                </button>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className={`${RegisterStyles.inputGroup} mb-0`}>
                                <label className={RegisterStyles.inputLabel}>Confirm Password</label>
                                <input 
                                    type="password" 
                                    className={RegisterStyles.customInput} 
                                    placeholder="Re-enter password"
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={RegisterStyles.registerBtn}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : (
                            <>
                                Register
                                <PersonAddAlt1RoundedIcon sx={{ fontSize: 18 }} />
                            </>
                        )}
                    </button>
                </form>

                <div className={RegisterStyles.dividerWrap}>
                    <div className={RegisterStyles.dividerLine}></div>
                    <span className={RegisterStyles.dividerText}>or register with</span>
                    <div className={RegisterStyles.dividerLine}></div>
                </div>

                <div className={RegisterStyles.socialBtns}>
                    <button onClick={handleGoogleLogin} className={`${RegisterStyles.socialBtn} ${RegisterStyles.googleBtn}`}>
                        <Google />
                        Google
                    </button>

                    <button className={`${RegisterStyles.socialBtn} ${RegisterStyles.facebookBtn}`}>
                        <Facebook />
                        Facebook
                    </button>
                </div>

                <div className={RegisterStyles.loginWrap}>
                    Already have an account? 
                    <Link href="/login" className={RegisterStyles.loginLink}>
                        Sign in
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default RegisterUser;