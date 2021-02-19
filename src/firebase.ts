import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCnSiQpo7yp6JvDv1T_k5KNZTS4AzvhNSo",
  authDomain: "twitter-app-48895.firebaseapp.com",
  projectId: "twitter-app-48895",
  storageBucket: "twitter-app-48895.appspot.com",
  messagingSenderId: "733778084344",
  appId: "1:733778084344:web:e940dcb3695fb5b943560d"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

export const db=firebaseApp.firestore();
export const auth=firebaseApp.auth();
export const storage=firebaseApp.storage();
export const provider=new firebase.auth.GoogleAuthProvider();