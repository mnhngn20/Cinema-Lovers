import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAjXOiBjFoQ8KFlFolctnns5BeHKIua4Mw",
    authDomain: "cinema-lovers-506de.firebaseapp.com",
    databaseURL: "https://cinema-lovers-506de-default-rtdb.firebaseio.com",
    projectId: "cinema-lovers-506de",
    storageBucket: "cinema-lovers-506de.appspot.com",
    messagingSenderId: "887588241776",
    appId: "1:887588241776:web:95421a1415248aaf62cfb5"
  };
firebase.initializeApp(firebaseConfig)
export const database = firebase.database();
export const storage = firebase.storage()

