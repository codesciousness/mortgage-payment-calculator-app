import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'react-native-dotenv';

const firebaseConfig = {
  apiKey: process.env._FIREBASE_API_KEY,
  authDomain: process.env._FIREBASE_AUTH_DOMAIN,
  projectId: process.env._FIREBASE_PROJECT_ID,
  storageBucket: process.env._FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env._FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env._FIREBASE_APP_ID,
  measurementId: process.env._FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;