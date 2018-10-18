import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Navbar from './containers/Navbar'
import SeminarDetails from './containers/SeminarDetails'
import CreateSeminarForm from './containers/CreateSeminarForm'
import MySeminars from './containers/MySeminars'
import MySeminarDetails from './containers/MySeminarDetails'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div style={{ width: '80%', margin: 'auto' }}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/seminar-details/:id" component={SeminarDetails} />
            <Route path="/my-seminars" component={MySeminars} />
            <Route path="/my-seminar-details/:id" component={MySeminarDetails} />
            <Route path="/create-seminar" component={CreateSeminarForm} />
          </div>
        </div>
      </BrowserRouter>

    );

  }
}

export default App;