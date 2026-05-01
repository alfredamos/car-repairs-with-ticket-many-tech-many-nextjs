import {getAssignedTicketById} from "@/app/actions/assign-ticket.action";
import {AssignedTicketCard} from "@/components/assignedTickets/AssignedTicketCard";
import {authService} from "@/services/authService.service";
import {useAuth} from "@/hooks/useAuth";

export default async function AssignedTicketDetailPage({params}: {params:Promise<{techId:string, ticketId:string}>}){
    //----> Get the user session.
    const {isAuthenticated, hasAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isAuthenticated()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must login to view the ticket detail!</h1></div>
    }

    //----> Fetch tech id and ticket id from params.
    const {techId, ticketId} = await params;

    //----> Fetch assigned ticket by tech id and ticket id.
    const ticket = await getAssignedTicketById(techId, ticketId);
    return (
        <AssignedTicketCard isAdmin={hasAdmin} ticket={ticket}/>
    );
}