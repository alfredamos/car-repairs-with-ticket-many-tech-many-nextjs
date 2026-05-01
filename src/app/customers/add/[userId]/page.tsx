import {CustomerCreate} from "@/shared/customer.validation";
import {CustomerAfterUserCreateCard} from "@/components/customers/CustomerAfterUserCreateCard";
import {useAuth} from "@/hooks/useAuth";

export default async function AddCustomerAfterUserPage({params}: {params: Promise<{userId: string}>}) {
    //----> Get user id from params.
    const {userId} = await params;

    //----> Get the user session.
    const {isOwnerOrAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isOwnerOrAdmin(userId)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to view the ticket detail!</h1></div>
    }

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