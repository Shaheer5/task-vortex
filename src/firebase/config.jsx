import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDOdQu2AGRW4skLfCG3gy4FPlaXP3weXK4",
    authDomain: "taskvortex-1b612.firebaseapp.com",
    projectId: "taskvortex-1b612",
    storageBucket: "taskvortex-1b612.appspot.com",
    messagingSenderId: "392003510104",
    appId: "1:392003510104:web:33e3005979900a682b4f2d"
  };


//   init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;
const projectStorage = firebase.storage();

export { projectFirestore, projectAuth, timestamp, projectStorage }