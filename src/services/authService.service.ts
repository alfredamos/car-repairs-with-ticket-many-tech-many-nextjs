import {IAuthService} from "@/services/IAuth.service";
import {ChangeUserPassword, ChangeUserRole, EditUserProfile, LoginUser, SignupUser} from "@/shared/auth.validation";
import {UserSession} from "@/types/UserSession.model";
import {ResponseMessage} from "@/utils/responseMessage";
import {Request} from "express";
import {StatusCodes} from "http-status-codes";
import {prisma} from "@/app/db/prisma.db";
import catchError from "http-errors";
import bcrypt from "bcryptjs"
import {fromEditUserToUser} from "@/utils/fromEditUserProfileToUser";
import {fromSignupUserToUser} from "@/utils/fromSignupUserToUser";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {TokenJwt} from "@/types/tokenJwt.model";
import {emptyJwtPayload} from "@/utils/emptyJwtPayload";
import {JwtPayload} from "@/types/jwtPayload.model";
import {AuthParam} from "@/utils/authParam.util";
import {Role, TokenType} from "@/generated/prisma/enums";
import {TokenUncheckedCreateInput} from "@/generated/prisma/models/Token";
import {User} from "@/types/User";
import {emptyUserSession} from "@/utils/emptyUserSession";
import {fromUserToUserDto, UserDto} from "@/types/userDto.model";
import {tokenService} from "@/services/token.service";
import {CookieParam} from "@/utils/cookieParam.util";

class AuthService implements IAuthService {
    async changeUserPassword(request: ChangeUserPassword): Promise<ResponseMessage> {
        //----> Check for passwords match.
        if (this.passwordsNotMatch(request.newPassword, request.confirmPassword)) throw catchError(StatusCodes.BAD_REQUEST, "Passwords not matching!");

        //----> Check for existence of user.
        const user = await this.getUserByEmail(request.email);

        //----> Check for valid password
        if (await this.passwordNotValid(request.password, user.password)) throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");

        //----> Hash password.
        const hashedPassword = await bcrypt.hash(request.newPassword, 12);

        //----> Update user details.
        await prisma.user.update({where: {email: request.email}, data: {...user, password: hashedPassword}});

        //----> Send back response.
        return new ResponseMessage("Password has been changed successfully!", "success", StatusCodes.OK);
    }

    async changeUserRole(request: ChangeUserRole): Promise<ResponseMessage> {
        //----> Get the user-session.
        const session = await this.getUserSession();

        //----> Check for admin privilege.
        if (!session?.isAdmin) throw catchError(StatusCodes.FORBIDDEN, "You are not authorized to perform this action!");

        //----> Check for existence of user.
        const user = await this.getUserByEmail(request.email);

        const role = user.role === Role.User ? Role.Admin : Role.User;

        //----> Update the user details.
        await prisma.user.update({where: {email: request.email}, data: {...user, role}});

        //----> Send back response.
        return new ResponseMessage("Role has been changed successfully!", "success", StatusCodes.OK);
    }

    async editUserProfile(request: EditUserProfile): Promise<ResponseMessage> {
        //----> Check for existence of user.
        const user = await this.getUserByEmail(request.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(request.password, user.password)) throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");

        //----> Get the user from edit-profile-user.
        request.password = user.password
        const userFromEditProfile = fromEditUserToUser(request, user.id);

        //----> Update the user details.
        await prisma.user.update({where: {email: request.email}, data: {...userFromEditProfile}});

        //----> Send back response.
        return new ResponseMessage("Profile has been updated successfully!", "success", StatusCodes.OK);
    }

    async getCurrentUser(): Promise<UserDto> {
        //----> Get the current user from the session.
        const session = await this.getUserSession();

        //----> Check for null session or expired session.
        if (!session) throw catchError(StatusCodes.UNAUTHORIZED, "You are not logged in!");

        //----> Get the current user.
        const user = await prisma.user.findUnique({where: {id: session.id}});

        //----> Send back response.
        return fromUserToUserDto(user);
    }

    async getUserSession(): Promise<UserSession> {
        //----> Get the accessToken from the cookie.
        const accessToken = await this.getCookie(AuthParam.accessTokenName);

        //----> Validate access-token.
        const jwtPayload = this.validateToken(accessToken) as JwtPayload;

        //----> Check for null or invalid jwtPayload.
        if (!jwtPayload || jwtPayload.expiration < Date.now()) return emptyUserSession;

        //----> Get Token-jwt from Jwt-payload.
        const tokenJwt = this.makeTokenJwtFromJwtPayload(jwtPayload);

        //----> Make user-session and send back response.
        return this.makeUserSession(tokenJwt, accessToken);
    }

    async loginUser(request: LoginUser): Promise<UserSession> {
        //----> Check for existence of user.
        const user = await this.getUserByEmail(request.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(request.password, user.password)) throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");

        //----> Get token-jwt from user.
        const tokenJwt = this.makeTokenJwtFromUser(user);

        //----> Generate tokens and store in cookies.
        return this.generateTokensAndCookie(tokenJwt);
    }

    async logoutUser(): Promise<UserSession> {
        //----> Delete all cookies.
        await this.deleteCookie(CookieParam.accessTokenName, CookieParam.accessTokenPath);
        await this.deleteCookie(CookieParam.refreshTokenName, CookieParam.refreshTokenPath);

        //----> Get the user session.
        const session = await this.getUserSession();

        //----> Revoke all invalid token objects.
        await tokenService.revokeAllValidTokensByUserId(session.id);

        //----> Make user-session and send back response.
        return emptyUserSession;
    }

    async refreshUserToken(): Promise<UserSession> {
        //----> Get the refresh-token.
        const refreshToken = await this.getCookie(CookieParam.refreshTokenName);

        //----> Validate token.
        const jwtPayload = this.validateToken(refreshToken);

        //----> Get token-jwt from Jwt-payload.
        const tokenJwt = this.makeTokenJwtFromJwtPayload(jwtPayload);

        //----> Generate tokens and store in cookies.
        return this.generateTokensAndCookie(tokenJwt);
    }

    async signupUser(request: SignupUser): Promise<ResponseMessage> {
        //----> Check for passwords match.
        if(this.passwordsNotMatch(request.password, request.confirmPassword)) throw catchError(StatusCodes.BAD_REQUEST, "Passwords must match!");

        //----> Check for existence of user.
        const user = await prisma.user.findUnique({where: {email: request.email}});
        if (user) throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");

        //----> Hash password.
        request.password = await bcrypt.hash(request.password, 12);

        //----> Get the user from signup-user.
        const userToCreate = fromSignupUserToUser(request);

        //----> Insert the new user in db.
        await prisma.user.create({data: {...userToCreate}});

        //----> Send back response.
        return new ResponseMessage("User has been created successfully!", "success", StatusCodes.CREATED);

    }

    private async generateTokensAndCookie(tokenJwt: TokenJwt): Promise<UserSession>{
        //----> Revoke all invalid token objects.
        await tokenService.revokeAllValidTokensByUserId(tokenJwt.id);

        //----> Generate access-token and store it in cookie.
        const accessToken = this.generateToken(tokenJwt, CookieParam.accessTokenMaxAge);
        await this.setCookie(CookieParam.accessTokenName, accessToken, CookieParam.accessTokenPath, CookieParam.accessTokenMaxAge);

        //----> Generate refresh-token and store it in database.
        const refreshToken = this.generateToken(tokenJwt, CookieParam.refreshTokenMaxAge);
        await this.setCookie(CookieParam.refreshTokenName, refreshToken, CookieParam.refreshTokenPath, CookieParam.refreshTokenMaxAge);

        //----> Make token object.
        const tokenObj = this.makeTokenObject(accessToken, refreshToken, tokenJwt.id);
        await tokenService.createToken(tokenObj);

        //----> Make user-session and send it back.
        return this.makeUserSession(tokenJwt, accessToken);

    }

    private validateToken(token: string): JwtPayload {
        //----> Check for null token.
        if(!token) return emptyJwtPayload;

        //----> Validate token.
        const jwtPayload = jwt.verify(token, process.env.JWT_TOKEN_KEY as string) as JwtPayload;

        //----> Check for null or invalid jwtPayload.
        if(!jwtPayload || jwtPayload.expiration < Date.now()) return emptyJwtPayload;

        //----> Return the jwtPayload.
        return jwtPayload;
    }

    private generateToken(tokenJwt:TokenJwt, expiresIn: number) {
        return jwt.sign(tokenJwt, process.env.JWT_TOKEN_KEY as string, {expiresIn});
    }

    private async getCookie(cookieName: string){
        const cookieStore = await cookies()
        const cookie = cookieStore.get(cookieName)

        //----> Return the cookie value.
        return cookie?.value || "";
    }

    private async setCookie(cookieName: string, cookieValue: string, cookiePath: string, maxAge: number){
        const cookieStore = await cookies();

        //----> Set cookie.
        cookieStore.set(cookieName, cookieValue, {
            path: cookiePath,
            maxAge,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
    }

    private async deleteCookie(cookieName: string, cookiePath: string){
        await this.setCookie(cookieName,"", cookiePath, 0);
    }


    private async getUserByEmail(email: string) {
        //----> Fetch the user with the giving email from the database.
        const user = await prisma.user.findUnique({where: {email}});

        //----> Check for null user.
        if (!user) throw catchError(StatusCodes.NOT_FOUND, "User not found!");

        //----> Return the user.
        return user;
    }

    private passwordsNotMatch(passwordOne: string, passwordTwo: string) : boolean {
        return passwordOne.normalize() !== passwordTwo.normalize();
    }

    private async passwordNotValid(rawPassword: string, hashedPassword: string) {
        return !await bcrypt.compare(rawPassword, hashedPassword);
    }

    private makeTokenJwtFromUser(user: User): TokenJwt{
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            userType: user.userType,
        }
    }

    private makeTokenJwtFromJwtPayload(payload: JwtPayload): TokenJwt {
        return {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            userType: payload.userType
        }
    }

    private makeUserSession(tokenJwt: TokenJwt, accessToken: string): UserSession{
        return {
            ...tokenJwt,
            accessToken,
            isLoggedIn: !!tokenJwt,
            isAdmin: tokenJwt.role === Role.Admin
        }
    }

    private makeTokenObject(accessToken: string, refreshToken: string, userId: string): TokenUncheckedCreateInput {
        return {
            accessToken,
            refreshToken,
            tokenType: TokenType.Bearer,
            expired: false,
            revoked: false,
            userId
        }
    }

}

export const authService = new AuthService();