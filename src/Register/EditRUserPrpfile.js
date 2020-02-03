// import React, { Component } from 'react';
// import {CustomInput,Form,FormGroup, Label, Input,Col,Row,Button} from 'reactstrap';
// import '../App.css';
// import axios from 'axios'
// import ReactPhoneInput from "react-phone-input-2";


// class EditRUserPrpfile extends Component{
//     changeTheStateForform = (e)=>{
//         this.setState({
//           [e.target.name] : e.target.value
//         })
//       }

//     // EDIT PROFILE 
// onsubmitTheStateToEdit = ()=>{
//   axios.put("http://localhost:7000/api/r-user_edit/"+this.props.match.params.id, this.state)
//   .then((res) =>
//   {
//     console.log("what data do u have ", res)
//   } 
// )
//   .catch(err => console.log(err))
// }

//     render(){
//         return(
//       <dev>
//           <h2 className="title"> Edit Proile </h2>
//          <Form>

//        <Row>
//        <Col>
//          <FormGroup className="col-md-10">
//              <Label for="First Name">First Name :</Label>
//              <Input type="text" className="input" name="firstName" onChange={this.changeTheStateForform} defaultValue={this.state.firstName}/>
//          </FormGroup>
//        </Col>
//        <Col>
//          <FormGroup className="col-md-10">
//              <Label for="Last Name">Last Name :</Label>
//              <Input type="text" className="input" name="lastName" onChange={this.changeTheStateForform} defaultValue={this.state.lastName}/>
//          </FormGroup>
//        </Col>
//        </Row>
//        <Row>
//        <Col>
//        <FormGroup className="col-md-10">
//          <Label for="Phone Number">Phone Number: </Label>
//          <ReactPhoneInput inputExtraProps={{name: "phone",required: true,autoFocus: true}}
//           defaultCountry={"sa"} value={this.state.phone} placeholder="+966" onChange={this.handleOnChange}/>
//       </FormGroup>
//       </Col>
//       <Col>
//       <FormGroup className="col-md-10">
//         <Label for="examplePassword">Password :</Label>
//         <Input type="password" name="password" id="newPassword" placeholder="new password" onChange={this.changeTheStateForform} />
//       </FormGroup>
//       </Col>
//       </Row>
      
//       {/* <Button variant="outline-warning" onClick={this.onsubmitTheStateToEdit}>Update</Button> */}
//       <Button variant="outline-warning" onClick={this.save}>Save</Button>
        
//         </Form>
//       </dev>
//         )
//     }

// }

// export default EditRUserPrpfile;
