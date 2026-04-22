import {NextRequest, NextResponse} from "next/server";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {changeUserPasswordSchema} from "@/shared/auth.validation";
import {authService} from "@/services/authService.service";
import {HttpError} from "http-errors"
import catchError from "http-errors";

export async function PATCH(request: NextRequest){
    try {
        //----> Get the request payload from request.
        const changeUserPassword = validateWithZodSchema(changeUserPasswordSchema, await request.json());

        //----> Change user password.
        const response = await authService.changeUserPassword(changeUserPassword);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}