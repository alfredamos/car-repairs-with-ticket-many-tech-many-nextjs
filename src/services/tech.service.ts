import { TechnicianUncheckedCreateInput, TechnicianUncheckedUpdateInput } from "@/generated/prisma/models";
import {ITechService} from "@/services/ITech.service";
import {TechnicianResponse, toTechnicianResponse} from "@/types/technicianResp.model";
import {prisma} from "@/app/db/prisma.db";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {ResponseMessage} from "@/utils/responseMessage";

class TechService implements ITechService {
    async createTechnician(request: TechnicianUncheckedCreateInput): Promise<TechnicianResponse> {
        //----> Insert the new tech in db.
        const tech = await prisma.technician.create({data: request, include: {user: true}});

        //----> Send back response.
        return toTechnicianResponse(tech);
    }

    async deleteTechnicianById(id: string): Promise<ResponseMessage> {
        //----> Check for existence of tech with the giving id.
        const tech = await this.getOneTech(id);

        //----> Delete the tech with the giving id.
        await prisma.user.delete({where: {id : tech.userId}})

        //----> Send back response.
        return new ResponseMessage("Tech with the related user deleted successfully", "success", StatusCodes.OK)
    }

    async editTechnicianById(id: string, request: TechnicianUncheckedUpdateInput): Promise<TechnicianResponse> {
        //----> Check for existence of tech with the giving id.
        await this.getOneTech(id);

        //----> Edit the tech with the giving id.
        const editedTech = await prisma.technician.update({where: {id}, data: {...request}, include: {user: true}});

        //----> Send back response.
        return toTechnicianResponse(editedTech);
    }

    async getAllTechnicians(): Promise<TechnicianResponse[]> {
        //----> Fetch all technicians.
        const techs = await prisma.technician.findMany({include: {user: true}});

        //----> Send back response.
        return techs?.map(tech => toTechnicianResponse(tech));
    }

    async getTechnicianById(id: string): Promise<TechnicianResponse> {
        //----> Fetch the tech with the giving id.
        const tech = await this.getOneTech(id);

        //----> Send back response.
        return toTechnicianResponse(tech)
    }

    async getTechniciansBySpeciality(specialty: string): Promise<TechnicianResponse[]> {
        //----> Fetch all technicians.
        const techs = await prisma.technician.findMany({where: {specialty}, include: {user: true}});

        //----> Send back response.
        return techs?.map(tech => toTechnicianResponse(tech));
    }

    async getTechnicianByUserId(userId: string): Promise<TechnicianResponse> {
        //----> Fetch the tech with the giving user id.
        const tech = await prisma.technician.findUnique({where: {userId}, include: {user: true}});

        //----> Check for null tech.
        if (!tech) throw catchError(StatusCodes.NOT_FOUND, "Tech with the giving userId not found!");

        //----> Send back response.
        return toTechnicianResponse(tech);
    }

    private async getOneTech(id: string){
        //----> Fetch the tech with the giving id.
        const tech = await prisma.technician.findUnique({where: {id}, include: {user: true}});

        //----> Check for null tech.
        if (!tech) throw catchError(StatusCodes.NOT_FOUND, "Tech with the giving id is not found!");

        //----> Send back response.
        return tech;
    }
}

export const techService = new TechService() as ITechService;