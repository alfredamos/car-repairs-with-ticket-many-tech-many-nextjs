import {getAssignedTicketById} from "@/app/actions/assign-ticket.action";
import {AssignedTicketEdit} from "@/shared/assignedTicket.validation";
import {AssignedTicketEditCard} from "@/components/assignedTickets/AssignedTicketEditCard";

export default async function AssignedTicketEditPage({params}: { params:Promise<{techId:string, ticketId:string}>}){
    //----> Fetch tech id and ticket id from params.
    const {techId, ticketId} = await params;

    //----> Fetch assigned ticket by tech id and ticket id.
    const ticket = await getAssignedTicketById(techId, ticketId);

    //----> Make default values for the form.
    const defaultValues: AssignedTicketEdit = {
        techId: ticket.techId,
        ticketId: ticket.ticketId,
        status: ticket.status,
        assignBy: ticket.assignBy,
        completed: ticket.completed,
    }

    return (
        <AssignedTicketEditCard defaultValues={defaultValues}/>
    );
}