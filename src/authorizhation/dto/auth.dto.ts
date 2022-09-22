import { IsString, Length} from "class-validator";


export class AuthLoginDto {
    @IsString()
    @Length(3)
    login: string
    @IsString()
    @Length(2)
    password: string
    templateId: number
}
