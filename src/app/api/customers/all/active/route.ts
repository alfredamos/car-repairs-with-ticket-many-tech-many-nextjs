import catchError, {HttpError} from "http-errors";
import {NextResponse} from "next/server";
import {customerService} from "@/services/customer.service";

export async function GET(){
    try {
        //----> Fetch active customers.
        const response = await customerService.getActiveCustomers();

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}