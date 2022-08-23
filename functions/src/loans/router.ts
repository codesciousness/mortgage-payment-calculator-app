import { Application } from 'express';
import { saveLoan } from './queries';

export const router = (app: Application) => {
    app.post('/loans', saveLoan);
};