
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAugOQazvxh5ddxT6gikuYiuOTMMQF9ckA",
  authDomain: "crwn-clothing-db-12512.firebaseapp.com",
  projectId: "crwn-clothing-db-12512",
  storageBucket: "crwn-clothing-db-12512.appspot.com",
  messagingSenderId: "1088478807445",
  appId: "1:1088478807445:web:46c578db75e133fbeda29c"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);