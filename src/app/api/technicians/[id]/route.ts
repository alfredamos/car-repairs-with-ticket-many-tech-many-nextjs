import {NextRequest, NextResponse} from "next/server";
import catchError, {HttpError} from "http-errors";
import {techService} from "@/services/tech.service";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {technicianEditSchema} from "@/shared/tech.validation";

export async function GET(_request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        //----> Get the id from params.
        const {id} = await params;

        //----> Fetch the tech with the giving id.
        const response = await techService.getTechnicianById(id);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function DELETE(_request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        //----> Get the id from params.
        const {id} = await params;

        //----> Delete the tech with the giving id.
        const response = await techService.deleteTechnicianById(id);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        //----> Get the id from params.
        const {id} = await params;


        //----> Get the tech payload.
        const techToEdit = validateWithZodSchema(technicianEditSchema, await request.json());

        //----> edit the tech with the giving id.
        const response = await techService.editTechnicianById(id, techToEdit);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}