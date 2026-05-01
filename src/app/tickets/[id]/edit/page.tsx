import {getTicketById} from "@/app/actions/ticket.action";
import {TicketEdit} from "@/shared/ticket.validation";
import {TicketEditCard} from "@/components/tickets/TicketEditCard";
import {useAuth} from "@/hooks/useAuth";

export default async function TechEditPage({params}:{params:Promise<{id:string}>}){
    //----> Get the user session.
    const {isAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to view this page!</h1></div>
    }

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