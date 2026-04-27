"use client"; // Required in Next.js 16 for Context

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import {ReactNode} from "react"; // Import specific types

interface ThemeProviderPropsWithChildren extends ThemeProviderProps{
  children: ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderPropsWithChildren) {
  return (
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
  );
}
