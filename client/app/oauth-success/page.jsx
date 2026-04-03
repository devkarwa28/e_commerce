"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function OAuthHandler(){
    const router = useRouter();
    const { fetchUser } = useAuth();

    useEffect(() => {
        fetchUser().then(()=>{
            router.replace("/");
        })
        .catch(()=>{
            router.replace("/login");
        })
    }, []);

    return <p>Logging you in...</p>;
}
export default function OAuthSuccess() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <OAuthHandler/>
        </Suspense>
    )
}