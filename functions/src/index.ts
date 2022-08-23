import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import { Express } from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import { router } from './loans/router';
import { sendEmail } from './loans/sendEmail'
import 'dotenv/config';

admin.initializeApp();

const app: Express = express();

//Add middleware for rate limiting requests
const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per window (per 15 minutes)
	standardHeaders: true, // Return rate limit info in the "RateLimit-*" headers
	store: new MemoryStore()
});

app.use(rateLimiter);
app.use(cors({ origin: true }));
app.use(bodyParser.json());
router(app);

export const api = functions.https.onRequest(app);

exports.sendEmail = functions.firestore.document('loans/{loanId}').onWrite(sendEmail);