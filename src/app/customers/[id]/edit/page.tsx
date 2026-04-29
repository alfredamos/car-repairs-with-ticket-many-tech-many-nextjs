import {getCustomerById} from "@/app/actions/customer.action";
import {CustomerEditCard} from "@/components/customers/CustomerEditCard";
import {CustomerEdit} from "@/shared/customer.validation";

export default async function CustomerEditPage({params}:{params: Promise<{id: string}>}){
    //----> Get customer id from params.
    const {id} = await params;

    //----> Fetch customer from database.
    const customer = await getCustomerById(id);

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