import {NextRequest, NextResponse} from "next/server";
import {assignedTicketService} from "@/services/assignedTicket.service";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}: {params: Promise<{ticketId: string;}>}){
    try {
        //----> Extract ticketId from params.
        const {ticketId} = await params;

        //----> Fetch the assigned ticket with techId.
        const response = await assignedTicketService.getAssignedTicketsByTicketId(ticketId);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}