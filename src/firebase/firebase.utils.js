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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
