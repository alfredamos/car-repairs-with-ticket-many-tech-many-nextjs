import {NextRequest, NextResponse} from "next/server";
import {assignedTicketService} from "@/services/assignedTicket.service";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {
    assignedTicketCreateSchema,
} from "@/shared/assignedTicket.validation";
import {authService} from "@/services/authService.service";
import {
    AssignedTicketUncheckedCreateInput,
} from "@/generated/prisma/models/AssignedTicket";
import catchError, {HttpError} from "http-errors";

export async function GET(){
    try {
        //----> Fetch all assigned tickets.
        const response = await assignedTicketService.getAllAssignedTickets();

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}

export async function POST(request: NextRequest){
    try {
        //----> Get the request payload.
        const assignedTicketToCreate = validateWithZodSchema(assignedTicketCreateSchema, await request.json());

        //----> Get user session.
        const session = await authService.getUserSession();
        const ticketToPost: AssignedTicketUncheckedCreateInput = {...assignedTicketToCreate, assignBy: session.name};

        //----> Create new assigned ticket.
        const response = await assignedTicketService.createAssignedTicket(ticketToPost);

        //----> Send back response.
        return NextResponse.json(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message)
    }

}