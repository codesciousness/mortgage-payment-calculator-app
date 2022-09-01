import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import FirebaseFunctionsRateLimiter from 'firebase-functions-rate-limiter';

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const db = admin.firestore();
    const config = {
        name: 'rateLimiter',
        periodSeconds: 15,
        maxCalls: 2
    };
    const limiter = FirebaseFunctionsRateLimiter.withFirestoreBackend(
        config,
        db
    );
    try {
        await limiter.rejectOnQuotaExceededOrRecordUsage();
        return next();
    }
    catch(err: any) {
        const error = err.message.substring(36, 77);
        return res.status(400).send(error);
    };
};