import { Controller, Post, Body, Res, Get, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { query, Request, Response } from 'express';
import { AuthResponse } from '@supabase/supabase-js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(
        @Body() createAuthDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { data }: AuthResponse =
            await this.authService.signUpUser(createAuthDto);
        res.cookie('access_token', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
        }).send({ message: 'Successfully signed up!' });
    }

    @Get('github')
    async signIn(@Res({ passthrough: true }) res: Response) {
        const {
            data: { url },
            error,
        } = await this.authService.signInWithGithub();
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // return res.json({ data: url });
        return res.redirect(302, url);
    }

    @Get('github/callback')
    async githubCallback(
        @Query() query: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
    ) {
        // console.log(query);
        // const { data, error } =
        //     await this.authService.exchangeCodeForToken(code);
        // if (error) {
        //     return res.status(500).json({ error: error.message });
        // }
        // res.cookie('access_token', data.session.access_token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'lax',
        // });
    }
}
