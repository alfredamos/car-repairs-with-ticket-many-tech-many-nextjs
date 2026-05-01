import {TechCard} from "@/components/technicians/TechCard";
import {getTechById} from "@/app/actions/tech.action";
import {useAuth} from "@/hooks/useAuth";

export default async function TechDetailPage({params}:{params: Promise<{id: string}>}){
    //----> Get the technician id from the URL.
    const {id} = await params;

    //----> Fetch technician from the action.
    const tech = await getTechById(id);

    //----> Get the user session.
    const {isOwnerOrAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isOwnerOrAdmin(tech.userId)) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin or owner to view this page!</h1></div>
    }

    return (
        <TechCard tech={tech}/>
    );
}