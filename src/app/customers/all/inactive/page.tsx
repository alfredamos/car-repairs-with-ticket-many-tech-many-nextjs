import {getInactiveCustomers} from "@/app/actions/customer.action";
import {CustomerTable} from "@/components/customers/CustomerTable";

export default async function InactiveCustomersPage(){
    //----> Fetch customers from database.
    const customers = await getInactiveCustomers();

    return (
        <CustomerTable customers={customers}/>
    );
}