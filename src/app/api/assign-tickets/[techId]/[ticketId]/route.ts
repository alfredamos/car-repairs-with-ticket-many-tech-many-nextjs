import {NextRequest, NextResponse} from "next/server";
import {assignedTicketService} from "@/services/assignedTicket.service";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {assignedTicketEditSchema} from "@/shared/assignedTicket.validation";
import catchError, {HttpError} from "http-errors"

export async function DELETE(_request: NextRequest, {params}: {params: Promise<{techId: string; ticketId: string}>}){
    try {
        //----> Extract techId and ticketId from params.
        const {techId, ticketId} = await params;

        //----> Delete the assigned ticket with techId and ticketId.
        const response = await assignedTicketService.deleteAssignedTicketById(techId, ticketId);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}

export async function GET(_request: NextRequest, {params}: {params: Promise<{techId: string; ticketId: string}>}) {
    try {
        //----> Extract techId and ticketId from params.
        const {techId, ticketId} = await params;

        //----> Fetch the assigned ticket with techId and ticketId.
        const response = await assignedTicketService.getAssignedTicketById(techId, ticketId);

        //----> Send back response.
        return NextResponse.json(response);
    } catch (err) {
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }
}


export async function PATCH(request: NextRequest, {params}: {params: Promise<{techId: string; ticketId: string}>}){
    try {
        //----> Extract techId and ticketId from params.
        const {techId, ticketId} = await params;

        //----> Get the request payload.
        const assignedTicketToEdit = validateWithZodSchema(assignedTicketEditSchema, await request.json());

        //----> Edit the assigned ticket with techId and ticketId.
        const response = await assignedTicketService.editAssignedTicketById(techId, ticketId, assignedTicketToEdit);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}