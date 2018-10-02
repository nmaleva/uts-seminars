import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SeminarDetails from './components/seminarDetails'
import { getSeminarsThunk} from './store'
import CreateSeminarForm from './components/CreateSeminarForm'



class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
   }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/seminar-details/:id" component={SeminarDetails} />
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