import {TicketCreate} from "@/shared/ticket.validation";
import {TicketCreateCard} from "@/components/tickets/TicketCreateCard";
import {getAllCustomers} from "@/app/actions/customer.action";
import {useAuth} from "@/hooks/useAuth";

export default async function AddTicketPage(){
    //----> Get the user session.
    const {isAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to view this page!</h1></div>
    }

    //----> Fetch customers.
    const customers = await getAllCustomers();

    //----> Make defaultValues.
    const defaultValues: TicketCreate = {
        title: "",
        description: "",
        customerId: ""
    };

    return (
        <TicketCreateCard defaultValues={defaultValues} customers={customers}/>
    );
}