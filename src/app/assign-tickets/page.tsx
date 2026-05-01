import {getAllAssignedTickets} from "@/app/actions/assign-ticket.action";
import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";

export default async function AssignedTicketListPage(){
    //----> Fetch all assigned tickets.
    const tickets = await getAllAssignedTickets();

    return (
        <AssignedTicketTable tickets={tickets}/>
    );
}