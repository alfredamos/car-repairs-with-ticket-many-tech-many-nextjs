"use client"

import {useAuthContext} from "@/hooks/useAuthContext";
import {NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {MenuDropdown} from "@/components/MenuDropdown";
import {ModeToggle} from "@/components/theme-toggler";
import Link from "next/link";
import {SubmitEvent, useEffect, useState} from "react";
import {LocalStorageParam} from "@/app/utils/localStorageParam";
import {UserSession} from "@/types/UserSession.model";
import {useLocalStore} from "@/hooks/useLocalStore";
import {adminItems} from "@/app/utils/adminItems";
import {getAllSettingItems} from "@/app/utils/settingItems";
import {redirect} from "next/navigation";
import {useApiClient} from "@/hooks/useApiClient";
import {Method} from "@/types/method.model";
import {emptyUserSession} from "@/utils/emptyUserSession";

export default function SignInAndOut() {
    const {authSession, setAuthSession} = useAuthContext();
    const {getLocalStore, removeLocalStore} = useLocalStore<UserSession>()

    const [isLoggedIn, setIsLoggedIn] = useState(authSession?.isLoggedIn ?? getLocalStore(LocalStorageParam.authKey)?.isLoggedIn);
    const [isAdmin, setIsAdmin] = useState(authSession?.isAdmin ?? getLocalStore(LocalStorageParam.authKey)?.isAdmin);

    const {fetcher} = useApiClient();

    useEffect(() => {
        const refreshAuth = async () => {
            setIsLoggedIn(authSession?.isLoggedIn ?? getLocalStore(LocalStorageParam.authKey)?.isLoggedIn);
            setIsAdmin(authSession?.isAdmin ?? getLocalStore(LocalStorageParam.authKey)?.isAdmin);
        }

        refreshAuth().then().catch(error => console.error(error));
    }, [authSession, getLocalStore]);


    const logoutUserAction = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        removeLocalStore(LocalStorageParam.authKey);
        setAuthSession(emptyUserSession);
        await fetcher<UserSession>("/api/auth/logout", Method.POST);
        redirect("/")

    }

    return (
        <>
            {
               isLoggedIn ? (<NavigationMenuList className="space-x-2">
                  {isAdmin ? (<NavigationMenuItem className="hover:bg-black hover:text-white focus:outline-none gap-2 px-4 pt-1 pb-2 rounded-md">
                        <MenuDropdown items={adminItems} title="Admin" subTitle="Admin Panel" />
                  </NavigationMenuItem>) : ""}

                   <NavigationMenuItem className="hover:bg-black hover:text-white focus:outline-none gap-2 px-4 pt-1 pb-2 rounded-md">
                       <MenuDropdown items={getAllSettingItems(authSession?.id as string, isAdmin)} title="Settings" subTitle="My Account" />

                   </NavigationMenuItem>
                   <NavigationMenuItem>
                       <form onSubmit={(event) => logoutUserAction(event)}>
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