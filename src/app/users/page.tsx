import {getAllUsers} from "@/app/actions/user.action";
import UserTable from "@/components/users/UserTable";

export default async function UserListPage(){
    //----> Fetch users from the API route.
    const users = await getAllUsers();

    return (
        <UserTable users={users}/>
    );
}