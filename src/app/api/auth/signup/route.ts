import {NextRequest, NextResponse} from "next/server";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {signupUserSchema} from "@/shared/auth.validation";
import {authService} from "@/services/authService.service";
import catchError, {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";

export async function POST(request: NextRequest){
    try {
        //----> Get the signup user payload from request.
        const signupUser = validateWithZodSchema(signupUserSchema, await request.json());

        //----> Signup new user.
        const response = await authService.signupUser(signupUser);

        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}