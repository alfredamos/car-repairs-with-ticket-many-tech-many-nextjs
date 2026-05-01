import {getTicketById} from "@/app/actions/ticket.action";
import {TicketCard} from "@/components/tickets/TicketCard";

export default async function TicketDetailPage({params}:{params:Promise<{id:string}>}){
    //----> Get the ticket id from the params.
    const {id} = await params;

    //----> Fetch the ticket from the database.
    const ticket = await getTicketById(id);
    return (
        <TicketCard ticket={ticket}/>
    );
}