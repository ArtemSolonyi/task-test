import {User} from "../users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    Injectable, UnauthorizedException,
} from "@nestjs/common";
import {TokenService} from "../token/token.service";
import {AuthLoginDto,} from "./dto/auth.dto";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import {Template} from "../template/entities/template.entity";


export type IQuery = { token: string; sort: { dClient: ('ASC' | 'DESC') | null, tClient?: ('ASC' | 'DESC') | null }, conditions: { dClient: { greatestEqual: string } } }

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Template) private templateRepository: Repository<Template>,
                private tokenService: TokenService,
                private config: ConfigService,
    ) {
    }

    async getTemplate(body: { templateId: number }, query: IQuery) {
        const user = this.tokenService.verify(query.token)
        if (user.hasOwnProperty('userId')) {
            const template = await this.templateRepository.createQueryBuilder('template')
                .where("template.templateId = :template", {template: body.templateId})
                .orderBy({
                        'template.tClient': query.sort?.tClient! == undefined ? 'DESC' : query.sort?.tClient!,
                    }
                )
            if (query.conditions?.dClient) {
                template.andWhere('template.dClient >=:dClient', {dClient: new Date(query.conditions.dClient.greatestEqual)})
            }
            if (query.sort?.tClient) {
                template.addOrderBy('template.dClient', query.sort?.dClient! == undefined ? 'DESC' : query.sort?.dClient!)
            }
            const templateCount = await this.templateRepository.count({where: {templateId: body.templateId}})
            return {
                metadata: {blockType: 'BT_REPLACE', rowCount: templateCount, templateId: body.templateId},
                data: await template.getMany()
            }
        } else {
            throw new UnauthorizedException()
        }

    }

    async login(body: AuthLoginDto) {
        let findUser = await this.userRepository.findOneBy({login: body.login})
        if (findUser) {
            const isAccess = await bcrypt.compare(body.password, findUser.password)
            if (!isAccess) {
                throw new UnauthorizedException()
            }
        } else {
            const createUser = this.userRepository.create({
                login: body.login,
                password: await bcrypt.hash(body.password, bcrypt.genSaltSync(5))
            })
            findUser = await this.userRepository.save(createUser)
        }
        const token = await this.tokenService.createToken({userId: findUser.id})
        const templateCount = await this.templateRepository.count({where: {templateId: body.templateId}})
        return [{
            metadata: {
                blockType: 'BT_REPLACE',
                rowCount: templateCount,
                templateId: body.templateId
            },
            data: [{token: token}]
        }
        ]
    }


}
