import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


//Initialise Firebase
const DB_CONFIG = {
    apiKey: "AIzaSyDKwSoUn-wqWF3rpKiqupGUKnzTGegZjbQ",
    authDomain: "uts-seminars.firebaseapp.com",
    databaseURL: "https://uts-seminars.firebaseio.com",
    projectId: "uts-seminars",
    storageBucket: "uts-seminars.appspot.com",
    messagingSenderId: "886017151358"
};

firebase.initializeApp(DB_CONFIG);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;