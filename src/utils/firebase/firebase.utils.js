
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut
} from 'firebase/auth';

import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAugOQazvxh5ddxT6gikuYiuOTMMQF9ckA",
  authDomain: "crwn-clothing-db-12512.firebaseapp.com",
  projectId: "crwn-clothing-db-12512",
  storageBucket: "crwn-clothing-db-12512.appspot.com",
  messagingSenderId: "1088478807445",
  appId: "1:1088478807445:web:46c578db75e133fbeda29c"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation) => {
    if(!userAuth) return;
    const userDocRef = doc(db,'users', userAuth.uid);
    console.log('userAuthDoc'+userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log('userSnapShot ',userSnapShot.exists());

    if(!userSnapShot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error creating the user',error.message)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth,email,password);
}

export const signinAuthWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async () => await signOut(auth);