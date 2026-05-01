import {getAllTickets} from "@/app/actions/ticket.action";
import TicketTable from "@/components/tickets/TicketTable";

export default async function TicketListPage(){
    //----> Fetch tickets from the API route.
    const tickets = await getAllTickets();

    return (
        <TicketTable tickets={tickets}/>
    );
}