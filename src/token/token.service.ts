import {JwtPayload, sign} from 'jsonwebtoken'
import {User} from "../users/entities/user.entity";
import {Token} from "./entities/token.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import {AuthRefreshDto} from "../authorizhation/dto/auth.dto";
import {ConfigService} from "@nestjs/config";

export interface ITokens {
    accessToken: string,
    refreshToken: string
}

@Injectable()
export class TokenService {

    constructor(@InjectRepository(Token) private tokenRepository?: Repository<Token>,
                private jwtService?: JwtService,
                private config?: ConfigService) {
    }

    public async createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return this.jwtService.sign(payloadData, {secret: secretKey, expiresIn: timeExpire})
    }

    public verify(token: string): { userId: number } | HttpException {
        try {
            return this.jwtService.verify(token, {secret: this.config.get("SECRET_KEY_REFRESH_JWT")}) as { userId: number }
        } catch (e) {
            throw  new HttpException('tempKey no correct', HttpStatus.BAD_REQUEST);
        }
    }
}