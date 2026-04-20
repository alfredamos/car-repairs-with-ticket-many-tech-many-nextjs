import {H3Event} from "h3";
import {authService} from "#server/services/auth.service";

export function sameAdminOrAdminAuthorization(event: H3Event): boolean{
    //----> Get the user id from params.
    const userId = getRouterParam(event, "userId") as string;

    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Check for admin privilege.
    return session?.isAdmin || (session?.id).normalize() === userId.normalize();
}