import {
    ConflictException,
    GatewayTimeoutException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnsupportedMediaTypeException,
} from '@nestjs/common';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabaseClient: SupabaseClient;
    constructor() {
        // this.supabaseClient = createClient(
        //     process.env.SUPABASE_URL_PROJECT,
        //     process.env.SUPABASE_KEY,
        // {
        //     cookies: {
        //         getAll() {
        //             return parseCookieHeader();
        //         },
        //     },
        // },
        // {
        //     auth: {
        //         autoRefreshToken: true,
        //         persistSession: true,
        //     },
        // },
        // );
        this.supabaseClient = createServerClient(
            process.env.SUPABASE_URL_PROJECT,
            process.env.SUPABASE_KEY,
            {
                cookies: {
                    getAll() {
                        return parseCookieHeader('');
                    },
                },
            },
        );
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

    async getUser(jwt: string) {
        const {
            data: { user },
            error,
        } = await this.supabaseClient.auth.getUser(jwt);

        if (error) {
            throw new NotFoundException(error.message);
        }

        return user;
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
