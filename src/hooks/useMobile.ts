"use client"

import {useState} from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const changeMobileState = () => {
        setIsMobile(!isMobile);
    }

    return { isMobile, setIsMobile, changeMobileState };
}