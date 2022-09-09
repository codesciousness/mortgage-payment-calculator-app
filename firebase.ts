import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  _FIREBASE_API_KEY,
  _FIREBASE_AUTH_DOMAIN,
  _FIREBASE_PROJECT_ID,
  _FIREBASE_STORAGE_BUCKET,
  _FIREBASE_MESSAGING_SENDER_ID,
  _FIREBASE_APP_ID,
  _FIREBASE_MEASUREMENT_ID
} from '@env';

const firebaseConfig = {
  apiKey: _FIREBASE_API_KEY,
  authDomain: _FIREBASE_AUTH_DOMAIN,
  projectId: _FIREBASE_PROJECT_ID,
  storageBucket: _FIREBASE_STORAGE_BUCKET,
  messagingSenderId: _FIREBASE_MESSAGING_SENDER_ID,
  appId: _FIREBASE_APP_ID,
  measurementId: _FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;