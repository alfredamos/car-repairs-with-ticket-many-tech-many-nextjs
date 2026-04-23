import {NextRequest} from "next/server";

export async function DELETE(_request: NextRequest, {params}: {params: Promise<{techId: string; ticketId: string}>}){
    try {
        //----> Extract techId and ticketId from params.
        const {techId, ticketId} = await params;

        //----> Delete the assigned ticket with techId and ticketId.
        //const response = await
    }catch (err){

    }

}