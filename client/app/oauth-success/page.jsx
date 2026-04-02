"use client";


import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
function oAuthHandler(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const { fetchUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            fetchUser();
        }
        router.replace("/");
    }, []);

    return <p>Logging you in...</p>;
}
export default function OAuthSuccess() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <oAuthHandler/>
        </Suspense>
    )
}