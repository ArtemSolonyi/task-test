import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {AuthService, IQuery} from "./auth.service";
import {AuthLoginDto,} from "./dto/auth.dto";

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/:templateId/token=')
    private async login(@Body() body: AuthLoginDto, @Param() query: { templateId: string }) {
        return await this.authService.login({...body, templateId: +query.templateId})
    }

    @Get('/:templateId')
    private async getTemplate(@Param() param: { templateId: string }, @Query() query: IQuery) {
        return await this.authService.getTemplate({templateId: +param.templateId}, query)
    }
}
