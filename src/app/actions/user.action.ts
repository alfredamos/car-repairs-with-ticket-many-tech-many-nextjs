"use server"

import { userService } from "@/services/user.service"

export async function getAllUsers(){
  try{
    //----> Fetch users from the API route.
    return  await userService.getAllUsers();
  }catch(err){
    const error = err as Error;
    throw new Error(error?.message, {cause: err});
  }
}

export async function getUserById(id: string){
  try {
    //----> Fetch user by id.
    return await userService.getUserById(id);

  }catch (err){
    const error = err as Error;
    throw new Error(error?.message, {cause: err});
  }

}

export async function deleteUserById(id: string){
  try {
    //----> Delete user by id.
    return await userService.deleteUserById(id);

  }catch (err){
    const error = err as Error;
    throw new Error(error?.message, {cause: err});
  }

}