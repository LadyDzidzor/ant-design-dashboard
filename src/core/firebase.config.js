import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC0nFwb3mLQETwQZlI32wztY0dLDuPL0bE",
  authDomain: "tendo-reseller-app.firebaseapp.com",
  databaseURL: "https://tendo-reseller-app.firebaseio.com",
  projectId: "tendo-reseller-app",
  storageBucket: "tendo-reseller-app.appspot.com",
  messagingSenderId: "441131609632",
  appId: "1:441131609632:web:2668365b7772799d891645",
  measurementId: "G-830QR3E03C",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const Storage = firebase.storage();

export { Storage, firebase as default };
