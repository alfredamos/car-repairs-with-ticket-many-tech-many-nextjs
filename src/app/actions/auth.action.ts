"use server"

import {
    ChangeUserPassword,
    EditUserProfile,
    LoginUser,
    SignupUser
} from "@/shared/auth.validation";
import {authService} from "@/services/authService.service";
import {ResponseMessage} from "@/utils/responseMessage";
import catchError, {HttpError} from "http-errors";
import {redirect} from "next/navigation";

export async function changeUserPassword(data: ChangeUserPassword){
    try{
        //----> Change the user password.
        const response = await authService.changeUserPassword(data);

        //----> Send back response.
        return toResponseMessage(response);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function editUserProfile(data: EditUserProfile){
    try {
        //----> Edit user profile.
        const response = await authService.editUserProfile(data);

        //----> Send back response.
        return toResponseMessage(response);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function loginUser(data: LoginUser){
    try {
        //----> Login user and send back response.
        return await authService.loginUser(data)
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function logoutUser(){
    try {
        //----> Logout user and send back response.
        await authService.logoutUser();
        redirect("/login");
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function getLoginUser(){
    try {
        //----> Get the current login user.
        return await authService.getCurrentUser();
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function refreshUserToken(){
    try {
        //----> Refresh user token and send back response.
        return await authService.refreshUserToken();
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

export async function signupUser(data: SignupUser){
    try {
        //----> Signup new user.
        return await authService.signupUser(data);
    }catch (err){
        const error = err as Error;
        throw new Error(error?.message, {cause: err});
    }
}

function toResponseMessage(response: ResponseMessage){
    //----> Make response message.
    const responseMessage : ResponseMessage = {
        message: response?.message,
        status: response?.status,
        statusCode: response?.statusCode
    };

    //----> Send back result.
    return responseMessage
}

