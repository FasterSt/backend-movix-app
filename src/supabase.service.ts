import {
    ConflictException,
    GatewayTimeoutException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Req,
    Res,
    // Request,
    // Response,
    Scope,
    UnsupportedMediaTypeException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader,
} from '@supabase/ssr';
// import { SupabaseClient } from '@supabase/supabase-js';
import { Request, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabaseClient: SupabaseClient;
    // @Inject(REQUEST) private readonly req: Request
    constructor() {
        this.supabaseClient = createClient(
            process.env.SUPABASE_URL_PROJECT,
            process.env.SUPABASE_KEY,
            {
                auth: {
                    detectSessionInUrl: true,
                    flowType: 'pkce',
                },
            },
        );
        // this.supabaseClient = createServerClient(
        //     process.env.SUPABASE_URL_PROJECT,
        //     process.env.SUPABASE_KEY,
        //     {
        //         cookies: {
        //             getAll() {
        //                 return parseCookieHeader('');
        //             },
        //             setAll() {},
        //         },
        //     },
        // );
    }

    getSupabaseClient() {
        return this.supabaseClient;
    }

    async signUpWithEmail({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        const supabaseClient = this.getSupabaseClient();
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return {
            user: data.user,
            session: data.session,
        };
    }

    async signInWithEmail({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        const { data, error } =
            await this.supabaseClient.auth.signInWithPassword({
                email,
                password,
            });
        if (error) {
            throw new NotFoundException(error.message);
        }
        return data;
    }

    async signInWithGithub() {
        const { data, error } = await this.supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${process.env.BACKEND_URL}/api/auth/github/callback`,
            },
        });

        if (error) {
            throw new UnsupportedMediaTypeException(error.message);
        }

        return data;
    }

    async signInWithGoogle() {
        const { data, error } = await this.supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.BACKEND_URL}/api/auth/google/callback`,
            },
        });

        if (error) {
            throw new UnsupportedMediaTypeException(error.message);
        }

        return data;
    }

    async handleAuthCallback(code: string) {
        console.log('CODE', code);
        const { data, error } =
            await this.supabaseClient.auth.exchangeCodeForSession(code);

        if (error) {
            console.log('ERROR', error);
            throw new ConflictException(error.message);
        }

        return {
            user: data.user,
            session: data.session,
        };
    }

    async signOut(jwt: string) {
        const { error } = await this.supabaseClient.auth.admin.signOut(jwt);

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return { message: 'Signed out successfully' };
    }

    async getUser(userId: string) {
        const { error, data } = await this.supabaseClient
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            throw new NotFoundException(error.message);
        }

        return data;
    }

    async refreshToken(refresh_token: string) {
        const { error, data } = await this.supabaseClient.auth.refreshSession({
            refresh_token,
        });

        if (error) {
            throw new GatewayTimeoutException(error.message);
        }

        return data;
    }
}
