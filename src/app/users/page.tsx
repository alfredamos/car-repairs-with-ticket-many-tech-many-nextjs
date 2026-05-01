import {getAllUsers} from "@/app/actions/user.action";
import UserTable from "@/components/users/UserTable";
import {useAuth} from "@/hooks/useAuth";

export default async function UserListPage(){
    //----> Get the user session.
    const {isAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin to view this page!</h1></div>
    }

    //----> Fetch users from the API route.
    const users = await getAllUsers();

    return (
        <UserTable users={users}/>
    );
}