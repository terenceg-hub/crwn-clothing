import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCISOnMIILrZQBroah74pfqSBQ2hEzXvxs",
    authDomain: "crwn-db-772c6.firebaseapp.com",
    databaseURL: "https://crwn-db-772c6.firebaseio.com",
    projectId: "crwn-db-772c6",
    storageBucket: "crwn-db-772c6.appspot.com",
    messagingSenderId: "593053788939",
    appId: "1:593053788939:web:d696036854beb44133900e",
    measurementId: "G-B5VGW18D5P"
  };

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
