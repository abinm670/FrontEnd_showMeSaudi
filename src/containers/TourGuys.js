import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from '../DB' //Import the file where the data is stored.
import { Container, Row } from 'react-bootstrap/';
import Rater from 'react-rater';
import { Link } from 'react-router-dom';
import axios from 'axios'
import sr from "../img/sr.png"

class TourGuys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: [],
      lastName: [],
      cityShow: [],
      image: [],
      rate: [],
      raters: [],
      price: [],
      id: [],
      city: this.props.match.params.city
    }
  }
  componentDidMount() {
    this.setState({ city: this.props.match.params.city })
    //console.log(this.state.city)
    if (this.state.city == undefined) {
      console.log("outside tour guys in city")
      axios.get("http://localhost:7000/api/t-users")
        .then(res => {
          for (let i in res.data) {
            this.setState({ firstName: this.state.firstName.concat(res.data[i].firstName) })
            this.setState({ lastName: this.state.lastName.concat(res.data[i].lastName) })
            this.setState({ cityShow: this.state.cityShow.concat(res.data[i].city) })
            this.setState({ image: this.state.image.concat(res.data[i].image) })
            this.setState({ rate: this.state.rate.concat(res.data[i].rate) })
            this.setState({ raters: this.state.raters.concat(res.data[i].raters) })
            this.setState({ price: this.state.price.concat(res.data[i].price) })
            this.setState({ id: this.state.id.concat(res.data[i]._id) })
          }
          //console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    ////////////////////////////////////////
    else {
      console.log("inside tour guys in city")
      //console.log(this.props.match.params.city)
      //console.log(this.state.city)
      axios.get("http://localhost:7000/api/t-users/" + this.state.city)
        .then(res => {
          for (let i in res.data) {
            this.setState({ firstName: this.state.firstName.concat(res.data[i].firstName) })
            this.setState({ lastName: this.state.lastName.concat(res.data[i].lastName) })
            this.setState({ cityShow: this.state.cityShow.concat(res.data[i].city) })
            this.setState({ image: this.state.image.concat(res.data[i].image) })
            this.setState({ rate: this.state.rate.concat(res.data[i].rate) })
            this.setState({ raters: this.state.raters.concat(res.data[i].raters) })
            this.setState({ price: this.state.price.concat(res.data[i].price) })
            this.setState({ id: this.state.id.concat(res.data[i]._id) })
          }
          //console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  
  render() {
    return (
      <div>
        <div className='ContainerHomeSearch'>
          <img className='TourGuyHomeImg' src={'https://i.postimg.cc/CMcw8xKf/Screen-Shot-2020-01-28-at-2-18-16-PM.png'} width="100%" height="50%" />
          <div className="searchCont">
            <p className='HomeText'>Privileged Access With The Best Tour Guys</p>
          </div>
        </div>
        <br></br>
        {this.DisplayAllTourGuys()}
        <br></br>
      </div>
    );
  }
  DisplayAllTourGuys() {
    return (
      <div>
        <div className='ContainerHomeCity'>
          {this.state.firstName.map((n, index) => (
            <div className="col mb-4">
              <div>
                <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
                  {/* Add onClick event handler to the name and an image of the place */}
                  <Card.Img variant="top" src={this.state.image[index]} width="250" height="250" />
                  <Card.Body>
                    <span></span>
                    <Link to={"/TourGuyProfile/" + this.state.id[index]}>{this.state.firstName[index] + " " + this.state.lastName[index]}</Link>
                    <Card.Body>{this.state.cityShow[index]}</Card.Body>
                    <Card.Body><Rater total={5} rating={this.state.rate[index] / this.state.raters[index]} interactive={false} /></Card.Body>
                      {/* {this.showRate()}</Card.Body> */}
                    <Card.Body>{this.state.price[index]}<img src={sr} width="40" height="30" />Per 1 hours</Card.Body>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // showRate(e) {
  //   this.state.rate.map((n, index) => (
  //     if(this.state.rate[index]/ this.state.raters[index] > 0)
  //     return (<h6>{parseFloat(this.state.rate[index] / this.state.raters[index]).toFixed(1)} Stars</h6>)  
  //   ));
  // }
}
export default TourGuys;