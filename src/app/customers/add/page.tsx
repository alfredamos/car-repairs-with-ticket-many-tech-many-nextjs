import {CustomerCreate} from "@/shared/customer.validation";
import {CustomerCreateCard} from "@/components/customers/CustomerCreateCard";
import {getAllUsers} from "@/app/actions/user.action";
import {useAuth} from "@/hooks/useAuth";

export default async function AddCustomerPage(){
    //----> Get the user session.
    const {isAdmin} = await useAuth();

    //----> Check if the user is an admin.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to perform this action!</h1></div>
    }

    //----> Make default values for the form.
    const defaultValues: CustomerCreate = {
        address: "",
        notes: "",
        userId: ""
    }

    //----> Fetch users from database.
    const users  = await getAllUsers();

    return (
        <CustomerCreateCard defaultValues={defaultValues} users={users}/>
    );
}