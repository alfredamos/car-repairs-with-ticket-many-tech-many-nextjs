import {getCustomerByUserId} from "@/app/actions/customer.action";
import {getTicketsByCustomerId} from "@/app/actions/ticket.action";
import TicketTable from "@/components/tickets/TicketTable";

export default async function TicketsByUserIdPage({params}:{params: Promise<{userId: string}>}){
    //----> Get the user id from URL.
    const {userId} = await params;

    //----> Fetch the customer corresponding to the giving user id.
    const customer = await getCustomerByUserId(userId);

    //----> Fetch all tickets associated with this customer.
    const tickets = await getTicketsByCustomerId(customer.id)

    return (
        <TicketTable tickets={tickets}/>
    );
}