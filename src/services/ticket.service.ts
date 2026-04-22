import {TicketUncheckedCreateInput, TicketUncheckedUpdateInput} from "@/generated/prisma/models";
import {ITicketService} from "@/services/ITicket.service";
import {TicketResponse, toTicketResponse} from "@/types/ticketResponse.model";
import {prisma} from "@/app/db/prisma.db";
import {TicketWithCustomer} from "@/types/ticketWithCustomer";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

class TicketService implements ITicketService {
    async createTicket(request: TicketUncheckedCreateInput): Promise<TicketResponse> {
        //----> Insert the new ticket.
        const ticket = await prisma.ticket.create({data: {...request}, include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return toTicketResponse(ticket as TicketWithCustomer);
    }

    async deleteTicketById(id: string): Promise<TicketResponse> {
        //----> Check for existence of ticket.
        await this.getOneTicket(id);

        //----> Delete the ticket with the giving id.
        const deletedTicket = await prisma.ticket.delete({where: {id}, include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return toTicketResponse(deletedTicket as TicketWithCustomer);
    }

    async editTicketById(id: string, request: TicketUncheckedUpdateInput): Promise<TicketResponse> {
        //----> Check for existence of ticket.
        await this.getOneTicket(id);

        //----> Edit ticket with the giving id.
        const editedTicket = await prisma.ticket.update({where: {id}, data: {...request}, include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return toTicketResponse(editedTicket as TicketWithCustomer);
    }

    async getTicketById(id: string): Promise<TicketResponse> {
        //----> Check for existence of ticket.
        const ticket = await this.getOneTicket(id);

        //----> Send back response.
        return toTicketResponse(ticket as TicketWithCustomer);
    }

    async getAllTicket(): Promise<TicketResponse[]> {
        //----> Fetch all tickets.
        const tickets = await prisma.ticket.findMany({include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return tickets?.map(ticket => toTicketResponse(ticket as TicketWithCustomer));
    }

    async getTicketsByCustomerId(customerId: string): Promise<TicketResponse[]> {
        //----> Fetch all tickets.
        const tickets = await prisma.ticket.findMany({where: {customerId}, include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return tickets?.map(ticket => toTicketResponse(ticket as TicketWithCustomer));
    }

    private async getOneTicket(id: string){
        //----> Fetch ticket with the given id.
        const ticket = await prisma.ticket.findUnique({where: {id} , include: {customer: {include: {user: true}}}});

        //----> Check for null ticket.
        if (!ticket) catchError(StatusCodes.NOT_FOUND, "Ticket not found in db!");

        //----> Send back response.
        return ticket;
    }
}

export const ticketService = new TicketService() as ITicketService;