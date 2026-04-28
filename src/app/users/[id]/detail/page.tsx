import {getUserById} from "@/app/actions/user.action";
import {UserCard} from "@/components/users/UserCard";

export default async function UserDetailPage({params}:{params: Promise<{id: string}>}){
    //----> Get the user id from the URL and fetch the user from the API route.
    const {id} = await params;
    const user = await getUserById(id);
    return (
        <UserCard user={user}/>
    );
}