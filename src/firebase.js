import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBYz278IQuf0ytwHYiIFWqR5l8cx_O3-m8",
  authDomain: "simpled-dev.firebaseapp.com",
  databaseURL: "https://simpled-dev.firebaseio.com",
  projectId: "simpled-dev",
  storageBucket: "simpled-dev.appspot.com",
  messagingSenderId: "339107922375",
  appId: "1:339107922375:web:5dc5eab2b67df1930f19e2",
  measurementId: "G-GFXSPQST24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;