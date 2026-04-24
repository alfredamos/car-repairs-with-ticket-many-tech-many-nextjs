import {IUserService} from "@/services/IUser.service";
import {fromUserToUserDto, UserDto} from "@/types/userDto.model";
import {prisma} from "@/app/db/prisma.db";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

class UserService implements IUserService {
    async deleteUserById(id: string): Promise<UserDto> {
        //----> Check for existence of user.
        await this.getOneUser(id);

        //----> Delete the user with the giving id.
        const deletedUser = await prisma.user.delete({where: {id}});

        //----> Send back response.
        return fromUserToUserDto(deletedUser);
    }

    async getUserByEmail(email: string): Promise<UserDto> {
        //----> Fetch the user with the giving email.
        const user = await prisma.user.findUnique({where: {email}});

        //----> Check for null user.
        if (!user) throw catchError(StatusCodes.NOT_FOUND, "User not found in db!");

        //----> Send back response.
        return fromUserToUserDto(user);
    }

    async getUserById(id: string): Promise<UserDto> {
        //----> Fetch the user with the giving id.
        const user = await this.getOneUser(id);

        //----> Send back response.
        return fromUserToUserDto(user);


    }

    async getAllUsers(): Promise<UserDto[]> {
        //----> Fetch all users.
        const users = await prisma.user.findMany({});

        //----> Send back response.
        return users?.map(fromUserToUserDto);
    }

    private async getOneUser(id: string){
        //----> Fetch the user with the giving id.
        const user = await prisma.user.findUnique({where: {id}});

        //----> Check for null user.
        if (!user) throw catchError(StatusCodes.NOT_FOUND, "User not found in db!");

        //----> Send back response.
        return user;
    }
}

export const userService = new UserService() as IUserService;