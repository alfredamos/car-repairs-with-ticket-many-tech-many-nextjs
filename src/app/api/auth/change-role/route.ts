import {NextRequest, NextResponse} from "next/server";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {changeUserRoleSchema} from "@/shared/auth.validation";
import {authService} from "@/services/authService.service";
import catchError, {HttpError} from "http-errors";

export async function PATCH(request: NextRequest){
    try {
        //----> Get the payload from request.
        const changeUserRole = validateWithZodSchema(changeUserRoleSchema, await request.json());

        //----> Change the user-role.
        const response = await authService.changeUserRole(changeUserRole);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }

}