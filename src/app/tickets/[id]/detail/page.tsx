import {getTicketById} from "@/app/actions/ticket.action";
import {TicketCard} from "@/components/tickets/TicketCard";
import {useAuth} from "@/hooks/useAuth";

export default async function TicketDetailPage({params}:{params:Promise<{id:string}>}){
    //----> Get the user session.
    const {isAuthenticated, hasAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isAuthenticated()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must login to view this page!</h1></div>
    }

    //----> Get the ticket id from the params.
    const {id} = await params;

    //----> Fetch the ticket from the database.
    const ticket = await getTicketById(id);
    return (
        <TicketCard ticket={ticket} isAdmin={hasAdmin}/>
    );
}