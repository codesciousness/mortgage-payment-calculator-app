import { Application } from 'express';
import { saveLoan } from './queries';
import { rateLimiter } from '../rate-limiter';

export const router = (app: Application) => {
    app.post('/loans', rateLimiter, saveLoan);
};