import {NextResponse} from "next/server";
import {assignedTicketService} from "@/services/assignedTicket.service";
import catchError, {HttpError} from "http-errors";

export async function GET(){
    try {
        //----> Fetch all incompleted tickets.
        const response = await assignedTicketService.getIncompletedAssignedTickets();

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}