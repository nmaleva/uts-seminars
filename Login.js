import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/simpleAction'
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from "@material-ui/core/FormControl"

// var config = {
//   apiKey: "AIzaSyDKwSoUn-wqWF3rpKiqupGUKnzTGegZjbQ",
//   authDomain: "uts-seminars.firebaseapp.com",
//   databaseURL: "https://uts-seminars.firebaseio.com",
//   storageBucket: "uts-seminars.appspot.com",
// };
// firebase.initializeApp(config);

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });

class Login extends Component {
  constructor(props) {
    super(props);
    
    
  }
  simpleAction = (event) => {
    this.props.simpleAction();
   }

   // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    // Fields for firebase login
    uid: "",
    displayname: "",
    loginEmail: "",
    // Fields for database user collection
    name: "",
    email: "",
    phone: "",
    // Confirmation Message
    message: ""
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    },
    // Disables 'Account Manager'
    'credentialHelper': firebaseui.auth.CredentialHelper.NONE
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          this.setState({
            isSignedIn: !!user, 
          })
          if (user != null) {
            //Pull existing firebase login data
            this.setState({
              uid: user.uid,
              displayname: user.displayName,
              loginEmail: user.email
            })
            //Pull existing user data from user collection
            const db = firebase.firestore();
            db.doc('users/'+this.state.uid).get().then(doc => this.setState({
              name: doc.data().name,
              email: doc.data().email,
              phone: doc.data().phone
            }))
          } else {
            // No user selected
            this.setState({
              uid: "",
              displayname: "",
              loginEmail: "",
              name: "",
              email: "",
              phone: ""
            })
          }
        });  
        
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  updateInput = e => {
    this.setState({
        [e.target.name]: e.target.value,
        message: ""
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    // Add updated details to user collection
    db.doc('users/'+this.state.uid).set({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
    });
    // Update details in firebase login data
    var user = firebase.auth().currentUser;
    user.updateEmail(this.state.email).then(function() {
      //success
    }).catch(function(err){ 
      //error
      console.log("ERROR -- Updating Email")
    });
    user.updateProfile({
      displayName: this.state.name
    }).then(function(){
      //success
    }).catch(function(err) {
      //error
      console.log("ERROR -- Updating Display Name")
    });
    this.setState({message: "Details Successfully Updated!"});
  }


 render() {
 

  if (!this.state.isSignedIn) {
    return (
      <div>
        <h1>UTS Seminars</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
    return (
      <div>
        <h1>UTS Seminars</h1>
        <p>Welcome! You are now signed-in!</p>
        <p>Please update your details if necessary</p>
        <form >
          <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={this.updateInput}
            value={this.state.name}
          />
          </div>
          <div>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={this.updateInput}
            value={this.state.email}
          />
          </div>
          <div>
          <input
            type="text"
            name="phone"
            placeholder="0412345678"
            onChange={this.updateInput}
            value={this.state.phone}
          />
          </div>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }
  // return (
  //  <div className="App">

  //   {/* <p className="App-intro">

  //    <button onClick={this.simpleAction}>I agree</button>
  //    <pre>
  //     {
  //       JSON.stringify(this.props)
  //     }
  //     </pre>
  //   </p> */}
  //  </div>
  // );
}

const mapStateToProps = state => ({
  ...state
 })
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })
export default connect(mapStateToProps, mapDispatchToProps)(Login);
