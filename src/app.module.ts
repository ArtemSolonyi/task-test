import {CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe} from '@nestjs/common';
import {APP_PIPE} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm"
import {AuthModule} from "./authorizhation/auth.module";
import {TokenModule} from "./token/token.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as dotenv from "dotenv"
import {typeSettingsMySql} from "../config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import * as redisStore from "cache-manager-ioredis";


dotenv.config()


@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 60 * 3600 * 1000,
        }),
        TypeOrmModule.forRoot(typeSettingsMySql),
        AuthModule,
        TokenModule,
        JwtModule,
        ConfigModule.forRoot({
            isGlobal: true
        }), ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'build')
            , exclude: ['/api*'],
        }),
    ],
    controllers: [],
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe,
    }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}

