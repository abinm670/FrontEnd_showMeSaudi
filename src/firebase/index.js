import firebase from 'firebase/app'
import 'firebase/storage'

  var firebaseConfig = {
    apiKey: "AIzaSyAKxnmU0dDaM4ygMjmb7bcBEk9somRxHwY",
    authDomain: "showmesaudi.firebaseapp.com",
    databaseURL: "https://showmesaudi.firebaseio.com",
    projectId: "showmesaudi",
    storageBucket: "showmesaudi.appspot.com",
    messagingSenderId: "842852217186",
    appId: "1:842852217186:web:2424e3b072cb88810f7c3b",
    measurementId: "G-NCMKXLBW5C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage=firebase.storage();

  export {
      storage, firebase as default
  }