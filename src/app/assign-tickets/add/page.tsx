import {AssignedTicketCreateCard} from "@/components/assignedTickets/AssignedTicketCreateCard";
import {getAllTechs} from "@/app/actions/tech.action";
import {getAllTickets} from "@/app/actions/ticket.action";
import {AssignedTicketCreate} from "@/shared/assignedTicket.validation";

export default async function AddAssignedTicketPage(){
    //----> Fetch all technicians and tickets.
    const techs = await getAllTechs();
    const tickets = await getAllTickets();

    //----> Make default values for the form.
    const defaultValues: AssignedTicketCreate = {
        ticketId: "",
        techId: "",
    }

    return (
        <AssignedTicketCreateCard defaultValues={defaultValues} tickets={tickets} techs={techs}/>
    );
}