import {getCompletedAssignedTickets} from "@/app/actions/assign-ticket.action";
import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";

export default async function AssignedCompletedTicketsPage(){
    //----> Fetch completed assigned tickets.
    const tickets = await getCompletedAssignedTickets();

    return (
        <AssignedTicketTable tickets={tickets}/>
    );
}