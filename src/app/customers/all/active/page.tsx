import {getActiveCustomers} from "@/app/actions/customer.action";
import {CustomerTable} from "@/components/customers/CustomerTable";

export default async function ActiveCustomersPage(){
    //----> Fetch active customers from database.
    const customers = await getActiveCustomers();

    return (
        <CustomerTable customers={customers}/>
    );
}