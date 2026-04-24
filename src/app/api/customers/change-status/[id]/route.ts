import {NextRequest, NextResponse} from "next/server";
import {customerService} from "@/services/customer.service";
import catchError, {HttpError} from "http-errors";

export async function PATCH(_request: NextRequest, {params}:{params: Promise<{id:string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Change the customer status.
        const response = await customerService.changeStatus(id);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}