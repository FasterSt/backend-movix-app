import {
    Controller,
    Post,
    Body,
    Res,
    Get,
    Query,
    Req,
    BadRequestException,
    UnauthorizedException,
    InternalServerErrorException,
    UseGuards,
    Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';
import { SupabaseGuard } from './guards/supabase.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(
        @Body() createAuthDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { session } =
            await this.authService.signUpWithEmailAndPassword(createAuthDto);

        if (!session) {
            throw new InternalServerErrorException('Error creating user');
        }

        res.cookie('access_token', session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: session.expires_in * 1000,
        }).cookie('refresh_token', session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: session.expires_in * 1000,
        });
    }

    @Get('login')
    async loginWithEmail(
        @Body() createAuthDto: CreateUserDto,
        @Res() res: Response,
    ) {
        const { session } =
            await this.authService.signInWithEmailAndPassword(createAuthDto);

        if (!session) {
            throw new UnauthorizedException('Invalid email or password');
        }

        res.cookie('access_token', session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: session.expires_in * 1000,
        }).cookie('refresh_token', session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: session.expires_in * 1000,
        });
    }

    @Get('github')
    async githubLogin() {
        console.log('GITHUB LOGIN');
        return await this.authService.signInWithGithub();
    }

    @Get('github/callback')
    async githubCallback(
        @Query('code') code: string,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        console.log('CODE', code);

        if (!code) {
            throw new BadRequestException('No code provided');
        }

        // Delete this line and destructuring session of the token
        const token = await this.authService.handleAuthCallback(code);

        if (!token) {
            throw new InternalServerErrorException('Error signing in user');
        }

        const { session } = token;

        console.log(token);
        console.log(req.originalUrl);

        res.cookie('access_token', session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: session.expires_in * 1000,
        })
            .cookie('refresh_token', session.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: session.expires_in * 1000,
            })
            .redirect(`${process.env.FRONTEND_URL}`);
    }

    @Get('google')
    async googleLogin() {
        console.log('GOOGLE LOGIN');
        return await this.authService.signInWithGoogle();
    }

    @Get('google/callback')
    async googleCallback(
        @Query('code') code: string,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        console.log('CODE', code);

        if (!code) {
            throw new BadRequestException('No code provided');
        }

        // Delete this line and destructuring session of the token
        const token = await this.authService.handleAuthCallback(code);

        if (!token) {
            throw new InternalServerErrorException('Error signing in user');
        }

        const { session } = token;

        console.log(token);
        console.log(req.originalUrl);

        res.cookie('access_token', session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 1000,
        })
            .cookie('refresh_token', session.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: (session.expires_in + session.expires_in) * 1000,
            })
            .redirect(`${process.env.FRONTEND_URL}`);
    }

    @Post('refresh-token')
    async refreshToken(
        @Body()
        {
            refresh_token,
        }: {
            refresh_token: string;
        },
        @Res() res: Response,
    ) {
        const { session } = await this.authService.refreshToken(refresh_token);

        if (!session) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        res.cookie('access_token', session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 1000,
        }).cookie('refresh_token', session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: (session.expires_in + session.expires_in) * 1000,
        });
    }

    // Delete this endpoint when finished of the guard test

    @UseGuards(SupabaseGuard)
    @Get('test-guards')
    async testGuards(@Req() req: Request) {
        console.log('COOKIES', req.cookies);
        console.log('Headers Cookie', req.headers.cookie, req.headers.cookies);
        console.log('USER', req.user);
        console.log('Haciendo pruebas de cookies guardadas');
        return 'Guards OK';
    }
}
