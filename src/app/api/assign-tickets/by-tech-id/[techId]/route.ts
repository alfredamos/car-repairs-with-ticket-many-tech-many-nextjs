import {NextRequest, NextResponse} from "next/server";
import {assignedTicketService} from "@/services/assignedTicket.service";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}: {params: Promise<{techId: string;}>}){
    try {
        //----> Extract techId from params.
        const {techId} = await params;

        //----> Fetch the assigned ticket with techId.
        const response = await assignedTicketService.getAssignedTicketsByTechId(techId);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}