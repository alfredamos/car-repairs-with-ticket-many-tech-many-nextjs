import {TechAfterUserCreateCard} from "@/components/technicians/TechAfterCreateCard";
import {TechnicianCreate} from "@/shared/tech.validation";
import {useAuth} from "@/hooks/useAuth";

export default async function AddTechnicianAfterUserPage({params}: { params: Promise<{userId: string }>}) {
    //----> Get the user id from the URL.
    const {userId} = await params;

    //----> Get the user session.
    const {isOwnerOrAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isOwnerOrAdmin(userId)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin or owner to view this page!</h1></div>
    }

    //----> Make default values for the form.
    const defaultValues: TechnicianCreate = {
        specialty: "",
        userId
    }

    return (
        <TechAfterUserCreateCard defaultValues={defaultValues}/>
    );
}