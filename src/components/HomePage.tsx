"use client"

import Link from "next/link";
import {useAuthContext} from "@/hooks/useAuthContext";

export function HomePage(){
    const {authSession} = useAuthContext();
    return (
        <div className="h-dvh flex justify-center items-center">
            <div
                className="max-w-md font-bold p-10 bg-white ring-1 dark:ring-red-200 rounded-lg shadow-lg text-black mx-auto"
            >
                <h1 className="text-center">Ben Car Repair Shop</h1>

                <p className="mt-20 break-words">
                    This is the home page of Ben Car repair shop. We specialize in all kinds
                    of japanese and german cars. Please log in to enjoy our world class
                    service.
                </p>
                {
                    !authSession?.isLoggedIn && (<div
                        v-if="!isAuthenticated"
                        className="flex justify-between items-center mt-10"
                    >
                        <Link href="/login" className="text-indigo-900 hover:text-green-900"
                        >Login</Link
                        >
                        <Link href="/signup" className="text-brown-900 hover:text-green-900"
                        >Sign Up</Link
                        >
                    </div>)
                }

            </div>
        </div>
    );
}