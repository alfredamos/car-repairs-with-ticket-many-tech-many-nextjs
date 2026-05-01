import {getAssignedTicketsByTechId} from "@/app/actions/assign-ticket.action";
import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";

export default async function AssignedTicketsByTechIdPage({params}:{params:Promise<{techId:string}>}){
    //----> Fetch tech id from params.
    const {techId} = await params;

    //----> Fetch assigned tickets by tech id.
    const tickets = await getAssignedTicketsByTechId(techId);
    return (
        <AssignedTicketTable tickets={tickets}/>
    );
}