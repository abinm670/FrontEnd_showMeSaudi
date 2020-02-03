import guide from '../DB' //Import the file where the data is stored.
import React, { Component } from 'react';
import SignIn from './SignIn'
import {
  Container,CustomInput, Col,Row, Form,FormText,
  FormGroup, Label, Input,
  Button,DropdownButton,Dropdown,InputGroupButtonDropdown,
  InputGroupDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,Nav,NavItem
} from 'reactstrap';
import {Tab,Tabs} from 'react-bootstrap';
import {
    Link
   } from 'react-router-dom';
import '../App.css';
import 'react-phone-number-input/style.css';
import ReactPhoneInput from "react-phone-input-2";
import axios from 'axios'
// import { Right } from 'react-bootstrap/lib/Media';
import FileUpload from '../FileUpload';


class SignUp extends Component {
    state={
        status: false,
        send: false,
        userDate:[],
        phone: "",
        api:"http://localhost:7000/api/newRuser"
    }
    showInfo(e){
        // e.preventDefault()
        this.setState({api:"http://localhost:7000/api/newTuser" })
    console.log(this.state.api)
      }
    hideInfo(e){
        // e.preventDefault()
        this.setState({api:"http://localhost:7000/api/newRuser"})
        console.log(this.state.api)
      }
    handleChange(e) {
        this.setState({status: !this.state.status})
        if(!this.state.status){this.showInfo()}
        else {this.hideInfo()}
      }
    
    handleOnChange = value => {
        console.log(value);
        this.setState({ phone: value }, () => {
          console.log(this.state.phone);
        });}

    //yasser type her
      changeTheStateForform = (e)=>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }
      onsubmitTheStateToPosted = ()=>{
        axios.post( this.state.api,this.state)
        .then(res => 
          {console.log(res)

        this.setState({send:true})
      
      }
      
        
    )
        
        .catch(err => console.log(err))
      }
  render() {
    // console.log(this.state)

    if(!this.state.send)
{
  return (
    <div >
      <br/><br/><br/><br/><br/>
      <h2 className="title">Sign Up</h2>
      <br/><br/>
      <Tabs fill variant="tabs" defaultActiveKey="R" id="Tab" onClick={(e)=>this.handleChange(e)} >
  <Tab eventKey="T" title="Tour User" >
  <Form className="SignUp" onSubmit ={this.onsubmitTheStateToPosted}> 
    <Row>
      <Col>
        <FormGroup className="col-md-10">
            <Label for="First Name">First Name :</Label>
            <Input type="text" name="firstName" id="First Name" placeholder="Enter your First Name"  onChange={this.changeTheStateForform}/>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup className="col-md-10">
            <Label for="Last Name">Last Name :</Label>
            <Input type="text" name="lastName" id="Last Name" placeholder="Enter your Last Name" onChange={this.changeTheStateForform}/>
        </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="Phone Number">Phone Number: </Label>
        <ReactPhoneInput inputExtraProps={{name: "phone",required: true,autoFocus: true}}
          defaultCountry={"sa"} value={this.state.phone} placeholder="+966" onChange={this.handleOnChange}/>
      </FormGroup>
      </Col>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="exampleEmail">Email :</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"  onChange={this.changeTheStateForform}/>
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
        <Input type="password" name="password_confirmation" id="password_confirmation" onChange={this.changeTheStateForform}/>
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
          <CustomInput method="post" action="/upload" enctype="multipart/form-data" type="file" name="img" id="exampleFile" label="Please choose your Personal photo" onChange={this.changeTheStateForform}  />
      </FormGroup>
      </Col>

      </Row> 

      <Col>
      <Button onClick ={this.onsubmitTheStateToPosted} > Submit </Button>
      <Link to="/SignIn"><Button className='log'>Sign In</Button></Link>
      </Col>
    </Form>
  </Tab>
  <Tab eventKey="R" title="Regular User" >
  <Form className="SignUp" onSubmit ={this.onsubmitTheStateToPosted}> 
    <Row>
      <Col>
        <FormGroup className="col-md-10">
            <Label for="First Name">First Name :</Label>
            <Input type="text" name="firstName" id="First Name" placeholder="Enter your First Name"  onChange={this.changeTheStateForform}/>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup className="col-md-10">
            <Label for="Last Name">Last Name :</Label>
            <Input type="text" name="lastName" id="Last Name" placeholder="Enter your Last Name" onChange={this.changeTheStateForform}/>
        </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="Phone Number">Phone Number: </Label>
        <ReactPhoneInput inputExtraProps={{name: "phone",required: true,autoFocus: true}}
          defaultCountry={"sa"} value={this.state.phone} placeholder="+966" onChange={this.handleOnChange}/>
      </FormGroup>
      </Col>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="exampleEmail">Email :</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"  onChange={this.changeTheStateForform}/>
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
        <Input type="password" name="password_confirmation" id="password_confirmation" onChange={this.changeTheStateForform}/>
      </FormGroup>
      </Col>
      </Row>
      <FormGroup>
      <Col>
      <Button onClick ={this.onsubmitTheStateToPosted} > Submit </Button>
      <Link to="/SignIn"><Button className='log'>Sign In</Button></Link>
      </Col>
      </FormGroup>
      </Form> 
  </Tab>
</Tabs>
 
    </div>
  );
      }
      else{
        return(         
           // eslint-disable-next-line react/jsx-no-undef         
           <SignIn />  
        )
      }
}

}

export default SignUp;


