import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/test-request')
    getHello(@Req() req: Request): void {
        console.log('Cookies: ', req.cookies);
    }
}
