import {TechCard} from "@/components/technicians/TechCard";
import {getTechById} from "@/app/actions/tech.action";

export default async function TechDetailPage({params}:{params: Promise<{id: string}>}){
    //----> Get the technician id from the URL.
    const {id} = await params;

    //----> Fetch technician from the action.
    const tech = await getTechById(id);
    return (
        <TechCard tech={tech}/>
    );
}