import {forwardRef, Module} from '@nestjs/common';
import {User} from "../users/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TokenModule} from "../token/token.module";
import {Template} from "../template/entities/template.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User]),

        TypeOrmModule.forFeature([Template])
        , forwardRef(() => TokenModule)],
    controllers: [AuthController],
    exports:[AuthService],
    providers: [AuthService]
})
export class AuthModule {
}
