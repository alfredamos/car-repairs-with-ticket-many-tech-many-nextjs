import {NextRequest, NextResponse} from "next/server";
import {techService} from "@/services/tech.service";
import catchError, {HttpError} from "http-errors";

export async function GET(_request: NextRequest, {params}: {params: Promise<{specialty: string}>}){
    try {
        //----> Get the specialty from params.
        const {specialty} = await params;

        //----> Fetch the techs with the giving specialty.
        const response = await techService.getTechniciansBySpeciality(specialty)

        //----> Send back response.
        return NextResponse.json(response);

    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}
