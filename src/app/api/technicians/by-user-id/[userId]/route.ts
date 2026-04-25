import {NextRequest, NextResponse} from "next/server";
import {techService} from "@/services/tech.service";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}: {params: Promise<{userId: string}>}){
    try {
        //----> Get the user id from params.
        const {userId} = await params;

        //----> Fetch the tech with the giving user id.
        const response = await techService.getTechnicianByUserId(userId);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}
