import {NextRequest, NextResponse} from "next/server";
import {techService} from "@/services/tech.service";
import catchError, {HttpError} from "http-errors";
import {validateWithZodSchema} from "@/shared/zodSchema.validation";
import {technicianCreateSchema} from "@/shared/tech.validation";

export async function GET(){
    try {
        //----> Fetch all techs.
        const response = await techService.getAllTechnicians();

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function POST(request: NextRequest){
    try {
        //----> Get the tech payload from request.
        const techToCreate = validateWithZodSchema(technicianCreateSchema, await request.json());

        //----> Insert the new tech in db.
        const response = await techService.createTechnician(techToCreate);

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        console.log("In tech-post-api, error : ", err)
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

