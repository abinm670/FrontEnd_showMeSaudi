import React, { Component } from 'react';
import SignIn from './SignIn'
import {
  Container, CustomInput, Col, Row, Form, FormText,
  FormGroup, Label, Input,
  Button, DropdownButton, Dropdown, InputGroupButtonDropdown,
  InputGroupDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Nav, NavItem

} from 'reactstrap';
import { Tab, Tabs } from 'react-bootstrap';
import {
  Link
} from 'react-router-dom';
import '../App.css';
import 'react-phone-number-input/style.css';
import ReactPhoneInput from "react-phone-input-2";
import axios from 'axios'
// import { Right } from 'react-bootstrap/lib/Media';
import { storage } from '../firebase';

import Home from '../containers/Home'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      moreInfo: "",
      status: false,
      send: false,
      userDate: [],
      phone: "",

      country: "",
      api: "http://localhost:7000/api/newRuser"
    }
  }
  showInfo(e) {
    // e.preventDefault()
    this.setState({ api: "http://localhost:7000/api/newTuser" })
    console.log(this.state.api)
  }
  hideInfo(e) {
    // e.preventDefault()
    this.setState({ api: "http://localhost:7000/api/newRuser" })
    console.log(this.state.api)
  }
  handleChange(e) {
    this.setState({ status: !this.state.status })
    if (!this.state.status) { this.showInfo() }
    else { this.hideInfo() }
  }

  handleOnChange = value => {
    console.log(value);
    this.setState({ phone: value }, () => {
      console.log(this.state.phone);
    });
  }

  //yass
  changeTheStateForform = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onsubmitTheStateToPosted = () => {
    axios.post(this.state.api, this.state)
      .then(res => {
        console.log(res)
        this.setState({ send: true })
        
      })
      .catch(err => console.log(err))

      
  }

  //img
  handleChangeImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }

  handleUpload = () => {
    console.log("handleupload");
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({ image: url });
          this.setState({ url: url });
        })
      });
  }
  render1() {

    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };

    
      return (
        <div >
          <br /><br /><br /><br /><br />
          <h2 className="title">Sign Up</h2>
          <br /><br />
          <Tabs fill variant="tabs" defaultActiveKey="R" id="Tab" onClick={(e) => this.handleChange(e)} >
            <Tab eventKey="T" title="Tour User" >
              <Form className="SignUp" onSubmit={this.onsubmitTheStateToPosted}>
                <Row>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="First Name">First Name :</Label>
                      <Input type="text" name="firstName" id="First Name" placeholder="Enter your First Name" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="Last Name">Last Name :</Label>
                      <Input type="text" name="lastName" id="Last Name" placeholder="Enter your Last Name" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="Phone Number">Phone Number: </Label>
                      <ReactPhoneInput inputExtraProps={{ name: "phone", required: true, autoFocus: true }}
                        defaultCountry={"sa"} value={this.state.phone} placeholder="+966" onChange={this.handleOnChange} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="exampleEmail">Email :</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="examplePassword">Password :</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="examplePassword">Confirm Password :</Label>
                      <Input type="password" name="password_confirmation" id="password_confirmation" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="exampleSelectMulti">City</Label>
                      <Input type="select" name="city" id="exampleSelect" onChange={this.changeTheStateForform}>
                        <option name="Riyadh" value="Riyadh" >Riyadh</option>
                        <option name="Jeddah" value="Jeddah">Jeddah</option>
                        <option name="Al-Ola" value="Al-Ola">Al-Ola</option>
                        <option name="Al-khobar" value="Al-khobar" >Al-khobar</option>
                        <option name="Abha" value="Abha">Abha</option>
                        <option name="Jazan" value="Jazan">Jazan</option>
                        <option name="Az Zulfi" value="Az Zulfi">Az Zulfi</option>
                        <option name="Makkah" value="Makkah">Makkah</option>
                        <option name="Al-Madinah" value="Al-Madinah">Al-Madinah</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="exampleFile">Personal Picture</Label>
                      <Col>
                        <FormGroup tag="fieldset">
                          <div style={style}>
                            <progress value={this.state.progress} max="100" />
                            <br />
                            <input type="file" name="image" onChange={(e) => {
                              this.handleChangeImage(e)
                              setTimeout(() => {
                                this.handleUpload()
                              }, 1000);
                            }} />
                            <br />
                            <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
                          </div>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <Col>
                  <Button onClick={this.onsubmitTheStateToPosted} > Submit </Button>
                  <Link to="/SignIn"><Button className='log'>Sign In</Button></Link>
                </Col>
              </Form>
            </Tab>
            <Tab eventKey="R" title="Regular User" >
              <Form className="SignUp" onSubmit={this.onsubmitTheStateToPosted}>
                <Row>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="First Name">First Name :</Label>
                      <Input type="text" name="firstName" id="First Name" placeholder="Enter your First Name" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="Last Name">Last Name :</Label>
                      <Input type="text" name="lastName" id="Last Name" placeholder="Enter your Last Name" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="Phone Number">Phone Number: </Label>
                      <ReactPhoneInput inputExtraProps={{ name: "phone", required: true, autoFocus: true }}
                        defaultCountry={"sa"} value={this.state.phone} placeholder="+966" onChange={this.handleOnChange} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="exampleEmail">Email :</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup className="col-md-10">
                      <Label for="examplePassword">Password :</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={this.changeTheStateForform} />
                    </FormGroup>
                  </Col>

                  {/* <Col>
        <FormGroup className="col-md-10">
            <Label for="Last Name">Country :</Label>
            <Input type="text" name="country" value={this.state.country} id="Last Name" placeholder="Enter your Last Country" onChange={this.handleOnChange}/>
        </FormGroup>
      </Col> */}

                  {/* <Col>
      <FormGroup className="col-md-10">
        <Label for="examplePassword">Confirm Password :</Label>
        <Input type="password" name="password_confirmation" id="password_confirmation" onChange={this.changeTheStateForform}/>
      </FormGroup>
      </Col> */}
                </Row>
                <FormGroup>
                  <Col>
                    <Button onClick={this.onsubmitTheStateToPosted} > Submit </Button>
                    <Link to="/SignIn"><Button className='log'>Sign In</Button></Link>
                  </Col>
                </FormGroup>
              </Form>
            </Tab>
          </Tabs>

        </div>
      );
    }
    renderLog()
    {
       
      return (
        // eslint-disable-next-line react/jsx-no-undef 

       
       
        <div>
           <br/> <br/> <br/> <br/> <br/> <br/>
          
          
        Thank you for registering with us : Your registeration is completed       
          
        
          <Link to="/SignIn"><Button className='log'>Please click her to sigin in</Button></Link>
        </div>
      )
    }

render()
{
    if (!this.state.send) 
    

      return this.render1() 
      
      else 


    return this.renderLog()   
}
}

export default SignUp;


