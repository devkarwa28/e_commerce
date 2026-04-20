"use client";

import { useAuth } from "@/context/AuthContext";
import { Facebook, Google } from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginStyles from "./login.module.css";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Image from "next/image";
import { Divider } from "@mui/material";

const UserLogin = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      setUser(res.data);
      router.push("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    }
    setLoading(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`, { phone });
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 800);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 800);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <section className={LoginStyles.pageWrapper}>
      <div className={LoginStyles.loginCard}>
        <div className={LoginStyles.loginHeader}>
          <h3 className={LoginStyles.loginTitle}>Welcome Back</h3>
          <p className={LoginStyles.loginSubtitle}>
            Sign in to access your Nutrivia account
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <button
            type="button"
            onClick={() => {
              setIsOtpLogin(!isOtpLogin);
              setStep("phone");
              setOtp("");
              setError("");
            }}
            className={LoginStyles.switchBtn}
            style={{
              background: "rgba(92, 64, 51, 0.05)",
              border: "1px solid rgba(92, 64, 51, 0.1)",
              color: "var(--color-primary)",
              padding: "8px 20px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--color-primary)";
              e.currentTarget.style.color = "#FFF";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(92, 64, 51, 0.05)";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
          >
            {isOtpLogin ? "Use Email Login instead" : "Login with OTP instead"}
          </button>
        </div>

        {error && <div className={LoginStyles.errorMsg}>{error}</div>}

        {!isOtpLogin ? 
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
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <LoginRoundedIcon sx={{ fontSize: 18 }} />
              </>
            )}
          </button>
        </form> :
        step === "phone" ? (
          <form className={LoginStyles.formArea} onSubmit={handleSendOtp}>
            <div className={LoginStyles.inputGroup}>
              <label className={LoginStyles.inputLabel}>Phone Number</label>
              <input
                type="text"
                className={LoginStyles.customInput}
                placeholder="Enter your 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={10}
              />
            </div>

            <button
              type="submit"
              className={LoginStyles.loginBtn}
              disabled={loading || phone.length < 10}
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </form>
        ) : (
          <form className={LoginStyles.formArea} onSubmit={handleVerifyOtp}>
            <div className={LoginStyles.inputGroup}>
              <label className={LoginStyles.inputLabel}>Enter 6-Digit OTP</label>
              <input
                type="text"
                className={LoginStyles.customInput}
                style={{ 
                  textAlign: "center", 
                  fontSize: "24px", 
                  letterSpacing: "14px", 
                  fontWeight: "700",
                  paddingLeft: "28px" 
                }}
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={6}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className={LoginStyles.loginBtn}
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button 
                type="button" 
                onClick={() => { setStep("phone"); setOtp(""); }}
                style={{ background: "none", border: "none", color: "var(--color-text-secondary)", fontSize: "14px", fontWeight: "600", cursor: "pointer", textDecoration: "underline" }}
              >
                Change Phone Number
              </button>
            </div>
          </form>
        )
    }

        <div className={LoginStyles.dividerWrap}>
          <div className={LoginStyles.dividerLine}></div>
          <span className={LoginStyles.dividerText}>or continue with</span>
          <div className={LoginStyles.dividerLine}></div>
        </div>

        

        <div className={LoginStyles.socialBtns}>
          <button
            onClick={handleGoogleLogin}
            className={`${LoginStyles.socialBtn} ${LoginStyles.googleBtn}`}
          >
            <Image
              src="/google.webp=s96-fcrop64=1,00000000ffffffff-rw"
              alt=""
              width={20}
              height={20}
            />
            Google
          </button>

          <button
            className={`${LoginStyles.socialBtn} ${LoginStyles.facebookBtn}`}
          >
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
  );
};

export default UserLogin;
