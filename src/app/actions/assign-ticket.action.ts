"use server"

import {AssignedTicketCreate, AssignedTicketEdit} from "@/shared/assignedTicket.validation";
import {assignedTicketService} from "@/services/assignedTicket.service";
import {Status} from "@/generated/prisma/enums";
import {AssignedTicketUncheckedCreateInput} from "@/generated/prisma/models/AssignedTicket";

export async function changeAssignedTicketStatus(techId: string, ticketId: string){
    try {
        //----> Change the assigned ticket status.
        return await assignedTicketService.changeStatus(techId, ticketId);

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function createAssignedTicket(request: AssignedTicketCreate){
    try {
        //----> Insert new assigned-ticket in db.
        return await assignedTicketService.createAssignedTicket(request as unknown as AssignedTicketUncheckedCreateInput);

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function deleteAssignedTicketById(techId: string, ticketId: string){
    try {
        //----> Delete assigned-ticket with giving techId and ticketId.
        return await assignedTicketService.deleteAssignedTicketById(techId, ticketId);

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function editAssignedTicketById(techId: string, ticketId: string, request: AssignedTicketEdit){
    try {
        //----> Edit assigned-ticket with giving techId and ticketId.
        return await assignedTicketService.editAssignedTicketById(techId, ticketId, request);

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAssignedTicketById(techId: string, ticketId: string){
    try {
        //----> Fetch assigned-ticket with giving techId and ticketId.
        return await assignedTicketService.getAssignedTicketById(techId, ticketId);

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAllAssignedTickets(){
    try {
        //----> Fetch all assigned tickets.
        return await assignedTicketService.getAllAssignedTickets()
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAssignedTicketsByStatus(status: Status){
    try {
        //----> Fetch assigned tickets by status.
        return await assignedTicketService.getAssignedTicketsByStatus(status)
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAssignedTicketsByTechId(techId: string){
    try {
        //----> Fetch assigned tickets by techId.
        return await assignedTicketService.getAssignedTicketsByTechId(techId);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAssignedTicketsByTicketId(ticketId: string){
    try {
        //----> Fetch assigned tickets by ticketId.
        return await assignedTicketService.getAssignedTicketsByTicketId(ticketId)
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getCompletedAssignedTickets(){
    try {
        //----> Fetch completed assigned tickets.
        return await assignedTicketService.getCompletedAssignedTickets()
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getIncompletedAssignedTickets(){
    try {
        //----> Fetch incompleted assigned tickets.
        return await assignedTicketService.getIncompletedAssignedTickets()
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}