import {authService} from "@/services/authService.service";

export async function sameAdminOrAdminAuthorization(userId: string){

    //----> Get user session.
    const session = await authService.getUserSession();

    //----> Check for admin privilege.
    return session?.isAdmin || (session?.id).normalize() === userId.normalize();
}