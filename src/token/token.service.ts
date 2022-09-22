import {JwtPayload, sign} from 'jsonwebtoken'
import {User} from "../users/entities/user.entity";
import {Token} from "./entities/token.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
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

    private async _createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return this.jwtService.sign(payloadData, {secret: secretKey, expiresIn: timeExpire})
    }
    public async createToken(payloadData: object): Promise<string> {
        return this._createToken(payloadData,  this.config.get("SECRET_KEY_REFRESH_JWT"), '30d')
    }

    public verify(token: string): { userId: number } | HttpException {
        try {
            return this.jwtService.verify(token, {secret: this.config.get("SECRET_KEY_REFRESH_JWT")}) as { userId: number }
        } catch (e) {
            throw  new HttpException('tempKey no correct', HttpStatus.BAD_REQUEST);
        }
    }
}