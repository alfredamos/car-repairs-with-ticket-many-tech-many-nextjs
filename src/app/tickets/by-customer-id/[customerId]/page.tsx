import {getTicketsByCustomerId} from "@/app/actions/ticket.action";
import TicketTable from "@/components/tickets/TicketTable";

export default async function TicketsByCustomerIdPage({params}:{params: Promise<{customerId: string}>}){
    //----> Get the customerId from URL.
    const {customerId} = await params;

    //----> Get tickets by customerId.
    const tickets = await getTicketsByCustomerId(customerId);

    return (
        <TicketTable tickets={tickets}/>
    );
}