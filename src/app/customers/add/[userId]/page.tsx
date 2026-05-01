import {CustomerCreate} from "@/shared/customer.validation";
import {CustomerAfterUserCreateCard} from "@/components/customers/CustomerAfterUserCreateCard";

export default async function AddCustomerAfterUserPage({params}: {params: Promise<{userId: string}>}) {
    //----> Get user id from params.
    const {userId} = await params;

    //----> Make default values for the form.
    const defaultValues: CustomerCreate = {
        address: "",
        notes: "",
        userId
    }

    return (
       <CustomerAfterUserCreateCard defaultValues={defaultValues}/>
    )
}