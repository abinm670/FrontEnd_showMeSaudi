import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link, withRouter
} from 'react-router-dom';
import NavbarMain from './components/Navbar'
import Footer from './components/Footer'


class App extends Component {
  render() {


    return (
      <Router>
      <div className='body'>
        
        <NavbarMain />

      
        <Footer/>

      </div>
      </Router>
    );
  }
} 
export default App;