import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvKFVCd2ylkJd3vObuLcxZQ4flCIVAqtg",
  authDomain: "toldyounottotell.firebaseapp.com",
  projectId: "toldyounottotell",
  storageBucket: "toldyounottotell.firebasestorage.app",
  messagingSenderId: "20301742943",
  appId: "1:20301742943:web:03f96844d536f54916acea"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);