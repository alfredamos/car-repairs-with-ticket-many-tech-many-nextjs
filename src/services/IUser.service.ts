import {UserDto} from "@/types/userDto.model";

export interface IUserService{
    deleteUserById(id: string): Promise<UserDto>;
    getUserByEmail(email: string): Promise<UserDto>;
    getUserById(id: string): Promise<UserDto>;
    getAllUsers(): Promise<UserDto[]>;
}