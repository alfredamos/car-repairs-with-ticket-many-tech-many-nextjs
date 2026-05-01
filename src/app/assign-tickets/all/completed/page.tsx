import {getCompletedAssignedTickets} from "@/app/actions/assign-ticket.action";
import AssignedTicketTable from "@/components/assignedTickets/AssignedTicketTable";
import {useAuth} from "@/hooks/useAuth";

export default async function AssignedCompletedTicketsPage(){
    //----> Get the user session.
    const {isAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to view this page!</h1></div>
    }

    //----> Fetch completed assigned tickets.
    const tickets = await getCompletedAssignedTickets();

    return (
        <AssignedTicketTable tickets={tickets}/>
    );
}