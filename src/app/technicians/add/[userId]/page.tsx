import {TechAfterUserCreateCard} from "@/components/technicians/TechAfterCreateCard";
import {TechnicianCreate} from "@/shared/tech.validation";

export default async function AddTechnicianAfterUserPage({params}: { params: Promise<{userId: string }>}) {
    //----> Get the user id from the URL.
    const {userId} = await params;

    //----> Make default values for the form.
    const defaultValues: TechnicianCreate = {
        specialty: "",
        userId
    }

    return (
        <TechAfterUserCreateCard defaultValues={defaultValues}/>
    );
}