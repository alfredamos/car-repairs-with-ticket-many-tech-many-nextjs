import type {TicketEdit} from "#shared/ticket.validation";

export const emptyTicketEdit: TicketEdit = {
    id: "",
    title: "",
    notes: "",
    tech: "",
    customerId: "",
    completed: false,
}