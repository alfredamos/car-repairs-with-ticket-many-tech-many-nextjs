import EditProfileForm from "@/app/(auth)/edit-profile/EditProfileForm";
import {getLoginUser as getCurrentUser} from "@/app/actions/auth.action";
import {HttpError} from "http-errors";
import {User} from "@/generated/prisma/client";

export default async function EditUserProfilePage(){
    const response = await getCurrentUser();

    //----> Check for error.
    if (response instanceof HttpError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <EditProfileForm user={response as User}/>
    );
}