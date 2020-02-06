import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
// import '../../node_modules/bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap/';
import { Form, FormGroup, CustomInput, Label, Input, FormText } from 'reactstrap';
import Rater from 'react-rater';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css';
import ReactPhoneInput from "react-phone-input-2";
import { storage } from '../firebase';
import Home from './Home'

class TourGuyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
      raters: 0,
      firstName: "",
      lastName: "",
      address: "",
      image: "",
      price: "",
      AboutMe: "",
      name: [],
      description: [],
      comment: [],
      packId: [],
      packImageUpload: null,
      Tid: this.props.match.params.id,
      startDate: new Date(),
      editing: false,
      saveAdding: false,
      packImage: [],
      addingPack: false,
      save: false,
      delete: false,
      isTouGuy: false,
      logedin: false,
      renderCom1: false,

    }
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.adding = this.adding.bind(this);
    this.saveAdding = this.saveAdding.bind(this);
    this.bNormalRen = this.bNormalRen.bind(this);
    this.saveCom = this.saveCom.bind(this)

  }

  //helper functions that change state
  edit() {
    this.setState({ editing: true });
    alert("now editing");
  }
  // save the eddit profile 
  save() {
    this.setState({ editing: false });
    //call the method below to update and tarnsfer the data to the back-end  
    this.onsubmitTheStateToEdit()
    //just for testing 
    alert("now saving value ");
  }


  //helper functions that change state addingPack
  adding() {
    this.setState({ addingPack: true });
    alert("now addingPack");
  }


  // save the aadding product
  saveAdding() {
    this.setState({ addingPack: false });
    //call the method below to update and tarnsfer the data to the back-end  
    this.onsubmitTheStateToAdd();
    //just for testing 
    window.location.reload(false);
    alert("now saving value ");
  }

  // delete user account
  deleteUser() {
    this.onsubmitTheStateToDelete()
    //just for testing 
    alert("now deleting user ");
    this.setState({ logedin: true })
  }

  // get the value form the any input - make sure the value is eq the right element
  changeTheStateForform = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



  componentDidMount() {
    //this to make sure it has token and apply the following
    localStorage.usertoken ?
      this.setState({
        logedin: true,
        tourType:
          jwt_decode(localStorage.usertoken).user.tourType,
        user:
          jwt_decode(localStorage.usertoken),
        id:
          jwt_decode(localStorage.usertoken).user._id
      })
      :
      this.setState({ logedin: false })


    // extract the token and get he user id 
    this.setState({ user: jwt_decode(localStorage.usertoken) })
    axios.get(`http://localhost:7000/api/t-user/` + this.state.Tid)
      .then(response => {
        this.setState({ firstName: response.data.firstName })
        this.setState({ lastName: response.data.lastName })
        this.setState({ city: response.data.city })
        this.setState({ image: response.data.image })
        this.setState({ rate: response.data.rate })
        this.setState({ rate: response.data.raters })
        this.setState({ price: response.data.price })
        this.setState({ AboutMe: response.data.AboutMe })
        this.setState({ id: response.data._id })

      }).catch((err) => console.log("data has not been recived"));


    // Get all Comments for a specific user  
    axios.get(`http://localhost:7000/api/t-comment/` + this.state.Tid)

      .then(res => {
        this.setState({ comments: res.data })
      })
      .catch((error) => {
        console.log(error)
      })

    //get all the packages from the backend
    axios.get("http://localhost:7000/api/t-users/" + this.state.Tid + "/packages")

      .then(res => {
        console.log(res + "pack")

        for (let i in res.data) {
          this.setState({ name: this.state.name.concat(res.data[i].name) })
          this.setState({ packImage: this.state.packImage.concat(res.data[i].packImage) })
          this.setState({ description: this.state.description.concat(res.data[i].description) })
          this.setState({ packId: this.state.packId.concat(res.data[i]._id) })
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }

  // store comments in the database
  onsubmitTheStateToPosted = () => {

    axios.post("http://localhost:7000/api/r-comment/" + this.state.Tid + "/" + this.state.id, this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    console.log("posted")
  }

  //updat the rate 
  componentDidUpdate() {
    console.log("working " + this.state.rate + this.state.raters)
    // upate user rate and save it in the backend 
    axios.put("http://localhost:7000/api/t-userRate/" + this.props.match.params.id + "/" + this.state.rate + "/" + this.state.raters)
      .then((res) => {
        console.log("what data do u have ", res)
      })
      .catch(err => console.log(err))
  }

  //Booking
  onsubmitTheStateToBook = () => {
    if (this.state.startDate == null) {
      alert("please select date")
    }
  }
  // Add packages 
  onsubmitTheStateToAdd = () => {
    axios.post("http://localhost:7000/api/t-users/" + this.state.Tid + "/packages", this.state)
      .then((res) => {
        console.log("what pack do u have ", res)
      }
      )
      .catch(err => console.log(err))
  }

  // EDIT PROFILE 
  onsubmitTheStateToEdit = () => {
    axios.put("http://localhost:7000/api/t-user_edit/" + this.state.Tid, this.state)
      .then((res) => {
        console.log("what data do u have ", res)
      }
      )
      .catch(err => console.log(err))

  }

  //Booking
  onsubmitTheStateToBook = () => {
    if (this.state.startDate == null) {
      alert("please select date")
    }
    else {
      var datetoB = this.state.startDate.toDateString();
      axios.post("http://localhost:7000/api/r-booking/" + this.state.Tid + "/" + this.state.id + "/" + datetoB, this.state)
        .then(
          (res) => {
            if (res.data == "Book is made successfully") {
              alert("Book is made successfully");
            } else {
              alert("Book can not made because this date is already reserved");

            }
            console.log(res.data)
          })
        .catch(err => console.log(err))
    }
  }

  // Add packages 
  onsubmitTheStateToAdd = () => {
    axios.post("http://localhost:7000/api/t-users/" + this.state.Tid + "/packages", this.state)
      .then((res) => {
        console.log("what pack do u have ", res)
      }
      )
      .catch(err => console.log(err))
  }
  // EDIT PROFILE 
  onsubmitTheStateToEdit = () => {
    axios.put("http://localhost:7000/api/t-user_edit/" + this.state.Tid, this.state)
      .then((res) => {
        console.log("what data do u have ", res)
      }
      )
      .catch(err => console.log(err))

  }



  // delete users 
  onsubmitTheStateToDelete = () => {
    axios.delete("http://localhost:7000/api/t-userD/" + this.state.Tid)
      .then((res) => {
        console.log("user been deleted", res)
      }
      )
      .catch(err => console.log(err))

  }

  // switch
  handleChange = date => {
    this.setState({
      startDate: date
    });
  }


  // switch to page to write comments
  bNormalRen() {
    this.setState({ renderCom1: true })
  }

  //save the comments 
  saveCom() {
    this.setState({ renderCom1: false })
    window.location.reload(false);
  }


  showRate(e) {
    if (this.state.rate / this.state.raters > 0)
      return (<h6>{parseFloat(this.state.rate / this.state.raters).toFixed(1)} Stars</h6>)
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  //img
  handleChangeImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }

  //img pack
  handleChangeImagePack = e => {
    if (e.target.files[0]) {
      const packImage = e.target.files[0];
      this.setState(() => ({ packImage }));
    }
  }

  handleUploadPack = () => {
    console.log("handleupload2");
    const { packImage } = this.state;
    const uploadTask = storage.ref(`images/${packImage.name}`).put(packImage);
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
        storage.ref('images').child(packImage.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({ packImage: url });
          this.setState({ url: url });
        })
      });
  }



  handleUpload = () => {
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

  //img pack
  handleChangeImagePack = e => {
    if (e.target.files[0]) {
      const packImage = e.target.files[0];
      this.setState(() => ({ packImage }));
    }
  }

  handleUploadPack = () => {
    console.log("handleupload2");
    const { packImage } = this.state;
    const uploadTask = storage.ref(`images/${packImage.name}`).put(packImage);
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
        storage.ref('images').child(packImage.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({ packImage: url });
          this.setState({ url: url });
        })
      });
  }

  deletePack = (PackidTodelete) => {
    if (this.state.tourType === "tourUser") {
      axios.put(`http://localhost:7000/api/deleteOnePackig/` + PackidTodelete, { id: this.state.Tid })
        .then(response => {
          console.log(response);
          if (response.data.msg === "the packig has been removed !!!") {
            alert("the packig has been removed")
          }
        });
    }
    window.location.reload(false);
  }





  // render only the Edit page
  renderEdit() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (

      <div className="central">
        <h2 className="title"> Edit Profile </h2>
        <Form>
          <Row>
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
          </Row>
          <Row>
            <Col>
              <FormGroup className="col-md-10">
                <Label for="First Name">First Name :</Label>
                <Input type="text" className="input" name="firstName" onChange={this.changeTheStateForform} defaultValue={this.state.firstName} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="col-md-10">
                <Label for="Last Name">Last Name :</Label>
                <Input type="text" className="input" name="lastName" onChange={this.changeTheStateForform} defaultValue={this.state.lastName} />
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
                <Label for="examplePassword">Password :</Label>
                <Input type="password" name="password" id="newPassword" placeholder="new password" onChange={this.changeTheStateForform} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup className="col-md-10">
                <Label for="exampleText">About Me :</Label>
                <Input type="textarea" className="input" name="AboutMe" onChange={this.changeTheStateForform} defaultValue={this.state.AboutMe} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="col-md-10">
                <Label for="Price">Price per Hour :</Label>
                <Input type="text" className="input" name="price" onChange={this.changeTheStateForform}
                  defaultValue={this.state.price} />
              </FormGroup>
            </Col>


            <Link to="/">
              <Button variant="outline-warning" onClick={this.deleteUser}> Delete Account </Button>
            </Link>


          </Row>
          <Button variant="outline-warning" onClick={this.save}>Save now</Button>
        </Form>
      </div>
    );
  }


  // Render the same data in the backend
  renderNormal() {
    let comments = this.state.comments ? this.state.comments.map((item, index) => {
      return <li key={index}>{item.comment}</li>
    }) : "There are no comment.. add one"

    // if user click on write commnet this will render and save and go back to the next return
    if (this.state.renderCom1) {
      return (
        <div>
          <div className="card text-white color my-5 py-4 text-center">
            <div className="card-body">
              <h1 className="text-white m-0">What our customers says about this tour guy</h1>
              <ul>
                {comments}
              </ul>
              <Form className="SignUp" onSubmit={this.onsubmitTheStateToPosted}>
                <FormGroup >
                  <Input type="textarea" name="comment" id="exampleText" placeholder="Write your comment here" onChange={this.changeTheStateForform} />
                  <Button onClick={this.saveCom}>  <Button onClick={this.onsubmitTheStateToPosted}>why ---- comment<img src={'https://i.postimg.cc/3NQ9Fmr5/blog.png'} width="30" height="30" /></Button> </Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      )
    }
    // retrun only the data in the backend and display
    else {

      return (
        <div>
          <div className="TourGuyProfileCont">
            <div className="col-lg-5">
              <img className="TourGuyImg" src={this.state.image} alt="Avatar" width="300" height="300" />
            </div>
            <div className="media-body">
              <h2 > {this.state.firstName + " " + this.state.lastName} </h2>
              <Rater total={5} rating={this.state.rate / this.state.raters} style={{ cursor: 'pointer' }} onRate={(rating) => { this.setState((prev) => ({ raters: prev.raters + 1, rate: rating.rating + prev.rate })); }} />
              {this.showRate()}
              <p><strong>About me: {this.state.AboutMe}</strong></p>
              <p><strong>Price: {this.state.price}</strong></p>
              <p><strong>City: {this.state.city}</strong></p>
            </div>
            <div className='BookRateCont'>
              <br />
              {(this.state.logedin && this.state.tourType == "regUser") ? <DatePicker selected={this.state.startDate} onChange={this.handleChange} /> : ""}
              {(this.state.logedin && this.state.tourType == "regUser") ? <div><Button onClick={this.onsubmitTheStateToBook} size="sm" > Book </Button></div> : ""}
              {(this.state.logedin && this.state.tourType == "tourUser" && this.state.id == this.state.Tid) ? <Button variant="outline-primary" onClick={this.edit}>Edit Profile</Button> : ""}
              {(this.state.logedin && this.state.tourType == "tourUser" && this.state.id == this.state.Tid) ? <Button variant="outline-primary" onClick={this.adding}>Add package</Button> : ""}
            </div>
          </div>

          <div className='PackagesCont'>
            <h1>Packages</h1>
          </div>

          <Container className='PackagesCont'>
            <Row>
              {/* render the list of city generated in the render method above */}
              {/* {this.DisplayAllPackages()} */}

              <div>
                <div className='ContainerHomeCity'>
                  {this.state.name.map((n, index) => (
                    <div className="col mb-4">
                      <div>
                        <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
                          <Card.Img variant="top" src={this.state.packImage[index]} width="250" height="250" />
                          <Card.Body>{this.state.name[index]} &nbsp; <img src={'https://i.postimg.cc/cHtxQ60w/tour.png'} width="30" height="30" /></Card.Body>
                          <Card.Body>
                            <span></span>
                            <Card.Body>{this.state.description[index]}</Card.Body>

                            {(this.state.logedin && this.state.tourType == "tourUser" && this.state.id == this.state.Tid) ? <button onClick={() => this.deletePack(this.state.packId[index])}>Delete this package</button> : ""}
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Row>
          </Container>
          {/* COMMENT CONTAINER */}
          <div className="card text-white color my-5 py-4 text-center">
            <div className="card-body">
              <h1 className="text-white m-0">What our customers says about this tour guy</h1>
              <ul>
                {comments}
              </ul>
              {/* <Form className="SignUp" onSubmit={this.onsubmitTheStateToPosted}> */}
              {/* <FormGroup > */}
              {/* <Input type="textarea" name="comment" id="exampleText" placeholder="Write your comment here" onChange={this.changeTheStateForform} /> */}
              <Button onClick={this.bNormalRen}>comment<img src={'https://i.postimg.cc/3NQ9Fmr5/blog.png'} width="30" height="30" /></Button>
              {/* </FormGroup> */}
              {/* </Form> */}
            </div>
          </div>
        </div>
      );
    }
  }


  renderAdd() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (

      <div className="AddPackageCont">
        <h2 className="title">Add Package </h2>
        <br />
        <Form>
          <Row>
            <Col>
              <FormGroup className="col-md-10">

                <Row>
                  <Label for="exampleFile">Package Picture</Label>
                </Row>
                <Row>
                  <progress value={this.state.progress} max="100" />
                </Row>
                <br />
                <Row>
                  <input type="file" name="packImage" onChange={(e) => {
                    this.handleChangeImagePack(e)
                    setTimeout(() => {
                      this.handleUploadPack()
                    }, 1000);
                  }} />
                </Row>
                <br />
                <Row>
                  <img src={this.state.url || 'http://via.placeholder.com/200x150'} alt="Uploaded images" height="150" width="200" />
                </Row>

              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="col-md-10">

                <Row>
                  <Label for="Name">Name: </Label>
                  <Input type="text" className="input" name="name" onChange={this.changeTheStateForform} />
                </Row>
                <Row>
                  <Label for="Description">Description: </Label>
                  <Input type="textarea" name="comment" id="exampleText" name="description" onChange={this.changeTheStateForform} />
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="col-md-10">
            <Row>
              <Col><div></div></Col>
              <Col> <Button variant="outline-warning" onClick={this.saveAdding}>Save</Button></Col>
            </Row>
          </FormGroup>

        </Form>
      </div>
    );
  }





  // 😅😭 this is fav page, we learn a lot here 
  //This part will tell the compiler which one will render based on the user selection

  render() {
    if (this.state.editing)

      return this.renderEdit();

    if (this.state.addingPack)

      return this.renderAdd();

    else
      return this.renderNormal();

  }

}
export default TourGuyProfile;
