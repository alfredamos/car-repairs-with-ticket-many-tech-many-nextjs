"use client"



import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {UserSession} from "@/types/UserSession.model";

type AuthContextType = {
    authSession: UserSession | null;
    setAuthSession: Dispatch<SetStateAction<UserSession | null>>;
}

export const authContext = createContext<AuthContextType | null>(null);

export function AuthContext({ children }: { children: ReactNode }) {
    const [authSession, setAuthSession] = useState<UserSession | null>(null);

    return (
        <authContext.Provider value={{authSession, setAuthSession}}>
            {children}
        </authContext.Provider>
    )
}