import {TokenUncheckedCreateInput} from "@/generated/prisma/models";
import {ITokenService} from "@/services/IToken.service";
import {ResponseMessage} from "@/utils/responseMessage";
import {prisma} from "@/app/db/prisma.db";
import {StatusCodes} from "http-status-codes";

class TokenService implements ITokenService {
    async createToken(request: TokenUncheckedCreateInput): Promise<ResponseMessage> {
        //----> Insert token object into database
        await prisma.token.create({data: request});

        //----> Return success message
        return new ResponseMessage("Token created successfully", "success", 200);
    }

    async deleteAllInvalidTokens(): Promise<ResponseMessage> {
        //----> Delete all invalid tokens.
        await prisma.token.deleteMany({where: {expired: true, revoked: true}});

        //----> Return success message
        return new ResponseMessage("All invalid tokens deleted successfully", "success", StatusCodes.OK);
    }

    async deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage> {
        //----> Delete invalid tokens by user id.
        await prisma.token.deleteMany({where: {userId, expired: true, revoked: true}});

        //----> Return success message
        return new ResponseMessage("All invalid tokens associated with this user deleted successfully", "success", StatusCodes.OK);
    }

    async revokeAllValidTokensByUserId(userId: string): Promise<ResponseMessage> {
        //----> Revoke all valid tokens by user id.
        await prisma.token.updateMany({where: {userId, expired: false, revoked: false}, data: {expired: true, revoked: true}});

        //----> Return success message
        return new ResponseMessage("All valid tokens associated with this user revoked successfully", "success", StatusCodes.OK);
    }

}

export const tokenService = new TokenService() as ITokenService;