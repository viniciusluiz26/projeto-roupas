import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/compat/auth';        // for authentication
import 'firebase/compat/storage';     // for storage
import { getDatabase, ref, child, get } from 'firebase/compat/database';    // for realtime database
 import { getFirestore } from 'firebase/firestore';   // for cloud firestore
import 'firebase/compat/messaging';   // for cloud messaging
import 'firebase/compat/functions';   // for cloud functions



const firebaseConfig = {
  apiKey: "AIzaSyDfmU_GcCW8YnkCke54Gwf9USiRg-p57gM",
  authDomain: "cadastro-sac.firebaseapp.com",
  databaseURL: "https://cadastro-sac-default-rtdb.firebaseio.com",
  projectId: "cadastro-sac",
  storageBucket: "cadastro-sac.appspot.com",
  messagingSenderId: "458598414917",
  appId: "1:458598414917:web:8d54f9188fce5834c7412c",
  measurementId: "G-XZG8MPCBR6"
};

export const fireDb = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(fireDb);

export default fireDb.database().ref()

