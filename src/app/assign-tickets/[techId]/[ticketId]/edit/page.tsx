import {getAssignedTicketById} from "@/app/actions/assign-ticket.action";
import {AssignedTicketEdit} from "@/shared/assignedTicket.validation";
import {AssignedTicketEditCard} from "@/components/assignedTickets/AssignedTicketEditCard";
import {useAuth} from "@/hooks/useAuth";

export default async function AssignedTicketEditPage({params}: { params:Promise<{techId:string, ticketId:string}>}){
    //----> Get the user session.
    const {isAuthenticated} = await useAuth();

    //----> Check if the user is an admin.
    if (!isAuthenticated()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must login to perform this action!</h1></div>
    }

    //----> Fetch tech id and ticket id from params.
    const {techId, ticketId} = await params;

    //----> Fetch assigned ticket by tech id and ticket id.
    const ticket = await getAssignedTicketById(techId, ticketId);

    //----> Make default values for the form.
    const defaultValues: AssignedTicketEdit = {
        techId: ticket.techId,
        ticketId: ticket.ticketId,
        status: ticket.status,
        assignBy: ticket.assignBy,
        completed: ticket.completed,
    }

    return (
        <AssignedTicketEditCard defaultValues={defaultValues}/>
    );
}