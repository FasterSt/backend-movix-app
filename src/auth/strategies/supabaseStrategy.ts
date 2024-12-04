import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { SupabaseAuthStrategy, SupabaseAuthUser } from 'nestjs-supabase-auth';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
    SupabaseAuthStrategy,
    'supabase',
) {
    constructor() {
        super({
            supabaseUrl: process.env.SUPABASE_URL_PROJECT,
            supabaseKey: process.env.SUPABASE_KEY,
            supabaseOptions: {},
            supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: SupabaseAuthUser): Promise<SupabaseAuthUser> {
        console.log('validating');
        const res = super.validate(payload);
        return res;
    }

    authenticate(req: Request): void {
        console.log('REQ', JSON.stringify(req.cookies));
        console.log('REQ2', req.headers);
        console.log('authenticate');
        const res = super.authenticate(req);
        console.log('authenticate', res);
        return res;
    }
}
