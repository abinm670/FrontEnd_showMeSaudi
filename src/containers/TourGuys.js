import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from '../DB' //Import the file where the data is stored.
import { Container, Row , Col} from 'react-bootstrap/';
import Rater from 'react-rater';
import {
  Link
} from 'react-router-dom';
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

    const DisplayAllTourGuys = this.state.firstName.map((n, index) => {
      return <div key={index} className='Card'>
        <div className='ContainerHomeCity'>
          <Col>
            <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
              {/* Add onClick event handler to the name and an image of the place */}
              <Card.Img variant="top" src={this.state.image[index]} width="250" height="250" />
              <Card.Body>
                <span></span>
                <Link to={"/TourGuyProfile/" + this.state.id[index]}>{this.state.firstName[index] + " " + this.state.lastName[index]}</Link>
                <Card.Body>{this.state.cityShow[index]}</Card.Body>
                <Card.Body>{this.state.rate[index]}</Card.Body>
                <Card.Body>{this.state.price[index]}<img src={sr} width="40" height="30" />Per 1 hours</Card.Body>

                {/* <Rater >{this.state.rate[index]}</Rater>total={5} rating={3} interactive={false} style={{cursor:'pointer'}} /> */}
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    })
    return (
      <div>
        <div className='ContainerHomeSearch'>
          <img className='TourGuyHomeImg' src={'https://i.postimg.cc/CMcw8xKf/Screen-Shot-2020-01-28-at-2-18-16-PM.png'} width="100%" height="500px" />
          <div className="searchCont">
            <p className='HomeText2'>Privileged Access With The Best Tour Guys</p>
          </div>
        </div>
        <Container className='Cont'>
          {DisplayAllTourGuys}
        </Container>
      </div>
    )
  }
}
export default TourGuys;