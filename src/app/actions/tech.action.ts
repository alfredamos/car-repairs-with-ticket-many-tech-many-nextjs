"use server"

import {techService} from "@/services/tech.service";
import {TechnicianCreate, TechnicianEdit} from "@/shared/tech.validation";

export async function createTech(tech: TechnicianCreate){
    try {
        //----> Create new tech.
        return await techService.createTechnician(tech);

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function deleteTechById(id: string){
    try {
        //----> Delete tech by id.
        return await techService.deleteTechnicianById(id);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}
export async function editTechById(id: string, tech: TechnicianEdit){
    try {
        //----> Edit tech by id.
        return await techService.editTechnicianById(id, tech);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getTechById(id: string){
    try {
        //----> Fetch tech by id.
        return await techService.getTechnicianById(id);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAllTechs(){
    try {
        //----> Fetch all techs.
        return await techService.getAllTechnicians();
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}