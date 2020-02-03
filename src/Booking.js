// import React, { Component } from 'react';
// import {
//   Container,CustomInput, Col, Form,FormText,
//   FormGroup, Label, Input,
//   Button,
// } from 'reactstrap';
// import './App.css';
// import axios from 'axios'
// import 'moment/locale/it.js';
// import { DatePicker, DatePickerInput } from 'rc-datepicker';

// const date = '2015-06-26' // or Date or Moment.js

// onChange = (jsDate, dateString) => {
//   // ...
// }

// class Booking  extends Component {
//     constructor(props){
//         super(props);
//         this.state={}
//     }
//     render() {
//           return(
//             <div>
//             // this renders the full component (input and datepicker)
//             <DatePickerInput
//               onChange={onChange}
//               value={date}
//               className='my-custom-datepicker-component'
//               {...anyReactInputProps}
//             />
        
//             // this renders only a fixed datepicker
//             <DatePicker onChange={onChange} value={date} />
//           </div>
//         );}
//     };
// export default Booking;