import {NextResponse} from "next/server";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {editProfileUserSchema} from "@/shared/auth.validation";
import {authService} from "@/services/authService.service";
import catchError, {HttpError} from "http-errors";

export async function PATCH(request: NextResponse){
    try {
        //----> Get the edit-profile payload from request.
        const editUserProfile = validateWithZodSchema(editProfileUserSchema, await request.json());

        //----> Edit user profile
        const response = await authService.editUserProfile(editUserProfile);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }

}