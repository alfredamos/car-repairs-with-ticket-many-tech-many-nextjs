import {getCustomerByUserId} from "@/app/actions/customer.action";
import {getTicketsByCustomerId} from "@/app/actions/ticket.action";
import TicketTable from "@/components/tickets/TicketTable";
import {useAuth} from "@/hooks/useAuth";

export default async function TicketsByUserIdPage({params}:{params: Promise<{userId: string}>}){
    //----> Get the user id from URL.
    const {userId} = await params;

    //----> Get the user session.
    const {isOwnerOrAdmin, hasAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isOwnerOrAdmin(userId)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin or owner to view this page!</h1></div>
    }

    //----> Fetch the customer corresponding to the giving user id.
    const customer = await getCustomerByUserId(userId);

    //----> Fetch all tickets associated with this customer.
    const tickets = await getTicketsByCustomerId(customer.id)

    return (
        <TicketTable tickets={tickets} isAdmin={hasAdmin}/>
    );
}