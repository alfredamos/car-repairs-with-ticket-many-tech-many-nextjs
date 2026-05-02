// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {authService} from "@/services/authService.service";
import {isPublicRoute} from "@/types/publicRoute";

export async function proxy(request: NextRequest) {
    //----> Log the incoming request
    const route = request?.nextUrl?.pathname;
    console.log(`Incoming request: ${request.method} ${route}`);


    //----> Exclude public routes.
    if (isPublicRoute(route)) {
        return NextResponse.next();
    }

    //----> Authenticate user.
    const session = await authService.getUserSession();
    console.log("In proxy, session: ", session);
    //----> Check for unauthenticated user.
    if (!session?.isLoggedIn) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    //----> Allow the request to proceed
    return NextResponse.next();
}

// Optional: Limit which paths the proxy runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (internal routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
