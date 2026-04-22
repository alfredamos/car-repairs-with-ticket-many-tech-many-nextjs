import {authService} from "@/services/authService.service";

export async function isAdminAuthorization(){
    //----> Get user session.
    const session = await authService.getUserSession();

    //----> Check for admin privilege.
    return session?.isAdmin;
}