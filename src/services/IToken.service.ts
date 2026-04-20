import {ResponseMessage} from "@/utils/responseMessage";
import {TokenUncheckedCreateInput} from "@/generated/prisma/models/Token";

export interface ITokenService {
    createToken(request: TokenUncheckedCreateInput): Promise<ResponseMessage>;
    deleteAllInvalidTokens(): Promise<ResponseMessage>;
    deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage>;
    revokeAllValidTokensByUserId(userId: string): Promise<ResponseMessage>;
}