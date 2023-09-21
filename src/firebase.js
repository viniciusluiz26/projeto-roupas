import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/compat/auth';        // for authentication
import 'firebase/compat/storage';     // for storage
import { getDatabase, ref, child, get } from 'firebase/compat/database';    // for realtime database
 import { getFirestore } from 'firebase/firestore';   // for cloud firestore
import 'firebase/compat/messaging';   // for cloud messaging
import 'firebase/compat/functions';   // for cloud functions



const firebaseConfig = {
  apiKey: "AIzaSyAZQINy_ZzRoGWdOJipCDmIYYfuXOLOSks",
  authDomain: "projeto-roupas.firebaseapp.com",
  databaseURL: "https://projeto-roupas-default-rtdb.firebaseio.com",
  projectId: "projeto-roupas",
  storageBucket: "projeto-roupas.appspot.com",
  messagingSenderId: "926463005388",
  appId: "1:926463005388:web:baf9450b3e298ab32ae869"
};

export const fireDb = firebase.initializeApp(firebaseConfig);

// export const db = getFirestore(fireDb);

export default fireDb.database().ref()

