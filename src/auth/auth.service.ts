import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
    private supabaseClient: SupabaseClient;

    constructor() {
        this.supabaseClient = createClient(
            process.env.SUPABASE_URL_PROJECT,
            process.env.SUPABASE_KEY,
        );
    }

    async signUpUser(dto: CreateUserDto) {
        const res = await this.supabaseClient.auth.signUp({
            email: dto.email,
            password: dto.password,
        });
        return res;
    }

    async signInWithGithub() {
        return await this.supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
            },
        });
    }

    async exchangeCodeForToken(code: string) {
        return await this.supabaseClient.auth.exchangeCodeForSession(code);
    }

    // async createAuth(createAuthDto: CreateAuthDto) {
    //   const { email, password } = createAuthDto;
    //   const { data, error } = await this.SupabaseClient.auth.signUp({
    //     email,
    //     password,
    //   });
    //   if (error) {
    //     throw new Error(error.message);
    //   }
    //   return data;
    // }

    // async updateAuth(updateAuthDto: UpdateAuthDto) {
    //   const { email, password } = updateAuthDto;
    //   const { data, error } = await this.SupabaseClient.auth.updateUser({
    //     email,
    //     password,
    //   });
    //   if (error) {
    //     throw new Error(error.message);
    //   }
    //   return data;
    // }
}
