import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SeminarDetails from './components/seminarDetails'
import CreateSeminarForm from './components/CreateSeminarForm'
import MySeminars from './components/MySeminars'
import MySeminarDetails from './components/MySeminarDetails'
import firebase from 'firebase'

class App extends Component {
  constructor(props) {
    super(props);
    //this.state = {isLoggedIn: false};
  }

  simpleAction = (event) => {
    this.props.simpleAction();
    
   }

  componentDidMount() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({isLoggedIn: true});
    //   } else {
    //     this.setState({isLoggedIn: false});
    //   }
    // });
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">  
        <Navbar/>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/seminar-details/:id" component={SeminarDetails} />
        <Route path="/my-seminars" component={MySeminars} />
        <Route path="/my-seminar-details/:id" component={MySeminarDetails} />
        <Route path="/create-seminar" component={CreateSeminarForm} />


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