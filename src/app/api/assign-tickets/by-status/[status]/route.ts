import {NextRequest, NextResponse} from "next/server";
import {assignedTicketService} from "@/services/assignedTicket.service";
import {Status} from "@/generated/prisma/enums";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}:{params: Promise<{status: string}>}){
    try {
        //----> Get the status from params.
        const {status} = await params;
        const ticketStatus = status as Status;

        //----> Fetch all incompleted tickets.
        const response = await assignedTicketService.getAssignedTicketsByStatus(ticketStatus);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}