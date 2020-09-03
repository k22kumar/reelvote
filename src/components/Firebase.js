import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCku0CL-1JzPVdi-8qzYwUJifsPzKbgsRc",
  authDomain: "shoppies-116db.firebaseapp.com",
  databaseURL: "https://shoppies-116db.firebaseio.com",
  projectId: "shoppies-116db",
  storageBucket: "shoppies-116db.appspot.com",
  messagingSenderId: "76445350094",
  appId: "1:76445350094:web:189725267c077875eb789f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
