import {getCustomerById} from "@/app/actions/customer.action";
import {CustomerEditCard} from "@/components/customers/CustomerEditCard";
import {CustomerEdit} from "@/shared/customer.validation";
import {useAuth} from "@/hooks/useAuth";

export default async function CustomerEditPage({params}:{params: Promise<{id: string}>}){
    //----> Get customer id from params.
    const {id} = await params;

    //----> Fetch customer from database.
    const customer = await getCustomerById(id);

    //----> Get the user session.
    const {isOwnerOrAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isOwnerOrAdmin(customer.userId)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an owner or admin to view the ticket detail!</h1></div>
    }

    //----> Get the default values from the customer.
    const defaultValues: CustomerEdit = {
        id: customer?.id,
        address: customer?.address,
        active: customer?.active,
        notes: customer?.notes as string,
        userId: customer?.userId
    };

    console.log("customer-edit-page, defaultValues : ", defaultValues);
    console.log("customer-edit-page, customer : ", customer);

    return (
        <CustomerEditCard defaultValues={defaultValues}/>
    );
}