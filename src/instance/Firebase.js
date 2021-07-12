import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import env from "react-dotenv";

const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    databaseURL: env.DATABASE_URL,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSANGING_SENDER_ID,
    appId: env.APP_ID
  };
firebase.initializeApp(firebaseConfig)
export const database = firebase.database();
export const storage = firebase.storage()

