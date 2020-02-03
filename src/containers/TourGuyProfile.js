import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
// import '../../node_modules/bulma/css/bulma.css'
import guide from '../DB' //Import the file where the data is stored.
import {Link} from 'react-router-dom';
import { Container, Row,Col, Button} from 'react-bootstrap/';
import {Form, FormGroup,CustomInput, Label, Input, FormText } from 'reactstrap';
import Rater from 'react-rater';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css';
import ReactPhoneInput from "react-phone-input-2";
import d from "../img/d.png"


class TourGuyProfile  extends Component {
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
      x:localStorage.getItem('usertoken'),
     user:""
    }
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
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

  changeTheStateForform = (e)=>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  componentDidMount() {
    this.setState({user: jwt_decode(this.state.x)})
    axios.get(`http://localhost:7000/api/t-user/`+this.props.match.params.id)
      .then(response => {
        //console.log(response);
          this.setState({firstName: response.data.firstName})
          this.setState({lastName: response.data.lastName} )
          this.setState({city: response.data.city})
          this.setState({img: response.data.img} )
          this.setState({rate: response.data.rate} )
          this.setState({price: response.data.price} )
          this.setState({AboutMe: response.data.AboutMe} )
          this.setState({id: response.data._id} )
      }).catch((err)=> console.log("data has not been recived"));


  ////////////////////////////// Comment api
  axios.get(`http://localhost:7000/api/t-comment/`+this.props.match.params.id) 
  .then(res => {
    this.setState({comments: res.data})
  })
  .catch((error) => {
    console.log(error)
  })
}

onsubmitTheStateToPosted = ()=>{
var x=localStorage.getItem('usertoken');
var user =  jwt_decode(x)
console.log(this.state.id)
console.log(user.user._id)
console.log(this.state.comment)
axios.post("http://localhost:7000/api/r-comment/"+this.state.id+"/"+user.user._id,this.state)
.then(res => console.log(res))
.catch(err => console.log(err))
console.log("posted")
}

changeTheStateForform = (e)=>{
console.log("inside add comment")
this.setState({
[e.target.name] : e.target.value
})
console.log("changeTheStateForform!!")
}

    //Booking
    onsubmitTheStateToBook = ()=>{ 
      if (this.state.startDate==null){
        alert("please select date")
      }
      else{
        var datetoB=this.state.startDate.toDateString();
        axios.post("http://localhost:7000/api/r-booking/"+this.state.id+"/"+this.state.user.user._id+"/"+datetoB,this.state)
        .then(
          (res) =>{ 
            console.log(res)
          })
        .catch(err => console.log(err))
      } 
    }
// EDIT PROFILE 
onsubmitTheStateToEdit = ()=>{
  axios.put("http://localhost:7000/api/t-user_edit/"+this.props.match.params.id, this.state)
  .then((res) =>
  {
    console.log("what data do u have ", res)
  } 
)
  .catch(err => console.log(err))
}
// // EDIT Rating 
// ratingEdit = ()=>{
//   axios.put("http://localhost:7000/api/t-user_edit/"+this.state.id, this.state)
//   .then((res) =>
//   {
//     console.log("what data do u have ", res)
//   } 
// )
//   .catch(err => console.log(err))
// }

  
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  addComment(c){
    this.setState({comment: this.state.comment.push[c]} )

  }

  showRate(e){
  if(this.state.rate/this.state.raters > 0)
  return (<h6>{ parseFloat(this.state.rate/this.state.raters).toFixed(1) } Stars</h6>)
}
handleChange = date => {
  this.setState({
    startDate: date
  });
};

renderEdit()
{
return(
  
<div  className="central">
  <h2 className="title"> Edit Proile </h2> 
  {/* add img latter  */}
    {/* <figure><img src={this.state.img} alt="" class="img-thumbnail" /></figure> */}
    
      <Form>
      <Row>
      <Col>
      <FormGroup className="col-md-10">
        <img src={d} alt="" class="img-thumbnail" />
          <Label for="exampleFile">Change Personal Picture :</Label>
          <CustomInput method="post" action="/upload" enctype="multipart/form-data" type="file" name="img" id="exampleFile" label="Please choose your Personal photo" onChange={this.changeTheStateForform}  />
        
      </FormGroup>
      </Col>
      </Row>
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
      <Row>
      <Col>
      <FormGroup className="col-md-10">
                <Label for="exampleText">About Me ..</Label>
                <Input type="textarea" className="input" name="AboutMe" onChange={this.changeTheStateForform} defaultValue={this.state.AboutMe}/>
      </FormGroup>
      </Col>
      <Col>
      <FormGroup className="col-md-10">
            <Label for="Price">Price per Hour :</Label>
            <Input type="text" className="input" name="price" onChange={this.changeTheStateForform}
      defaultValue={this.state.price}/>
      </FormGroup>
      </Col>
      </Row>
      <FormGroup className="col-md-10"> 
                <Label for="exampleText">Add  package to your profile: </Label>
                <Input type="textarea" name="activity1" id="activity1" placeholder="Please Enter your First activity" name="packName" onChange={this.changeTheStateForform}/><br/>
                <Input type="textarea" name="activity2" id="activity2" placeholder="Please Enter your Second activity" name="packName" onChange={this.changeTheStateForform} /><br/>
                <Input type="textarea" name="activity3" id="activity3" placeholder="Please Enter your Third activity" name="packName" onChange={this.changeTheStateForform}/><br/>
      </FormGroup> 
      {/* <p>
        Add  package to your profile:
      <strong> Package Name:</strong>
      <input type="text" className="input" name="packName" onChange={this.changeTheStateForform}
      defaultValue={this.state.package[0].packName}/ > per hour
      </p> */}
      
      
      {/* <Button variant="outline-warning" onClick={this.onsubmitTheStateToEdit}>Update</Button> */}
      <Button variant="outline-warning" onClick={this.save}>Save</Button>
        
        </Form>

        
</div>
);}

renderNormal() {
  let comments =   this.state.comments ? this.state.comments.map((item, index) => {
    return <li key={index}>{item.comment}</li> }) : "www"
    

    // console.log(this.state.rate);
    //   console.log(this.state.raters);
    const AllPackages=guide.map((item, index) => {
      return <div key={index} className='Card'>
     <div className='ContainerHomeCity'>
         
          <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
              {/* Add onClick event handler to the name and an image of the place */}

              <Card.Img variant="top" src={item.imgSrc} width="250" height="250" />
              <Card.Body>
              {/* {item.city} */}
              <Card.Body>Package Name &nbsp; <img src={'https://i.postimg.cc/cHtxQ60w/tour.png'} width="30" height="30" /></Card.Body>
              <Card.Body>Description about the Package</Card.Body>            
              </Card.Body>
          </Card>
      </div>
      </div>
  })   
    
    return (
      <div>
        <br/><br/><br/>
        <article className="box media">
          <div className="media-left">
            {/* <figure><img src={this.state.img} alt="" class="img-thumbnail" /></figure> */}
            <div className="col-lg-7">
              <img className="img-fluid rounded mb-4 mb-lg-0" src={d} alt="" />
              </div>
              </div>
              <div className="media-content">
              <h2> {this.state.firstName+" "+this.state.lastName} </h2>
              <p><strong>About me: {this.state.AboutMe}</strong></p>
              <p><strong>Price: {this.state.price}</strong></p>
              <p><strong>City: {this.state.city}</strong></p>
              <p><strong>Pakage Name:{this.state.package}</strong></p>
              </div>
              <div classNmae="media-right">
              <Button variant="outline-primary" onClick={this.edit}>Edit Proile</Button>
              </div>
            </article>
       
              <Rater total={5} rating={this.state.rate/this.state.raters} style={{cursor:'pointer'}} onRate={(rating)=>{this.setState((prev)=>({raters: prev.raters +1, rate: rating.rating + prev.rate}));}} /> 
                       {this.showRate()}
                       
              <br/><DatePicker selected={this.state.startDate} onChange={this.handleChange} />
              <div><Button onClick ={this.onsubmitTheStateToBook}  size="sm" > Book </Button></div>
             
          <div className="card text-white color my-5 py-4 text-center">
            <div className="card-body">
              <h1 className="text-white m-0">What our customers says about this tour guy</h1>
              <ul>
              {comments} 
              </ul>
              <Form className="SignUp" onSubmit ={this.onsubmitTheStateToPosted}>
              <FormGroup >
              <Input type="textarea" name="comment" id="exampleText" placeholder="Write your comment here" onChange={this.changeTheStateForform}/>
              <Button onClick ={this.onsubmitTheStateToPosted}>Add comment<img src={'https://i.postimg.cc/3NQ9Fmr5/blog.png'} width="30" height="30"/></Button>
              </FormGroup>
              </Form>
            </div>
          </div>
          <Container >
            <Row className='Cont'>
                  {/* render the list of city generated in the render method above */}
                  {AllPackages}
            </Row>
        </Container>

        {/* /.container */}
      </div>
    
  );}


render()
      {
        if(this.state.editing)
          return this.renderEdit();
        else
        return this.renderNormal()
      }

  
};

export default TourGuyProfile;