import {getAssignedTicketsByTechId} from "@/app/actions/assign-ticket.action";
import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";
import {useAuth} from "@/hooks/useAuth";

export default async function AssignedTicketsByTechIdPage({params}:{params:Promise<{techId:string}>}){
    //----> Get the user session.
    const {isAuthenticated} = await useAuth();

    //----> Check if the user is an admin.
    if (!isAuthenticated()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must login to view this page!</h1></div>
    }

    //----> Fetch tech id from params.
    const {techId} = await params;

    //----> Fetch assigned tickets by tech id.
    const tickets = await getAssignedTicketsByTechId(techId);
    return (
        <AssignedTicketTable tickets={tickets}/>
    );
}