import Rebase from 're-base'
import firebase from 'firebase'
import uuid from 'uuid/v4'

//Initialise Firebase
const DB_CONFIG = {
    apiKey: "AIzaSyDKwSoUn-wqWF3rpKiqupGUKnzTGegZjbQ",
    authDomain: "uts-seminars.firebaseapp.com",
    databaseURL: "https://uts-seminars.firebaseio.com",
    storageBucket: "uts-seminars.appspot.com"
};

firebase.initializeApp(DB_CONFIG);
const database = firebase.database();


export const addSeminarToFirebase = (title) =>{
    const id = uuid();
    database.ref('seminars').child(`/${id}`).set({
        title, id
    })
}

export const removeSeminarFromFirebase = (id) => {
    database(`/${id}`).remove();
}


export const getSeminarsFromFirebase = () => {
    // var seminars = database.ref('seminars').once("value");
    // console.log("seminars: ");
    // console.log(seminars);
    var leadsRef = database.ref('seminars');
    var seminars = [];
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
        seminars.push(childData);
        });
    });
    this.setState = seminars;
    console.log(seminars);
    return seminars;


}

export default database;