import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { AuthService } from 'src/auth/auth.service';
import { SupabaseService } from 'src/supabase.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [MeController],
    providers: [MeService, AuthService, SupabaseService],
})
export class MeModule {}
