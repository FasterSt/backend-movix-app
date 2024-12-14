import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { SupabaseService } from 'src/supabase.service';

@Injectable()
export class AuthService {
    constructor(private supabaseService: SupabaseService) {}

    async signUpWithEmailAndPassword(dto: CreateUserDto) {
        const res = await this.supabaseService.signUpWithEmail({
            email: dto.email,
            password: dto.password,
        });
        return {
            user: res.user,
            session: res.session,
        };
    }

    async signInWithEmailAndPassword(dto: CreateUserDto) {
        const res = await this.supabaseService.signInWithEmail({
            email: dto.email,
            password: dto.password,
        });
        return res;
    }

    async signInWithGithub() {
        return await this.supabaseService.signInWithGithub();
    }

    async signInWithGoogle() {
        return await this.supabaseService.signInWithGoogle();
    }

    async handleAuthCallback(code: string) {
        console.log('code', code);
        return await this.supabaseService.handleAuthCallback(code);
    }

    async refreshToken(refresh_token: string) {
        return await this.supabaseService.refreshToken(refresh_token);
    }

    async getUser(userId: string) {
        return await this.supabaseService.getUser(userId);
    }
}
