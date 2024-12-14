import {
    MiddlewareConsumer,
    Module,
    RequestMethod,
    Scope,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseService } from 'src/supabase.service';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './strategies/supabaseStrategy';
import { Request, Response } from 'express';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        // {
        //     provide: SupabaseService,
        //     scope: Scope.REQUEST,
        //     useFactory: (req: Request, res: Response) =>
        //         new SupabaseService(req, res),
        //     inject: [Request, Response],
        // },
        SupabaseService,
        SupabaseStrategy,
    ],
    exports: [AuthService, SupabaseService, SupabaseStrategy],
})
export class AuthModule {}
