import ChangePasswordForm from "@/app/(auth)/change-password/ChangeUserPasswordForm";
import {getLoginUser as getCurrentUser} from "@/app/actions/auth.action";
import {HttpError} from "http-errors";

export default async function ChangeUserPasswordPage(){
    const response = await getCurrentUser();

    //----> Check for error.
    if (response instanceof HttpError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    const email = response.email;

    return (
        <ChangePasswordForm email={email}/>
    );
}