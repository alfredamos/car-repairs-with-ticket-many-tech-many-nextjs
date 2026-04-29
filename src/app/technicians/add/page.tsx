import {TechnicianCreate} from "@/shared/tech.validation";
import {getAllUsers} from "@/app/actions/user.action";
import {TechCreateCard} from "@/components/technicians/TechCreateCard";

export default async function AddTechPage(){
    //----> Make default values for the form.
    const defaultValues: TechnicianCreate = {
        specialty: "",
        userId: ""
    }

    //----> Fetch users from database.
    const users  = await getAllUsers();

    return (
        <TechCreateCard defaultValues={defaultValues} users={users}/>
    );
}