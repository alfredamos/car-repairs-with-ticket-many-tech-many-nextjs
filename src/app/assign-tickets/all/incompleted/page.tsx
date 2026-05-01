import {getIncompletedAssignedTickets} from "@/app/actions/assign-ticket.action";
import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";

export default async function IncompletedAssignedTicketsPage(){
    //----> Fetch incomplete assigned tickets.
    const tickets = await getIncompletedAssignedTickets();

    return (
       <AssignedTicketTable tickets={tickets}/>
    );
}