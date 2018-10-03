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
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;




// export const addSeminarToFirebase = (title) =>{
//     const id = uuid();
//     database.ref('seminars').child(`/${id}`).set({
//         title, id
//     })
// }

// export const removeSeminarFromFirebase = (id) => {
//     database(`/${id}`).remove();
// }


// export const getSeminarsFromFirebase = () => {
//     // var seminars = database.ref('seminars').once("value");
//     // console.log("seminars: ");
//     // console.log(seminars);
//     var leadsRef = database.ref('seminars');
//     var seminars = [];
//     leadsRef.on('value', function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//         var childData = childSnapshot.val();
//         console.log(childData);
//         seminars.push(childData);
//         });
//     });
//     this.setState = seminars;
//     console.log(seminars);
//     return seminars;


// }

