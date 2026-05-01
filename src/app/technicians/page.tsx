import {TechnicianTable} from "@/components/technicians/TechnicianTable";
import {getAllTechs} from "@/app/actions/tech.action";
import {useAuth} from "@/hooks/useAuth";

export default async function TechListPage(){
    //----> Get the user session.
    const {isAdmin} = await useAuth();

    //----> Check if the user is an admin or owner.
    if (!isAdmin()) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You must be an admin or owner to view this page!</h1></div>
    }

    //----> Fetch technicians from the API route.
    const techs = await getAllTechs();
    return (
        <TechnicianTable techs={techs}/>
    );
}