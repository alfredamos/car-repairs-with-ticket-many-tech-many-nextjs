import {AssignedTicketCreateCard} from "@/components/assignedTickets/AssignedTicketCreateCard";
import {getAllTechs} from "@/app/actions/tech.action";
import {getAllTickets} from "@/app/actions/ticket.action";
import {AssignedTicketCreate} from "@/shared/assignedTicket.validation";
import {useAuth} from "@/hooks/useAuth";

export default async function AddAssignedTicketPage(){
    //----> Get the user session.
    const {isAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to create a new ticket!</h1></div>
    }

    //----> Fetch all technicians and tickets.
    const techs = await getAllTechs();
    const tickets = await getAllTickets();

    //----> Make default values for the form.
    const defaultValues: AssignedTicketCreate = {
        ticketId: "",
        techId: "",
    }

    return (
        <AssignedTicketCreateCard defaultValues={defaultValues} tickets={tickets} techs={techs}/>
    );
}