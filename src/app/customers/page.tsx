import {getAllCustomers} from "@/app/actions/customer.action";
import {CustomerTable} from "@/components/customers/CustomerTable";

export default async function CustomerListPages(){
    //----> Fetch customers from database.
    const customers = await getAllCustomers();

    return (
        <CustomerTable customers={customers}/>
    );
}