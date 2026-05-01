import {authService} from "@/services/authService.service";

export async function useAuth() {
    const session = await authService.getUserSession();
    const hasAdmin = session?.isAdmin;

    function isAuthenticated() {
        return !!session;
    }

    function isAdmin() {
        return session.isAdmin;
    }

    function isOwner(userId: string) {
        return (session.id).normalize() === userId.normalize();
    }

    function isOwnerOrAdmin(userId: string) {
        return isOwner(userId) || isAdmin();
    }

    return {
        isAuthenticated,
        isAdmin,
        isOwner,
        isOwnerOrAdmin,
        hasAdmin
    }
}