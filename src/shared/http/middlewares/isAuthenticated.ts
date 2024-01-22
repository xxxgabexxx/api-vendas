import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
):void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT Token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret)
        
        return next();
    } catch {
        throw new AppError('Invalid JWT Token');
    }
}
