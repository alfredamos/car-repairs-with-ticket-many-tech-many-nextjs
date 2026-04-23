import { Status } from "@/generated/prisma/enums";
import { AssignedTicketUncheckedCreateInput, AssignedTicketUncheckedUpdateInput } from "@/generated/prisma/models";
import {IAssignedTicketService} from "@/services/IAssignedTicket.service";
import {
    AssignedTicketRequest,
    AssignedTicketResponse,
    toAssignedTicketResponse
} from "@/types/assignedTicketResponse.model";
import {prisma} from "@/app/db/prisma.db";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

class AssignedTicketService implements IAssignedTicketService {
    async createAssignedTicket(request: AssignedTicketUncheckedCreateInput): Promise<AssignedTicketResponse> {
        //----> Insert the assigned ticket in db.
        const newTicket = await prisma.assignedTicket.create({data: {...request}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return toAssignedTicketResponse(newTicket as AssignedTicketRequest)
    }

    async changeStatus(techId: string, ticketId: string): Promise<AssignedTicketResponse> {
        //----> Fetch the assigned ticket with the giving techId and ticketId.
        const assignedTicket = await this.getOneAssignedTicket(techId, ticketId);

        //----> Change the job status.
        const completed = !assignedTicket.completed;
        const status = assignedTicket.completed ? Status.Closed : Status.Open;

        //----> Update the assigned ticket.
        const updatedAssignedTicket = await prisma.assignedTicket.update({where: {techId_ticketId: {techId, ticketId}}, data: {...assignedTicket, completed, status}});

        //----> Send back response.
        return toAssignedTicketResponse(updatedAssignedTicket as AssignedTicketRequest);
    }

    async deleteAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse> {
        //----> Check for existence of assigned ticket.
        await this.getOneAssignedTicket(techId, ticketId);

        //----> Delete the assigned ticket with the giving ids techId and ticketId.
        const deletedAssignedTicket = await prisma.assignedTicket.delete({where: {techId_ticketId: {techId, ticketId}}});

        //----> Send back response.
        return toAssignedTicketResponse(deletedAssignedTicket as AssignedTicketRequest);
    }

    async editAssignedTicketById(techId: string, ticketId: string, request: AssignedTicketUncheckedUpdateInput): Promise<AssignedTicketResponse> {
        //----> Check for existence of assigned ticket.
        await this.getOneAssignedTicket(techId, ticketId);

        //----> Edit the assigned ticket.
        const editedAssignedTicket = await prisma.assignedTicket.update({where: {techId_ticketId: {techId, ticketId}}, data: {...request}});

        //----> Send back response.
        return toAssignedTicketResponse(editedAssignedTicket as AssignedTicketRequest);
    }

    async getAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse> {
        //----> Fetch the assigned ticket with giving ids, techId and ticketId.
        const response = await this.getOneAssignedTicket(techId, ticketId);

        //----> Send back response.
        return toAssignedTicketResponse(response as AssignedTicketRequest);
    }

    async getAllAssignedTickets(): Promise<AssignedTicketResponse[]> {
        //----> Fetch all assigned tickets.
        const assignedTickets = await prisma.assignedTicket.findMany({});

        //----> Send back response.
        return assignedTickets?.map(ticket => toAssignedTicketResponse(ticket as AssignedTicketRequest));
    }

    async getAssignedTicketsByTechId(techId: string): Promise<AssignedTicketResponse[]> {
        //----> Fetch assigned tickets by techId.
        const assignedTickets = await prisma.assignedTicket.findMany({where: {techId}});

        //----> Send back response.
        return assignedTickets?.map(ticket => toAssignedTicketResponse(ticket as AssignedTicketRequest));

    }

    async getAssignedTicketsByTicketId(ticketId: string): Promise<AssignedTicketResponse[]> {
        //----> Fetch assigned tickets by ticketId.
        const assignedTickets = await prisma.assignedTicket.findMany({where: {ticketId}});

        //----> Send back response.
        return assignedTickets?.map(ticket => toAssignedTicketResponse(ticket as AssignedTicketRequest));
    }

    async getAssignedTicketsByStatus(status: Status): Promise<AssignedTicketResponse[]> {
        //----> Fetch all assigned tickets.
        const assignedTickets = await prisma.assignedTicket.findMany({where: {status}});

        //----> Send back response.
        return assignedTickets?.map(ticket => toAssignedTicketResponse(ticket as AssignedTicketRequest));
    }

    private async getOneAssignedTicket(techId: string, ticketId: string){
        //----> Fetch the assigned ticket.
        const assignedTicket = await prisma.assignedTicket.findUnique({where: {techId_ticketId: {ticketId, techId}}});

        //----> Check for null assigned ticket.
        if (!assignedTicket) throw catchError(StatusCodes.NOT_FOUND, "Assigned ticket is not found in db!");

        //----> Send back response.
        return assignedTicket;
    }
}

export const assignedTicketService = new AssignedTicketService() as IAssignedTicketService;