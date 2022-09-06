
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAg7gBlE7U9uA67vJwSKfjMW5Td9RPuIqc",
    authDomain: "cio-clothes.firebaseapp.com",
    projectId: "cio-clothes",
    storageBucket: "cio-clothes.appspot.com",
    messagingSenderId: "471354747320",
    appId: "1:471354747320:web:fdf0c10e5da658ae26474d",
    measurementId: "G-SPS72NZVY0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
  