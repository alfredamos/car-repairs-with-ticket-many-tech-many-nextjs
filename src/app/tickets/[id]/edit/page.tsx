import {getTicketById} from "@/app/actions/ticket.action";
import {TicketEdit} from "@/shared/ticket.validation";
import {TicketEditCard} from "@/components/tickets/TicketEditCard";

export default async function TechEditPage({params}:{params:Promise<{id:string}>}){
    //----> Get the ticket id from the params.
    const {id} = await params;

    //----> Fetch the ticket from the database.
    const ticket = await getTicketById(id);

    //----> Make defaultValues.
    const defaultValues: TicketEdit = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        customerId: ticket.customerId
    }

    return (
        <TicketEditCard defaultValues={defaultValues}/>
    );
}