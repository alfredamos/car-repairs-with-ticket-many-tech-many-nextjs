import {NextRequest, NextResponse} from "next/server";
import {customerService} from "@/services/customer.service";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {customerEditSchema} from "@/shared/customer.validation";

export async function DELETE(_request:NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Delete the customer with the giving id.
        const response = await customerService.deleteCustomerById(id);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){

    }

}

export async function GET(_request:NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Fetch the customer with the giving id.
        const response = await customerService.getCustomerById(id);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){

    }

}

export async function PATCH(request:NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Extract the customer payload from request.
        const customer = validateWithZodSchema(customerEditSchema, await request.json());

        //----> Edit the customer with the giving id.
        const response = await customerService.editCustomerById(id, customer);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){

    }

}