import Rebase from 're-base'
import firebase from 'firebase'

//Initialise Firebase
const DB_CONFIG = {
    apiKey: "AIzaSyDKwSoUn-wqWF3rpKiqupGUKnzTGegZjbQ",
    authDomain: "uts-seminars.firebaseapp.com",
    databaseURL: "https://uts-seminars.firebaseio.com",
    storageBucket: "uts-seminars.appspot.com"
};

const app = firebase.initializeApp(DB_CONFIG)
const base = Rebase.createClass(app.database())

export{ app, base }