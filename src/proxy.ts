import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {isPublicRoute} from "@/types/publicRoute";
import {authService} from "@/services/authService.service";

export async function proxy(request: NextRequest) {
    //----> Log the incoming request
    const route = request?.nextUrl?.pathname;
    console.log(`Incoming request: ${request.method} ${route}`);


    //----> Exclude public routes.
    if (isPublicRoute(route)) {
        console.log("In proxy, url : ", `${request?.nextUrl?.pathname}`);
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

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        // - login or signup paths
        // - files with common image extensions (.svg, .png, .jpg, .jpeg, .gif, .webp)
        // - files with .css extension
        // - the root path ("/" or empty string)
        "/((?!^_next/static|_next/image|favicon.ico|login|signup|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css)$|^$|^/$).*)",
    ],
};
