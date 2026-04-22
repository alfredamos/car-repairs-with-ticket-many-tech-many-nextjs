import {ChangeUserPassword, ChangeUserRole, EditUserProfile, LoginUser, SignupUser} from "@/shared/auth.validation";
import {ResponseMessage} from "@/utils/responseMessage";
import {UserSession} from "@/types/UserSession.model";
import {UserDto} from "@/types/userDto.model";

export interface IAuthService {
    changeUserPassword(request: ChangeUserPassword): Promise<ResponseMessage>;
    changeUserRole(request: ChangeUserRole): Promise<ResponseMessage>;
    editUserProfile(request: EditUserProfile): Promise<ResponseMessage>;
    getCurrentUser(): Promise<UserDto>;
    getUserSession(): Promise<UserSession>;
    loginUser(request:LoginUser): Promise<UserSession>;
    logoutUser(): Promise<UserSession>;
    refreshUserToken(): Promise<UserSession>;
    signupUser(request: SignupUser): Promise<ResponseMessage>;
}