import {NextResponse} from "next/server";
import {userService} from "@/services/user.service";
import catchError, {HttpError} from "http-errors";

export async function GET(){
    try {
        //----> Fetch all users.
        const response = await userService.getAllUsers();

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}