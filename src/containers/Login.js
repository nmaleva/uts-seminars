import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom'

class Login extends Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
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
      });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }



  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>UTS Seminars</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
    return (
      <Redirect to="/"></Redirect>
    );
  }
}

export default Login;

