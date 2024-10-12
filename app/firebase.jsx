import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwhdcRpt1StKVskEuaycOb7GzhMrmOIYA",
  authDomain: "cyberbazaar-6909f.firebaseapp.com",
  projectId: "cyberbazaar-6909f",
  storageBucket: "cyberbazaar-6909f.appspot.com",
  messagingSenderId: "1074672598848",
  appId: "1:1074672598848:web:5d1be96210649c9d9184a5",
  databaseURL: "https://cyberbazaar-6909f-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, database, storage };
