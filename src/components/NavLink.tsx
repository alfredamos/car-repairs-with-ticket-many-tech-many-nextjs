"use client"

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {useAuthContext} from "@/hooks/useAuthContext";
import {useLocalStore} from "@/hooks/useLocalStore";
import axios from "axios";
import {StatusCodes} from "http-status-codes";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import { UserSession } from "@/types/UserSession.model";
import { LocalStorageParam } from "@/app/utils/localStorageParam";

type Props = {
    href: string;
    label: string;
}

export function NavLink({href, label}: Props) {
    const {setAuthSession : setUserResponse} = useAuthContext();
    const {setLocalStore} = useLocalStore<UserSession>();
    const [isNotRefresh, setIsNotRefresh] = useState(false)

    const router = useRouter();

    useEffect(() => {
        const checkRefresh = async () => {
            setIsNotRefresh(href !== "/refresh")
        }
        checkRefresh().then().catch(error => console.error(error));
    },[href])

    const refreshUserTokenAction = async () => {
        const response = await axios.post("/api/auth/refresh", {});

        if (response.status !== StatusCodes.OK) throw new Error("User token cannot be refreshed");

        setUserResponse(response.data);
        setLocalStore(LocalStorageParam.authKey, response.data);

        router.refresh();
    }

    return (
        <>
            {isNotRefresh ?
                (
                    <DropdownMenuItem key={label}>
                        <Link href={href} className="py-2 px-4 text-sm font-medium text-gray-600 dark:text-gray-900 bg-gray-100 rounded hover:bg-gray-600 dark:hover:text-black transition duration-300 w-full">{label}</Link>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem key={label}>
                        <form action={refreshUserTokenAction} className="py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded hover:bg-gray-600 dark:hover:text-black transition duration-300 w-full">
                            <button type="submit">{label}</button>
                        </form>
                    </DropdownMenuItem>
                )}

        </>

    );
}
