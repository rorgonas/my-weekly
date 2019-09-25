import firebase from 'firebase';
import env from './config';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.measurementId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
