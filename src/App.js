import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SeminarDetails from './components/seminarDetails'
import firebase from 'firebase'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  simpleAction = (event) => {
    this.props.simpleAction();
    
   }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true});
      } else {
        this.setState({isLoggedIn: false});
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">  
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <Route exact path="/" component={Home} />
        <Route path="/seminar-details" component={SeminarDetails}/>
        <Route path="/login" component={Login} />

        {/* <p className="App-intro">
        <button onClick={this.simpleAction}>I agree</button>
        <pre>
          {
            JSON.stringify(this.props)
          }
          </pre>
        </p> */}
      </div>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })
export default connect(mapStateToProps, mapDispatchToProps)(App);