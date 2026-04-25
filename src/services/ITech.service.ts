import {TechnicianUncheckedCreateInput, TechnicianUncheckedUpdateInput} from "@/generated/prisma/models/Technician";
import {TechnicianResponse} from "@/types/technicianResp.model";

export interface ITechService{
    createTechnician(request: TechnicianUncheckedCreateInput): Promise<TechnicianResponse>;
    deleteTechnicianById(id: string): Promise<TechnicianResponse>;
    editTechnicianById(id: string, request: TechnicianUncheckedUpdateInput): Promise<TechnicianResponse>;
    getAllTechnicians(): Promise<TechnicianResponse[]>;
    getTechnicianById(id: string): Promise<TechnicianResponse>;
    getTechniciansBySpeciality(speciality: string): Promise<TechnicianResponse[]>;
    getTechnicianByUserId(userId: string): Promise<TechnicianResponse>;
}