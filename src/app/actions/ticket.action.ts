"use server"

import {TicketCreate, TicketEdit} from "@/shared/ticket.validation";
import {ticketService} from "@/services/ticket.service";

export async function createTicket(ticket: TicketCreate){
    try {
        //----> Create new ticket.
        return await ticketService.createTicket(ticket);

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function deleteTicketById(id: string){
    try {
        //----> Delete ticket by id.
        return await ticketService.deleteTicketById(id);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function editTicketById(id: string, ticket: TicketEdit){
    try {
        //----> Edit ticket by id.
        return await ticketService.editTicketById(id, ticket);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getTicketById(id: string){
    try {
        //----> Fetch ticket by id.
        return await ticketService.getTicketById(id);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAllTickets(){
    try {
        //----> Fetch all tickets.
        return await ticketService.getAllTicket();
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getTicketsByCustomerId(customerId: string){
    try {
        //----> Fetch tickets by customer id.
        return await ticketService.getTicketsByCustomerId(customerId);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}