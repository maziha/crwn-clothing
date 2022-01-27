import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCaH1uyCUxCjA2lhgQE2ZTRMElrzP3rgDA",
  authDomain: "crwn-db-a4b1d.firebaseapp.com",
  projectId: "crwn-db-a4b1d",
  storageBucket: "crwn-db-a4b1d.appspot.com",
  messagingSenderId: "480407696200",
  appId: "1:480407696200:web:4b03762427cf91b047397d",
  measurementId: "G-BWEPXX20NB",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
