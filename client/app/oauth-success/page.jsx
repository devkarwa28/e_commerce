"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function OAuthHandler(){
    const router = useRouter();
    const { fetchUser } = useAuth();

    useEffect(() => {
        const init = async () => {
      await fetchUser();
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
            flexDirection: "column",
            gap: "16px"
        }}>
            <p style={{ fontSize: "18px", fontWeight: 600 }}>
                Logging you in...
            </p>
        </div>
    );
}
export default function OAuthSuccess() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <OAuthHandler/>
        </Suspense>
    )
}