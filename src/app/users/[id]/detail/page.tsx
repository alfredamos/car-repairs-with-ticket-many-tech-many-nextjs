import {getUserById} from "@/app/actions/user.action";
import {UserCard} from "@/components/users/UserCard";
import {useAuth} from "@/hooks/useAuth";

export default async function UserDetailPage({params}:{params: Promise<{id: string}>}){
    //----> Get the user id from the URL and fetch the user from the API route.
    const {id} = await params;

    //----> Get the user session.
    const {isOwnerOrAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isOwnerOrAdmin(id)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin or owner to view this page!</h1></div>
    }

    const user = await getUserById(id);
    return (
        <UserCard user={user}/>
    );
}