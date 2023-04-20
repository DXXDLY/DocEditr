
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdQLckyAjaaFEXv5uf4hW_ecRgVHPUqCk",
  authDomain: "todo-35f91.firebaseapp.com",
  projectId: "todo-35f91",
  storageBucket: "todo-35f91.appspot.com",
  messagingSenderId: "407045593453",
  appId: "1:407045593453:web:f50de5e63e596958f66264",
  measurementId: "G-NV8JLPMJD2"
};
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)