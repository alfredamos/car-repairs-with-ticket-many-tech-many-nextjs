"use client"

import {useContext} from "react"
import {authContext} from "@/app/utils/AuthContext";

export const useAuthContext = () => {
    const context = useContext(authContext);

    if (context === undefined || context === null) {
        throw new Error('useUserContext must be used within a UserProvider');
    }

    return context;
};