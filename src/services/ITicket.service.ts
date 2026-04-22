import {TicketUncheckedCreateInput, TicketUncheckedUpdateInput} from "@/generated/prisma/models/Ticket";
import {TicketResponse} from "@/types/ticketResponse.model";

export interface ITicketService{
    createTicket(request: TicketUncheckedCreateInput): Promise<TicketResponse>;
    deleteTicketById(id: string): Promise<TicketResponse>;
    editTicketById(id: string, request: TicketUncheckedUpdateInput): Promise<TicketResponse>;
    getTicketById(id: string): Promise<TicketResponse>;
    getAllTicket(): Promise<TicketResponse[]>;
    getTicketsByCustomerId(customerId: string): Promise<TicketResponse[]>;
}