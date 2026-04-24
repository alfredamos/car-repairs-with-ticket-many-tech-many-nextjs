import {NextRequest, NextResponse} from "next/server";
import catchError, {HttpError} from "http-errors";
import {userService} from "@/services/user.service";

export async function GET(_request: NextRequest, {params}:{params:Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Fetch the user with the giving id.
        const response = await userService.getUserById(id);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function DELETE(_request: NextRequest, {params}:{params:Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Delete the user with the giving id.
        const response = await userService.deleteUserById(id);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

