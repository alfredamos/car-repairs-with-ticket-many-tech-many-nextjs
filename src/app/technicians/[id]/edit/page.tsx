import {getTechById} from "@/app/actions/tech.action";
import {TechnicianEdit} from "@/shared/tech.validation";
import {TechEditCard} from "@/components/technicians/TechEditCard";

export default async function TechEditPage({params}:{params: Promise<{id: string}>}){
    //----> Get the technician id from the URL.
    const {id} = await params;

    //----> Fetch technician from the action.
    const tech = await getTechById(id);

    //----> Make default values for the form.
    const defaultValues: TechnicianEdit = {
        id: tech.id,
        specialty: tech.specialty,
        userId: tech.userId,
    }

    return (
       <TechEditCard defaultValues={defaultValues}/>
    );
}