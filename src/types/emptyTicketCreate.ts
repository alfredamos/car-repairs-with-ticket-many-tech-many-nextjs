import type {TicketCreate} from "#shared/ticket.validation";

export const emptyTicketCreate: TicketCreate = {
    title: "",
    notes: "",
    tech: "",
    customerId: "",
    completed: false,
}