import {Status} from "~/generated/prisma/enums";

export class TicketResp {
    id: string = "";
    title: string = "";
    notes: string = "";
    completed: boolean = false;
    status: Status = Status.Open;
    createdAt: Date = new Date();
    techEmail: string = "";
    customerName: string = "";
    customerImage: string = "";
    customerEmail: string = "";
    customerPhone: string = "";
    customerId: string = "";
}

