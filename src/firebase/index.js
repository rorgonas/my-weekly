import firebase from 'firebase';
import env from './config';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.CONFIG.VUE_APP_API_KEY,
  authDomain: env.CONFIG.VUE_APP_AUTH_DOMAIN,
  databaseURL: env.CONFIG.VUE_APP_DATABASE_URL,
  projectId: env.CONFIG.VUE_APP_PROJECT_ID,
  storageBucket: env.CONFIG.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: env.CONFIG.VUE_APP_MESSAGING_SENDER_ID,
  appId: env.CONFIG.VUE_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
