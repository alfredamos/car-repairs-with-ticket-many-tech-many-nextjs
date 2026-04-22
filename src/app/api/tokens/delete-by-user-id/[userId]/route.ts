import {NextRequest, NextResponse} from "next/server";
import {tokenService} from "@/services/token.service";
import catchError, {HttpError} from "http-errors";

export async function DELETE(_request: NextRequest, {params}: {params: Promise<{userId: string}>}){
    try {
        //----> Extract the user id from
        const {userId} = await params;

        //----> Delete tokens by giving user-id.
        const response = await tokenService.deleteInvalidTokensByUserId(userId);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }

}