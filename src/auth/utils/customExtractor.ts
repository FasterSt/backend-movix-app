import { Request } from 'express';

export function customTokenExtractor(req: Request): string | null {
    const authHeader = req.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
        return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    const token = parts[1];
    return token && token !== 'undefined' ? token : null;
}
