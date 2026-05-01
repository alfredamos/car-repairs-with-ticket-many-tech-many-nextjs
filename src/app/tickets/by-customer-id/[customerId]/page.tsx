import {getTicketsByCustomerId} from "@/app/actions/ticket.action";
import TicketTable from "@/components/tickets/TicketTable";
import {useAuth} from "@/hooks/useAuth";

export default async function TicketsByCustomerIdPage({params}:{params: Promise<{customerId: string}>}){
    //----> Get the user session.
    const {isAdmin, hasAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to view this page!</h1></div>
    }

    //----> Get the customerId from URL.
    const {customerId} = await params;

    //----> Get tickets by customerId.
    const tickets = await getTicketsByCustomerId(customerId);

    return (
        <TicketTable tickets={tickets} isAdmin={hasAdmin}/>
    );
}