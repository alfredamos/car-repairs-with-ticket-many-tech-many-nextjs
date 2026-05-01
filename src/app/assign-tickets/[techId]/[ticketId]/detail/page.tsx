import {getAssignedTicketById} from "@/app/actions/assign-ticket.action";
import {AssignedTicketCard} from "@/components/assignedTickets/AssignedTicketCard";
import {authService} from "@/services/authService.service";

export default async function AssignedTicketDetailPage({params}: {params:Promise<{techId:string, ticketId:string}>}){
    //----> Fetch tech id and ticket id from params.
    const {techId, ticketId} = await params;

    //----> Get the user session..
    const session = await authService.getUserSession();

    if(!session) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must login to view the ticket detail!</h1></div>
    }

    //----> Fetch assigned ticket by tech id and ticket id.
    const ticket = await getAssignedTicketById(techId, ticketId);
    return (
        <AssignedTicketCard isAdmin={session.isAdmin} ticket={ticket}/>
    );
}