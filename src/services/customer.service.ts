import {CustomerUncheckedCreateInput, CustomerUncheckedUpdateInput} from "@/generated/prisma/models";
import {ICustomerService} from "@/services/ICustomer.service";
import {CustomerResponse, toCustomerResponse} from "@/types/customerResp.model";
import {prisma} from "@/app/db/prisma.db";
import {CustomerWithUser} from "@/types/customerWithUser.model";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {ResponseMessage} from "@/utils/responseMessage";

class CustomerService implements ICustomerService {
    async changeStatus(id: string): Promise<CustomerResponse> {
        //----> Check for existence of customer.
        const customer = await this.getOneCustomer(id);

        //----> Change customer status.
        const active = !customer.active;

        //----> Update the customer details.
        const updatedCustomer = await prisma.customer.update({where: {id}, data: {active}, include: {user: true}});

        //----> Send back response.
        return toCustomerResponse(updatedCustomer as CustomerWithUser);
    }

    async createCustomer(request: CustomerUncheckedCreateInput): Promise<CustomerResponse> {
        //----> Insert new customer.
        const customer = await prisma.customer.create({data: {...request}, include: {user: true}});

        //----> Send back response.
        return toCustomerResponse(customer as CustomerWithUser);

    }

    async deleteCustomerById(id: string): Promise<ResponseMessage> {
        //----> Check for existence of customer with the giving id.
        const customer = await this.getOneCustomer(id);

        //----> Delete the customer with the giving id.
        await prisma.user.delete({where: {id : customer.userId}})

        //----> Send back the response.
        return new ResponseMessage("User with the associated customer deleted successfully", "success", StatusCodes.OK)
    }

    async editCustomerById(id: string, request: CustomerUncheckedUpdateInput): Promise<CustomerResponse> {
        await this.getOneCustomer(id);

        //----> Edit the customer with the giving id.
        const editedCustomer = await prisma.customer.update({where: {id}, data: {...request}, include: {user: true}});

        //----> Send back the response.
        return toCustomerResponse(editedCustomer as CustomerWithUser);
    }

    async getActiveCustomers(): Promise<CustomerResponse[]> {
        //----> Fetch all customers.
        const customers = await prisma.customer.findMany({where: {active: true}, include: {user: true}});

        //----> Send back response.
        return customers?.map(customer => toCustomerResponse(customer as CustomerWithUser));
    }

    async getAllCustomers(): Promise<CustomerResponse[]> {
        //----> Fetch all customers.
        const customers = await prisma.customer.findMany({include: {user: true}});

        //----> Send back response.
        return customers?.map(customer => toCustomerResponse(customer as CustomerWithUser));
    }

    async getCustomerById(id: string): Promise<CustomerResponse> {
        //----> Check for existence of customer with the giving id.
        const customer = await this.getOneCustomer(id);

        //----> Send back the response.
        return toCustomerResponse(customer as CustomerWithUser);

    }

    async getCustomerByUserId(userId: string): Promise<CustomerResponse> {
        //----> Fetch customer by user-id.
        const customer = await prisma.customer.findUnique({where: {userId}, include: {user: true}});

        //----> Send back response.
        return toCustomerResponse(customer as CustomerWithUser);
    }

    async getInactiveCustomers(): Promise<CustomerResponse[]> {
        //----> Fetch all customers.
        const customers = await prisma.customer.findMany({where: {active: false}, include: {user: true}});

        //----> Send back response.
        return customers?.map(customer => toCustomerResponse(customer as CustomerWithUser));
    }

    private async getOneCustomer(id: string){
        //----> Fetch customer with the giving id.
        const customer = await prisma.customer.findUnique({where: {id}, include: {user: true}});

        //----> Check for null customer.
        if (!customer) throw catchError(StatusCodes.NOT_FOUND, "Customer not found in db!");

        //----> Send back response.
        return customer;
    }
}

export const customerService= new CustomerService() as ICustomerService;