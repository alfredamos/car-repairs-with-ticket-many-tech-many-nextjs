import catchError, {HttpError} from "http-errors";
import {NextRequest, NextResponse} from "next/server";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {customerCreateSchema} from "@/shared/customer.validation";
import {customerService} from "@/services/customer.service";

export async function GET(){
    try {
        //----> Fetch all customers.
        const response = await customerService.getAllCustomers();

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function POST(request: NextRequest){
    try {
        //----> Get the customer payload from the request.
        const customer = validateWithZodSchema(customerCreateSchema, await request.json());

        //----> Insert the new customer in db.
        const response = await customerService.createCustomer(customer);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}