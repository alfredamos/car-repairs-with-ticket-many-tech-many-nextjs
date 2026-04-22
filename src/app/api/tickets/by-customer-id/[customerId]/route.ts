import {NextRequest, NextResponse} from "next/server";
import {ticketService} from "@/services/ticket.service";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}: {params: Promise<{customerId: string}>}){
    try {
        //----> Extract the id from params.
        const {customerId} = await params;

        //----> Fetch the tickets with the giving customer id.
        const response = await ticketService.getTicketsByCustomerId(customerId);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }
}