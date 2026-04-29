import {TechnicianTable} from "@/components/technicians/TechnicianTable";
import {getAllTechs} from "@/app/actions/tech.action";

export default async function TechListPage(){
    //----> Fetch technicians from the API route.
    const techs = await getAllTechs();
    return (
        <TechnicianTable techs={techs}/>
    );
}