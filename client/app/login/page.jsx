"use client";

import { useAuth } from "@/context/AuthContext";
import { Facebook, Google } from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginStyles from "./login.module.css";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const UserLogin = () => {
    const { setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const loginHandler = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { email, password });
            setUser(res.data);
            router.push("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
            console.log("Cannot Login", err);
        }
        setLoading(false);
    }

    return (
        <section className={LoginStyles.pageWrapper}>
            <div className={LoginStyles.loginCard}>
                <div className={LoginStyles.loginHeader}>
                    <h3 className={LoginStyles.loginTitle}>Welcome Back</h3>
                    <p className={LoginStyles.loginSubtitle}>Sign in to access your Nutrivia account</p>
                </div>

                {error && <div className={LoginStyles.errorMsg}>{error}</div>}

                <form className={LoginStyles.formArea} onSubmit={loginHandler}>
                    <div className={LoginStyles.inputGroup}>
                        <label className={LoginStyles.inputLabel}>Email Address</label>
                        <input 
                            type="email" 
                            className={LoginStyles.customInput} 
                            placeholder="Enter your email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className={LoginStyles.inputGroup}>
                        <label className={LoginStyles.inputLabel}>Password</label>
                        <input 
                            type="password" 
                            className={LoginStyles.customInput} 
                            placeholder="Enter your password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <Link href="#" className={LoginStyles.forgotPassword}>
                        Forgot Password?
                    </Link>

                    <button 
                        type="submit" 
                        className={LoginStyles.loginBtn}
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : (
                            <>
                                Sign In
                                <LoginRoundedIcon sx={{ fontSize: 18 }} />
                            </>
                        )}
                    </button>
                </form>

                <div className={LoginStyles.dividerWrap}>
                    <div className={LoginStyles.dividerLine}></div>
                    <span className={LoginStyles.dividerText}>or continue with</span>
                    <div className={LoginStyles.dividerLine}></div>
                </div>

                <div className={LoginStyles.socialBtns}>
                    <button className={`${LoginStyles.socialBtn} ${LoginStyles.googleBtn}`}>
                        <Google />
                        Google
                    </button>

                    <button className={`${LoginStyles.socialBtn} ${LoginStyles.facebookBtn}`}>
                        <Facebook />
                        Facebook
                    </button>
                </div>

                <div className={LoginStyles.registerWrap}>
                    New to Nutrivia? 
                    <Link href="/register" className={LoginStyles.registerLink}>
                        Create an account
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default UserLogin;