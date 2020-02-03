import React from "react";
import {
  Navbar,
  NavbarBrand,
  Container,
} from "reactstrap";
import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from '../containers/Home'
import Packages from '../containers/Packages'
import Contact from '../containers/Contact'
import TourGuys from '../containers/TourGuys'
import SignIn from '../Register/SignIn'
import About from '../containers/About'
import SignUp from '../Register/SignUp'
import TourGuyProfile from '../containers/TourGuyProfile'
import Comment from '../components/Footer'
import EditRUserPrpfile from '../Register/EditRUserPrpfile'
import jwt_decode from 'jwt-decode'


class NavbarMain extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      wether: '',
      icon: ''
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logout() {
    localStorage.clear();
    window.location.href = '/';
}
  render() {
    return (
      <Router>
        <Navbar
          color="faded"
          dark
          expand="md"
          fixed={`top`}
          className="navDark"
        >
        <Container className="AppIc">
          <NavbarBrand> <img src={'https://image.flaticon.com/icons/svg/1373/1373039.svg'} width="50" height="50" /> <span className='NavJed'>ShowMeSaudi</span></NavbarBrand>
        </Container>
       <Container>
          <NavbarBrand> <Link to="/" className="NavLink">Home</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/TourGuys" className="NavLink">Tour Guys</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/Packages" className="NavLink">Packages</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/SignIn" className="NavLink">Sign In</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/About" className="NavLink">About Us</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/contact" className="NavLink">Contact</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/EditRUserPrpfile" className="NavLink">Edit Prpfile</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/" className="NavLink">Sign Out</Link> </NavbarBrand>
        </Container>
        </Navbar>
        <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/TourGuys" component={TourGuys} />
        <Route path="/Packages" component={Packages} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/About" component={About} />
        <Route path="/Contact" component={Contact} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/TourGuyProfile/:id" component={TourGuyProfile} />
        <Route path="/Comment" component={Comment} />
        <Route exact path="/TourGuys/:city" component={TourGuys} />
        {/* <Route path="/EditRUserPrpfile" component={EditRUserPrpfile} /> */}

        </div>
      </Router>  
    );
  }
}
export default NavbarMain;