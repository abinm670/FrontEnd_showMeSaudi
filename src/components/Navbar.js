// 


import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import "../App.css";
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
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
import Booking from '../containers/Booking'
class NavbarMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logedin: false
    };
  }
  // jwt_decode
  componentDidMount() {
    this.showLogOut()
    // console.log(jwt_decode(localStorage.usertoken).user.tourType)
    localStorage.usertoken ? this.setState({ logedin: true, tourType: jwt_decode(localStorage.usertoken).user.tourType }) : this.setState({ logedin: false })
    console.log(this.state.tourType)
  }
  logout = () => {
    window.localStorage.clear();
    this.setState({ logedin: false });
    this.props.history.push('/')
  }
  showLogOut = () => {
    this.setState({
      logedin: true
    })
  }
  render() {
    console.log(this.state.tourType)
    return (
      <>
        <Navbar color="faded" dark expand="md" fixed={`top`} className="navDark" >
          <Container className="AppIc">
            <NavbarBrand> <img src={'https://image.flaticon.com/icons/svg/1373/1373039.svg'} width="50" height="50" /> <span className='NavJed'>ShowMeSaudi</span></NavbarBrand>
          </Container>
          <Container>
            <NavbarBrand> <Link to="/" className="NavLink">Home</Link> </NavbarBrand>
            <NavbarBrand><div className="NavLink">|</div></NavbarBrand>
            <NavbarBrand> <Link to="/TourGuys" className="NavLink">Tour Guys</Link> </NavbarBrand>
            <NavbarBrand><div className="NavLink">|</div></NavbarBrand>
            <NavbarBrand> <Link to="/Packages" className="NavLink">Packages</Link> </NavbarBrand>
            <NavbarBrand><div className="NavLink">|</div></NavbarBrand>
            <NavbarBrand>{(this.state.logedin && this.state.tourType == "regUser") ? <Link to="/EditRUserPrpfile" className="NavLink">Edit Profile</Link> : ""}</NavbarBrand>
            {/* switch login and out */}
            <NavbarBrand><div className="NavLink">|</div></NavbarBrand>
            <NavbarBrand> {this.state.logedin ?<Link to="/manageBooking" className="NavLink">My booking</Link> : ""}</NavbarBrand>
            <NavbarBrand><div className="NavLink">|</div></NavbarBrand>
            <NavbarBrand> <Link to="/About" className="NavLink">About Us</Link> </NavbarBrand>
            <NavbarBrand><div className="NavLink">|</div></NavbarBrand>
            <NavbarBrand> <Link to="/contact" className="NavLink">Contact</Link> </NavbarBrand>
            <NavbarBrand><div className="NavLink">|</div></NavbarBrand>
            <NavbarBrand > {this.state.logedin ? <Link to="/" className="NavLink" onClick={this.logout}>Sign Out</Link> : <Link to="/SignIn" className="NavLink">Sign In</Link>} </NavbarBrand>
          </Container>
        </Navbar>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/TourGuys" component={TourGuys} />
          <Route path="/Packages" component={Packages} />
          {/* for log */}
          <Route path="/SignIn" render={(props) => <SignIn   {...props} showLogOut={this.showLogOut} />} />
          <Route path="/About" component={About} />
          <Route path="/Contact" component={Contact} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/TourGuyProfile/:id" component={TourGuyProfile} />
          <Route path="/Comment" component={Comment} />
          <Route exact path="/TourGuys/:city" component={TourGuys} />
          <Route path="/EditRUserPrpfile" component={EditRUserPrpfile} />
          <Route path="/manageBooking" component={Booking} />
        </div></>
    );
  }
}
export default withRouter(NavbarMain)