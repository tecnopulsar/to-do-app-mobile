// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt2JnXRHK7OMn_gHa1HnuCoPTPUVm-5rg",
  authDomain: "to-do-app-cc099.firebaseapp.com",
  projectId: "to-do-app-cc099",
  storageBucket: "to-do-app-cc099.appspot.com",
  messagingSenderId: "753022023206",
  appId: "1:753022023206:web:0eeadc14ab8395d797d8e7",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
