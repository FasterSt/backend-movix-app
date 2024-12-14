import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';

@Controller('me')
@UseGuards(SupabaseGuard)
export class MeController {
    constructor(
        private readonly meService: MeService,
        private readonly authService: AuthService,
    ) {}

    @Get('profile')
    async getUserProfile(@Req() req: Request) {
        const { user } = req.user as { user: SupabaseAuthUser };
        const data = await this.authService.getUser(user.id);
    }
}
