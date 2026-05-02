"use client"

import Link from "next/link";
import {AdminDropdown} from "@/components/AdminDropdown";
import {SettingDropdown} from "@/components/SettingDropdown";
import {useEffect, useState} from "react";
import {useAuthContext} from "@/hooks/useAuthContext";
import {UserSession} from "@/types/UserSession.model";
import {useLocalStore} from "@/hooks/useLocalStore";
import {LocalStorageParam} from "@/app/utils/localStorageParam";
import {logoutUser} from "@/app/actions/auth.action";
import {redirect} from "next/navigation";
import {ModeToggle} from "@/components/theme-toggler";
import {useApiClient} from "@/hooks/useApiClient";
import {Method} from "@/types/method.model";

export function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {authSession, setAuthSession} = useAuthContext();
    const {getLocalStore, removeLocalStore} = useLocalStore<UserSession>();
    const {fetcher} = useApiClient();

    const [isLoggedIn, setIsLoggedIn] = useState(authSession?.isLoggedIn ?? getLocalStore(LocalStorageParam.authKey)?.isLoggedIn);
    const [isAdmin, setIsAdmin] = useState(authSession?.isAdmin ?? getLocalStore(LocalStorageParam.authKey)?.isAdmin);

    useEffect(() => {
        const refreshAuth = async () => {
            setIsLoggedIn(authSession?.isLoggedIn ?? getLocalStore(LocalStorageParam.authKey)?.isLoggedIn);
            setIsAdmin(authSession?.isAdmin ?? getLocalStore(LocalStorageParam.authKey)?.isAdmin);
        }

        refreshAuth().then().catch(error => console.error(error));
    }, [authSession, getLocalStore]);


    const logoutUserAction = async () => {
        removeLocalStore(LocalStorageParam.authKey);
        const response = await logoutUser();
        setAuthSession(response);
        redirect("/");
    }

    const refreshUserTokenAction = async () => {
        const response = await fetcher<UserSession>("/api/auth/refresh", Method.POST);
        setAuthSession(response);
        redirect("/");
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
       <>
       <nav className="bg-gray-800 shadow-lg sticky top-0 z-10">
           <div className="max-w-6xl mx-auto px-4">
               <div className="flex justify-between items-center">
                   {/*Logo*/}
                   <div className="flex items-center">
                       <Link href="/" className="text-white text-2xl font-bold">Logo</Link>
                   </div>

                   {/*Desktop Menu*/}

                   <div className="hidden md:flex md:gap-4 items-center space-x-1">
                       {
                           isLoggedIn &&
                           <>
                             {isAdmin && <AdminDropdown/>}
                             <SettingDropdown
                               userId={authSession?.id as string}
                               refreshUserToken={refreshUserTokenAction}
                             />
                           <button
                             onClick={() => logoutUserAction()}
                             type="button"
                             className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                           >
                           Logout
                           </button>
                               <ModeToggle/>
                           </>

                       }

                   {/*<a routerLink="/logout" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Logout</a>*/}
                   {!isLoggedIn &&
                       <>

                           <Link
                               href="/login"
                               className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                           >Login</Link
                           >
                           <Link
                               href="/signup"
                               className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                           >Signup</Link
                           >
                           <ModeToggle/>
                       </>
                   }

               </div>

               {/*Mobile Menu Button*/}
               <div className="md:hidden flex items-center">
                   <button onClick={toggleMenu} className="mobile-menu-button">
                   <svg
                       className="w-6 h-6 text-gray-500 hover:text-green-500"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                   >
                       <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h16m-7 6h7"
                       ></path>
                   </svg>
               </button>
           </div>
       </div>
       </div>

    {/*Mobile Menu (toggled by JavaScript/TypeScript)*/}
    <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link
            href="/"
            className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
            >Home</Link
        >
        <Link
            href="/assign-tickets"
            className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        >Assigned Tickets</Link
        >
        <Link
            href="/customers"
            className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
            >Customers</Link
        >
        <Link
            href="/technicians"
            className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
            >Technicians</Link
        >
        <Link
            href="/tickets"
            className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        >Tickets</Link
        >
        <Link
            href="/users"
            className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
            >Users</Link
        >
        </div>
    </nav>
       </>
    )
}