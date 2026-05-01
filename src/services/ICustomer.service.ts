import {CustomerUncheckedCreateInput, CustomerUncheckedUpdateInput} from "@/generated/prisma/models/Customer";
import {CustomerResponse} from "@/types/customerResp.model";
import {ResponseMessage} from "@/utils/responseMessage";

export interface ICustomerService{
    changeStatus(id: string): Promise<CustomerResponse>;
    createCustomer(request: CustomerUncheckedCreateInput): Promise<CustomerResponse>;
    deleteCustomerById(id: string): Promise<ResponseMessage>;
    editCustomerById(id: string, request: CustomerUncheckedUpdateInput): Promise<CustomerResponse>;
    getActiveCustomers(): Promise<CustomerResponse[]>;
    getAllCustomers(): Promise<CustomerResponse[]>;
    getCustomerById(id: string): Promise<CustomerResponse>;
    getCustomerByUserId(userId: string): Promise<CustomerResponse>
    getInactiveCustomers(): Promise<CustomerResponse[]>;
}