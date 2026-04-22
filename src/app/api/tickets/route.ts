import {ticketService} from "@/services/ticket.service";
import {NextRequest, NextResponse} from "next/server";
import catchError, {HttpError} from "http-errors";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {ticketCreateSchema} from "@/shared/ticket.validation";

export async function GET(){
    try {
        //----> Fetch all tickets.
        const response = await ticketService.getAllTicket();

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }
}

export async function POST(request: NextRequest){
    try {
        //----> Extract the ticket payload from request.
        const ticket = validateWithZodSchema(ticketCreateSchema, await request.json());

        //----> Insert the new ticket in db.
        const response = await ticketService.createTicket(ticket);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }
}