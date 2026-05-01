import EditProfileForm from "@/app/(auth)/edit-profile/EditProfileForm";
import {getLoginUser as getCurrentUser} from "@/app/actions/auth.action";
import {HttpError} from "http-errors";
import {User} from "@/generated/prisma/client";
import {useAuth} from "@/hooks/useAuth";

export default async function EditUserProfilePage(){
    //----> Get user session.
    const {isAuthenticated} = await useAuth();

    //----> Check for authentication.
    if (!isAuthenticated()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must login to change your password!</h1></div>
    }

    //----> Get user from the current user.
    const response = await getCurrentUser();

    //----> Check for error.
    if (response instanceof HttpError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <EditProfileForm user={response as unknown as User}/>
    );
}