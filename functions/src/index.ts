import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import { Express } from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { router } from './loans/router';
import { sendEmail } from './loans/sendEmail'
import 'dotenv/config';

admin.initializeApp();

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
router(app);

export const api = functions.https.onRequest(app);

exports.sendEmail = functions.firestore.document('loans/{loanId}').onWrite(sendEmail);