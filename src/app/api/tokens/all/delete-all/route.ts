import {NextResponse} from "next/server";
import {tokenService} from "@/services/token.service";
import catchError, {HttpError} from "http-errors";

export async function DELETE(){
    try {
        //----> Delete all invalid tokens.
        const response = await tokenService.deleteAllInvalidTokens();

        //----> Send back response.
        return NextResponse.json(response)
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }

}