import {
    AssignedTicketUncheckedCreateInput,
    AssignedTicketUncheckedUpdateInput
} from "@/generated/prisma/models/AssignedTicket";
import {AssignedTicketResponse} from "@/types/assignedTicketResponse.model";
import {Status} from "@/generated/prisma/enums";

export interface IAssignedTicketService{
    createAssignedTicket(request: AssignedTicketUncheckedCreateInput): Promise<AssignedTicketResponse>;
    changeStatus(techId: string, ticketId: string): Promise<AssignedTicketResponse>;
    deleteAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse>;
    editAssignedTicketById(techId: string, ticketId: string, request: AssignedTicketUncheckedUpdateInput): Promise<AssignedTicketResponse>;
    getAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse>;
    getAllAssignedTickets(): Promise<AssignedTicketResponse[]>;
    getAssignedTicketsByTechId(techId: string): Promise<AssignedTicketResponse[]>;
    getAssignedTicketsByTicketId(ticketId: string): Promise<AssignedTicketResponse[]>;
    getAssignedTicketsByStatus(status: Status): Promise<AssignedTicketResponse[]>;
    getCompletedAssignedTickets(): Promise<AssignedTicketResponse[]>;
    getIncompletedAssignedTickets(): Promise<AssignedTicketResponse[]>;
}