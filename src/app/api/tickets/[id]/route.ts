import {NextRequest, NextResponse} from "next/server";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {ticketEditSchema} from "@/shared/ticket.validation";
import {ticketService} from "@/services/ticket.service";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Fetch the ticket with the giving id.
        const response = await ticketService.getTicketById(id);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }
}

export async function DELETE(_request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Delete the ticket with the giving id.
        const response = await ticketService.deleteTicketById(id);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }
}

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        //----> Extract the id from params.
        const {id} = await params;

        //----> Extract the ticket payload from request.
        const ticket = validateWithZodSchema(ticketEditSchema, await request.json());

        //----> Edit the ticket with the giving id.
        const response = await ticketService.editTicketById(id, ticket);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }
}