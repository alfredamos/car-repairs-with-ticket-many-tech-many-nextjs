import {TicketCreate} from "@/shared/ticket.validation";
import {TicketCreateCard} from "@/components/tickets/TicketCreateCard";
import {getAllCustomers} from "@/app/actions/customer.action";

export default async function AddTicketPage(){
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