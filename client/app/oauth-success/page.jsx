"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { StorefrontRounded } from "@mui/icons-material";

function OAuthHandler(){
    const router = useRouter();
    const { fetchUser } = useAuth();

    useEffect(() => {
        const init = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if(token){
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/set-cookie`,{
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                });
                await fetchUser();
            }
            router.push("/");
        };
        init();
    }, []);

    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "100vh",
            backgroundColor: "#0f0a07",
            flexDirection: "column",
            gap: "24px",
            padding: "20px"
        }}>
            <div style={{ position: "relative", width: "100px", height: "100px" }}>
                {/* Rotating Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "3px solid transparent",
                        borderTop: "3px solid #c89b3c",
                        borderRight: "3px solid #c89b3c",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        boxShadow: "0 0 15px rgba(200, 155, 60, 0.4)"
                    }}
                />
                
                {/* Pulsing Inner Circle */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{
                        width: "80%",
                        height: "80%",
                        background: "rgba(200, 155, 60, 0.1)",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "10%",
                        left: "10%",
                    }}
                />

                {/* Center Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#c89b3c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <StorefrontRounded sx={{ fontSize: 40 }} />
                </motion.div>
            </div>

            <div style={{ textAlign: "center" }}>
                <motion.h2
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ 
                        color: "#FFFFFF", 
                        fontSize: "clamp(18px, 4vw, 24px)", 
                        fontWeight: 700, 
                        margin: 0,
                        letterSpacing: "1px"
                    }}
                >
                    Authenticating
                </motion.h2>
                <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "14px", marginTop: "8px" }}>
                    Setting up your secure workspace...
                </p>
            </div>
        </div>
    );
}

export default function OAuthSuccess() {
    return (
        <Suspense fallback={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#0f0a07", color: "#c89b3c" }}>
                Loading...
            </div>
        }>
            <OAuthHandler/>
        </Suspense>
    )
}