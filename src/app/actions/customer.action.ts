"use server"

import {CustomerCreate, CustomerEdit} from "@/shared/customer.validation";
import {customerService} from "@/services/customer.service";

export async function createCustomer(customer: CustomerCreate) {
    try {
        //----> Insert the new customer in db.
        return await customerService.createCustomer(customer);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function deleteCustomerById(id: string) {
    try {
        //----> Delete the customer with the giving id in db.
        return await customerService.deleteCustomerById(id);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function editCustomerById(id: string, customer: CustomerEdit) {
    try {
        //----> Edit the customer with the giving id in db.
        return await customerService.editCustomerById(id, customer);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getCustomerById(id: string) {
    try {
        //----> Fetch the customer with the giving id in db.
        return await customerService.getCustomerById(id);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getActiveCustomers(){
    try {
        //----> Fetch all customers from db.
        return await customerService.getActiveCustomers();

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getAllCustomers(){
    try {
        //----> Fetch all customers from db.
        return await customerService.getAllCustomers();

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getInactiveCustomers(){
    try {
        //----> Fetch all customers from db.
        return await customerService.getInactiveCustomers();

    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

