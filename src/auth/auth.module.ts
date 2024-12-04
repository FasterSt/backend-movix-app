import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseService } from 'src/supabase.service';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './strategies/supabaseStrategy';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [AuthService, SupabaseService, SupabaseStrategy],
    exports: [AuthService, SupabaseService, SupabaseStrategy],
})
export class AuthModule {}
