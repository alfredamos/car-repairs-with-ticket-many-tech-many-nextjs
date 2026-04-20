import {H3Event} from "h3";
import {authService} from "#server/services/auth.service";

export function isAdminAuthorization(event: H3Event): boolean{
    console.log("Inside admin Authorization");
    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Check for admin privilege.
    return session?.isAdmin;
}