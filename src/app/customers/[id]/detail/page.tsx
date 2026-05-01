import {getCustomerById} from "@/app/actions/customer.action";
import {CustomerCard} from "@/components/customers/CustomerCard";
import {useAuth} from "@/hooks/useAuth";

export default async function CustomerDetailPage({params}:{params:Promise<{id:string}>}){
    //----> Get the customer id from the params.
    const {id} = await params;

    //----> Fetch the customer from the database.
    const customer = await getCustomerById(id);

    //----> Get the user session.
    const {isOwnerOrAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isOwnerOrAdmin(customer.userId)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an owner or admin to view the ticket detail!</h1></div>
    }
    
    return (
        <CustomerCard customer={customer}/>
    );
}