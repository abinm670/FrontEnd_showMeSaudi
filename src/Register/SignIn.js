import React, { Component } from 'react';
import {Container,CustomInput, Col, Form,FormGroup, Label, Input,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios'
import '../App.css';
import jwt_decode from 'jwt-decode'
class SignIn extends Component {
  state = {
    status: false,
    api: "http://localhost:7000/api/r-login"
  }
  tInfo(e) {
    // e.preventDefault()
    console.log(this.state.api + "this.state.api")
    this.setState({ api: "http://localhost:7000/api/t-login" })
  }
  rInfo(e) {
    // e.preventDefault()   
    console.log(this.state.api + "this.state.api")
    this.setState({ api: "http://localhost:7000/api/r-login" })
  }
  handleChange(e) {
    this.setState({ status: !this.state.status })
    if (!this.state.status) {
      this.tInfo(e);
    }
    else {
      this.rInfo(e)
    }
  }
  changeTheStateForform = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onsubmitTheStateToPosted = () => {
    axios.post(this.state.api, this.state)
      .then(
        (res) => {
          console.log(res)
          localStorage.setItem('usertoken', res.data.token)
          var user = jwt_decode(res.data.token)
          console.log(user)
          //for log
          this.props.showLogOut()
          if (user.user.tourType === "regUser") {
            this.props.history.push("./");
          }
          else {
            console.log("Tour user");
            this.props.history.push("./TourGuyProfile/" + user.user._id)
          }
        })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <Container className="SpaceUp">
        <h2 className="title">Sign In</h2>
        <br />
        <Form className="form" onSubmit={this.onsubmitTheStateToPosted}>
          <Col>
            <FormGroup className="col-md-10">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                onChange={this.changeTheStateForform} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="col-md-10">
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                onChange={this.changeTheStateForform} />
            </FormGroup>
            <CustomInput type="switch" id="exampleCustomSwitch2" name="tourType" label="Tour" onChange={(e) => this.handleChange(e)} />
          </Col>
          <Button className="log" onClick={this.onsubmitTheStateToPosted} > Sign In</Button>{'  '}
          <Link to="/SignUp"><Button className='log'>SignUp</Button></Link>
          {/* <a href="SignUp"> SignUp</a>  */}
        </Form>
      </Container>
    );
  }
}
export default SignIn;