import React, { Component } from 'react';
import {
  Container, CustomInput, Col, Form, FormText,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import '../App.css';
import axios from 'axios'
import jwt_decode from 'jwt-decode'

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      x: localStorage.getItem('usertoken'),
      user: "",
      tourGuy: [],
      regUser: [],
      date: [],
      id: []
    }
  }
  componentDidMount() {
    // console.log("x"+this.state.x)
    this.setState({ user: jwt_decode(this.state.x) })
  }

  onsubmitBook = () => {
    console.log(this.state.user.user.firstName + " " + this.state.user.user.lastName)
    if (this.state.user.user.tourType === "regUser") {
      axios.get(`http://localhost:7000/api/r-booking/` + this.state.user.user._id)
        .then(response => {
          console.log(response);
          for (let i in response.data) {
            this.setState({ id: this.state.id.concat(response.data[i]._id) })
            this.setState({ tourGuy: this.state.tourGuy.concat(response.data[i].tourGuy) })
            this.setState({ date: this.state.date.concat(response.data[i].date) })
          }
        });
    }
    //tourGuy
    else if (this.state.user.user.tourType === "tourUser") {
      axios.get(`http://localhost:7000/api/t-booking/` + this.state.user.user._id)
        .then(response => {
          console.log(response);
          for (let i in response.data) {
            // console.log("i am in for2")
            this.setState({ id: this.state.id.concat(response.data[i]._id) })
            this.setState({ regUser: this.state.regUser.concat(response.data[i].regUser) })
            this.setState({ date: this.state.date.concat(response.data[i].date) })
          }
        });
    }
    //no user
    else {
      console.log("you should login");
    }
  }



  cancelBook = (BookidTocancel) => {
    if (this.state.user.user.tourType === "regUser") {
      console.log(BookidTocancel + "BookidTocancel")
      axios.delete(`http://localhost:7000/api/r-booking/delete/` + BookidTocancel)
        .then(response => {
          console.log(response);
        });
    }

    //tourGuy
    else if (this.state.user.user.tourType === "tourUser") {
      console.log(BookidTocancel + "BookidTocancel")
      axios.delete(`http://localhost:7000/api/t-booking/delete/` + BookidTocancel)
        .then(response => {
          console.log(response);
        });
    }
  }
  render() {
    // if()
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <div><Button onClick={this.onsubmitBook} size="sm" > all Book </Button></div>
        {this.DisplayBooks()}
      </div>
    )
  }

  DisplayBooks() {
    return (
      <div>
        <div>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <h2 className="text-center"> Books </h2>
        <div>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="row row-cols-3 row-cols-md-2">
          {this.state.date.map((n, index) => (
            <div className="col mb-4">
              <div >
                <p>{this.state.tourGuy[index]}</p>
                <p>{this.state.regUser[index]}</p>
                <p>{this.state.date[index]}</p>
                <button onClick={() => this.cancelBook(this.state.id[index])}>Cancel this book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};
export default Booking;