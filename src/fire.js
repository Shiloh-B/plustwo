import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

 var firebaseConfig = {
  apiKey: "AIzaSyALCidbmeAw9GxCaTXJyJiKtrJxzwZmKmU",
  authDomain: "plustwo-bc36f.firebaseapp.com",
  projectId: "plustwo-bc36f",
  storageBucket: "plustwo-bc36f.appspot.com",
  messagingSenderId: "25611444965",
  appId: "1:25611444965:web:824e658c96ee8f6ed8ea0c"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;