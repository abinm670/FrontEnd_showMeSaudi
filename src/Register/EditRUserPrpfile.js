import React, { Component } from 'react';
import {CustomInput,Form,FormGroup, Label, Input,Col,Row,Button} from 'reactstrap';
import '../App.css';
import axios from 'axios'
import ReactPhoneInput from "react-phone-input-2";
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';

class EditRUserPrpfile extends Component{
  constructor(props){
    super(props);
    this.state={
      rate:  0,
      raters: 0,
      firstName:"",
      lastName: "",
      address:"",
      img:"",
      price:"",
      AboutMe:"",
      comment: [] ,
      id:this.props.match.params.id,
      startDate: new Date(),
      editing:false, 
      save:false,
      //x:localStorage.getItem('usertoken'),
      //user:"",
      //userInf:this.props.match.params.id
    }
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }


  componentDidMount() {
    this.setState({user: jwt_decode(localStorage.usertoken).user})
      }
      
      //helper functions that change state
      edit()
      {

        this.setState({editing:true});
        alert("now editing");
      }
     
      save()
      {
        this.setState({editing:false});
        //call the method below to update and tarnsfer the data to the back-end  
        this.onsubmitTheStateToEdit()
        //juts for testing 
        alert("now saving value ");
      }  
      handleOnChange = value => {
        console.log(value);
        this.setState({ phone: value }, () => {
          console.log(this.state.phone);
        });}



  changeTheStateForform = (e)=>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }

    // EDIT PROFILE 
onsubmitTheStateToEdit = ()=>{
  axios.put("http://localhost:7000/api/r-user_edit/"+this.state.user._id, this.state)
  .then((res) =>
  {
    
    console.log("what data do u have ", res)
  } 
)
  .catch(err => console.log(err))
}

    render(){
      console.log("hello" ,this.state.user)

        return(
      <dev>
        <br/><br/><br/><br/><br/>
          <h2 className="title"> Edit Profile </h2>
          <br/><br/>
         <Form>
       <Row>
       <Col>
         <FormGroup className="col-md-10">
             <Label for="First Name">First Name :</Label>
             <Input type="text" className="input" name="firstName" onChange={this.changeTheStateForform} defaultValue={this.state.firstName}/>
         </FormGroup>
       </Col>
       <Col>
         <FormGroup className="col-md-10">
             <Label for="Last Name">Last Name :</Label>
             <Input type="text" className="input" name="lastName" onChange={this.changeTheStateForform} defaultValue={this.state.lastName}/>
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
        <Label for="examplePassword">Password :</Label>
        <Input type="password" name="password" id="newPassword" placeholder="new password" onChange={this.changeTheStateForform} />
      </FormGroup>
      </Col>
      </Row>
      
      {/* <Button variant="outline-warning" onClick={this.onsubmitTheStateToEdit}>Update</Button> */}
      <Link to="/" className="NavLink"><Button variant="outline-warning" onClick={this.save}>Save</Button></Link>
        
        </Form>
      </dev>
        )
    }

}

export default EditRUserPrpfile;
