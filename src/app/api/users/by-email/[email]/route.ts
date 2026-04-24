import {NextRequest, NextResponse} from "next/server";
import {userService} from "@/services/user.service";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}:{params:Promise<{email: string}>}){
    try {
        //----> Extract the email from params.
        const {email} = await params;

        //----> Fetch the user with the giving email.
        const response = await userService.getUserByEmail(email);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}