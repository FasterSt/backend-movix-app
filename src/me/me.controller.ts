import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Controller('me')
@UseGuards(SupabaseGuard)
export class MeController {
    constructor(
        private readonly meService: MeService,
        private readonly authService: AuthService,
    ) {}

    @Get('profile')
    async getUserProfile(@Req() req: Request) {
        console.log('COOKIES', req.cookies);
        console.log('Headers Cookie', req.headers.cookie);
        console.log('Haciendo pruebas de cookies guardadas');
    }
}
