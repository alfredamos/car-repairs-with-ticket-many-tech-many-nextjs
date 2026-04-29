import {getCustomerById} from "@/app/actions/customer.action";
import {CustomerCard} from "@/components/customers/CustomerCard";

export default async function CustomerDetailPage({params}:{params:Promise<{id:string}>}){
    //----> Get the customer id from the params.
    const {id} = await params;

    //----> Fetch the customer from the database.
    const customer = await getCustomerById(id);
    
    return (
        <CustomerCard customer={customer}/>
    );
}