import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/simpleAction'
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

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

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180
  },
});

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
    // uid: "",
    // displayname: "",
    // loginEmail: "",
    // // Fields for database user collection
    // name: "",
    // email: "",
    // phone: "",
    // // Confirmation Message
    // message: ""
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
          // if (user != null) {
          //   //Pull existing firebase login data
          //   this.setState({
          //     uid: user.uid,
          //     displayname: user.displayName,
          //     loginEmail: user.email
          //   })
          //   //Pull existing user data from user collection
          //   const db = firebase.firestore();
          //   db.doc('users/'+this.state.uid).get().then(doc => this.setState({
          //     name: doc.data().name,
          //     email: doc.data().email,
          //     phone: doc.data().phone
          //   }))
          //   // console.log(this.state);
          //   // if (this.state.name != this.state.displayname || this.state.email != this.state.loginEmail) {
          //   //   //New user/corrupted data -- update DB
          //   //   const db = firebase.firestore();
          //   //   db.settings({
          //   //     timestampsInSnapshots: true
          //   //   });

          //   //   db.doc('users/'+this.state.uid).set({
          //   //       name: this.state.displayname,
          //   //       email: this.state.loginEmail,
          //   //       //phone: this.state.phone
          //   //   });
          //   //  }
          // } else {
          //   // No user selected
          //   this.setState({
          //     uid: "",
          //     displayname: "",
          //     loginEmail: "",
          //     name: "",
          //     email: "",
          //     phone: ""
          //   })
          // }

        });  
        
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  // updateInput = e => {
  //   this.setState({
  //       [e.target.name]: e.target.value,
  //       message: ""
  //   });
  // }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const db = firebase.firestore();
  //   db.settings({
  //     timestampsInSnapshots: true
  //   });
  //   // Add updated details to user collection
    
  //   db.doc('users/'+this.state.uid).set({
  //       name: this.state.name,
  //       email: this.state.email,
  //       phone: this.state.phone
  //   });
  //   // Update details in firebase login data
  //   var user = firebase.auth().currentUser;
    
  //   // --- Update Email - Removed From Scope ---
  //   // user.updateEmail(this.state.email).then(function() {
  //   //   //success
  //   //   //console.log(user.email);
  //   // }).catch(function(err){ 
  //   //   //error
  //   //   console.log("ERROR -- Updating Email")
  //   // });

  //   user.updateProfile({
  //     displayName: this.state.name
  //   }).then(function(){
  //     //success
  //     //console.log(user.displayName);
  //   }).catch(function(err) {
  //     //error
  //     console.log("ERROR -- Updating Display Name")
  //   });
  //   this.setState({message: "Details Successfully Updated!"});
  // }


 render() {
  const {classes} = this.props;
  // const { name, phone } = this.state;
  // const isEnabled = this.state.name != '' && this.state.phone != '';

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
      <Redirect to="/"></Redirect>
      // <div>
      //   <h1>Welcome {this.state.displayname}!</h1>
      //   {/* <p>Please update your details if necessary</p>
      //   <FormControl className={classes.formControl}>
      //     <div>
      //       <FormLabel component="legend">Email</FormLabel>
      //       <input
      //         type="text"
      //         name="email"
      //         placeholder="example@gmail.com"
      //         value={this.state.email}
      //         disabled={true}
      //       />
      //     </div>
      //     <div>
      //     <FormLabel component="legend">Display Name</FormLabel>

      //       <input
      //         type="text"
      //         name="name"
      //         placeholder="Full Name"
      //         onChange={this.updateInput}
      //         value={this.state.name}
      //       />
      //     </div>
          
      //     <div>
      //       <FormLabel component="legend">Phone Number</FormLabel>
      //       <input
      //         type="text"
      //         name="phone"
      //         placeholder="0412345678"
      //         onChange={this.updateInput}
      //         value={this.state.phone}
              
      //       />
      //     </div>
      //     <hr/>
      //     <Button disabled={!isEnabled} variant="contained" color="primary" className={classes.Button} onClick={this.handleSubmit}>Submit</Button>
      //   </FormControl>
      //   <p>{this.state.message}</p> */}
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })
export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles))(Login)

