"use client"

import {useAuthContext} from "@/hooks/useAuthContext";
import {NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {logoutUser} from "@/app/actions/auth.action";
import {MenuDropdown} from "@/components/MenuDropdown";
import {ModeToggle} from "@/components/theme-toggler";
import Link from "next/link";
import {useEffect, useState} from "react";
import { LocalStorageParam } from "@/app/utils/localStorageParam";
import { UserSession } from "@/types/UserSession.model";
import { useLocalStore } from "@/hooks/useLocalStore";
import { adminItems } from "@/app/utils/adminItems";
import { getAllSettingItems } from "@/app/utils/settingItems";

export default function SignInAndOut() {
    const {authSession} = useAuthContext();
    const {getLocalStore, removeLocalStore} = useLocalStore<UserSession>()

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
        await logoutUser()
    }

    return (
        <>
            {
               isLoggedIn ? (<NavigationMenuList className="space-x-2">
                  {isAdmin ? (<NavigationMenuItem className="hover:bg-black hover:text-white focus:outline-none gap-2 px-4 pt-1 pb-2 rounded-md">
                        <MenuDropdown items={adminItems} title="Admin" subTitle="Admin Panel" />
                  </NavigationMenuItem>) : ""}

                   <NavigationMenuItem className="hover:bg-black hover:text-white focus:outline-none gap-2 px-4 pt-1 pb-2 rounded-md">
                       <MenuDropdown items={getAllSettingItems(authSession?.email as string, isAdmin)} title="Settings" subTitle="My Account" />

                   </NavigationMenuItem>
                   <NavigationMenuItem>
                       <form action={logoutUserAction}>
                            <Button variant="ghost" className="hover:bg-black hover:text-white" type="submit">
                                Logout
                            </Button>
                       </form>
                   </NavigationMenuItem>
                   <ModeToggle/>
               </NavigationMenuList>
               ) :
               (<NavigationMenuList className="space-x-2">
                   <NavigationMenuItem>
                       <Button variant="ghost" asChild className="hover:bg-black hover:text-white">
                           <Link href="/login">Login</Link>
                       </Button>
                   </NavigationMenuItem>
                   <NavigationMenuItem>
                       <Button asChild variant="ghost" className="hover:bg-black hover:text-white">
                           <Link href="/signup">Register</Link>
                       </Button>
                   </NavigationMenuItem>
                   <ModeToggle/>
               </NavigationMenuList>)
            }

        </>
    )
}