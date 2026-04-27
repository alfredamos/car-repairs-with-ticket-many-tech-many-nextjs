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
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function editUserProfile(data: EditUserProfile){
    try {
        //----> Edit user profile.
        const response = await authService.editUserProfile(data);

        //----> Send back response.
        return toResponseMessage(response);
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function loginUser(data: LoginUser){
    try {
        //----> Login user and send back response.
        return await authService.loginUser(data)
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function logoutUser(){
    try {
        //----> Logout user and send back response.
        await authService.logoutUser();
        redirect("/login");
    }catch (err){
        console.log("In logout-action, error : ", err);
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function getLoginUser(){
    try {
        //----> Get the current login user.
        return await authService.getCurrentUser();
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function refreshUserToken(){
    try {
        //----> Refresh user token and send back response.
        return await authService.refreshUserToken();
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
    }
}

export async function signupUser(data: SignupUser){
    try {
        //----> Signup new user.
        const response = await authService.signupUser(data);

        //----> Send back response.
        return toResponseMessage(response)
    }catch (err){
        const error = err as HttpError;
        throw catchError(error?.statusCode, error?.message);
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

