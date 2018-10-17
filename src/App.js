import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SeminarDetails from './components/seminarDetails'
import CreateSeminarForm from './components/CreateSeminarForm'
import MySeminars from './components/MySeminars'
import MySeminarDetails from './components/MySeminarDetails'

class App extends Component {
  render() { 
    return (
      <BrowserRouter>
      <div className="App">  
        <Navbar/>
        <div style={{width:'80%', margin:'auto'}}>
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