import {NextResponse} from "next/server";
import {authService} from "@/services/authService.service";
import catchError, {HttpError} from "http-errors";

export async function POST(){
    try {
        //----> Refresh the user token.
        const response = await authService.refreshUserToken();

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}