import {CustomerCreate} from "@/shared/customer.validation";
import {CustomerCreateCard} from "@/components/customers/CustomerCreateCard";
import {UserDto} from "@/types/userDto.model";
import {getAllUsers} from "@/app/actions/user.action";

export default async function AddCustomerPage(){
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