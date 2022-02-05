import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; //for database
import "firebase/compat/auth"; //for authentication

const config = {
  apiKey: "AIzaSyCaH1uyCUxCjA2lhgQE2ZTRMElrzP3rgDA",
  authDomain: "crwn-db-a4b1d.firebaseapp.com",
  projectId: "crwn-db-a4b1d",
  storageBucket: "crwn-db-a4b1d.appspot.com",
  messagingSenderId: "480407696200",
  appId: "1:480407696200:web:4b03762427cf91b047397d",
  measurementId: "G-BWEPXX20NB",
};

firebase.initializeApp(config); //Initializing the app with the above config
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

export const auth = firebase.auth(); //assigning to const auth and exporting it to use in other parts of the app
export const firestore = firebase.firestore(); //assigning to const firestore and exporting it to use in other parts of the app

const provider = new firebase.auth.GoogleAuthProvider(); //Gives access to Google Authentication class from the authentication library
provider.setCustomParameters({ prompt: "select_account" }); //Triggers google pop up whenever we use this google auth provider for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider); //provider is used for signing in with google

export default firebase;
