import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";
import {getTechByUserId} from "@/app/actions/tech.action";
import {getAssignedTicketsByTechId} from "@/app/actions/assign-ticket.action";
import {useAuth} from "@/hooks/useAuth";

export default async function AssignedTicketByUserIdPage({params}:{ params:Promise<{userId:string}>}){
    //----> Fetch user id from params.
    const {userId} = await params;

    //----> Get the user session.
    const {isOwnerOrAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isOwnerOrAdmin(userId)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an owner or an admin to view this page!</h1></div>
    }

    //----> Fetch the tech by user id.
    const tech = await getTechByUserId(userId);

    //----> Fetch assigned tickets by tech id.
    const tickets = await getAssignedTicketsByTechId(tech.id);

    return (
        <AssignedTicketTable tickets={tickets}/>
    );
}