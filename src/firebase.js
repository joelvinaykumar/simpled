import firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyBYz278IQuf0ytwHYiIFWqR5l8cx_O3-m8",
  authDomain: "simpled-dev.firebaseapp.com",
  databaseURL: "https://simpled-dev.firebaseio.com",
  projectId: "simpled-dev",
  storageBucket: "simpled-dev.appspot.com",
  messagingSenderId: "339107922375",
  appId: "1:339107922375:web:393131b67713b82a0f19e2",
  measurementId: "G-B6QZ4BTYFW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;