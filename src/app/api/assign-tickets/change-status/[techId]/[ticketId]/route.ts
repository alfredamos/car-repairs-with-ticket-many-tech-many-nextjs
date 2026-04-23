import {NextRequest, NextResponse} from "next/server";
import {assignedTicketService} from "@/services/assignedTicket.service";
import catchError, {HttpError} from "http-errors";

export async function PATCH(_request: NextRequest, {params}: {params: Promise<{techId: string; ticketId: string}>}){
    try {
        //----> Extract techId and ticketId from params.
        const {techId, ticketId} = await params;

        //----> Change the status of the assigned ticket with techId and ticketId.
        const response = await assignedTicketService.changeStatus(techId, ticketId);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}