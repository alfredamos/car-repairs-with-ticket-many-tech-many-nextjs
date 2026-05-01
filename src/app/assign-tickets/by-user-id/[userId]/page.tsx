import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";
import {getTechByUserId} from "@/app/actions/tech.action";
import {getAssignedTicketsByTechId} from "@/app/actions/assign-ticket.action";

export default async function AssignedTicketByUserIdPage({params}:{ params:Promise<{userId:string}>}){
    //----> Fetch user id from params.
    const {userId} = await params;

    //----> Fetch the tech by user id.
    const tech = await getTechByUserId(userId);

    //----> Fetch assigned tickets by tech id.
    const tickets = await getAssignedTicketsByTechId(tech.id);

    return (
        <AssignedTicketTable tickets={tickets}/>
    );
}