import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from '../DB' //Import the file where the data is stored.
import { Container, Row } from 'react-bootstrap/';
import {
    Link
} from 'react-router-dom';
import axios from 'axios'
import jwt_decode from 'jwt-decode'

class Packages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: [],
            description: [],
            packImage: [],
            logedin: false,
            Tid: [],
            firstName: [],
            lastName: [],
            city: []
        }
    }

    componentDidMount() {

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

        axios.get(`http://localhost:7000/api/tPack-users`)
            .then(res => {
                console.log(res)
                for (let i in res.data) {
                    this.setState({ firstName: this.state.firstName.concat(res.data[i].firstName) })
                    this.setState({ lastName: this.state.lastName.concat(res.data[i].lastName) })
                    this.setState({ city: this.state.city.concat(res.data[i].city) })
                    this.setState({ Tid: this.state.Tid.concat(res.data[i]._id) })

                    for (let j in res.data[i].packages) {
                        this.setState({ name: this.state.name.concat(res.data[i].packages[j].name) })
                        this.setState({ packImage: this.state.packImage.concat(res.data[i].packages[j].packImage) })
                        this.setState({ description: this.state.description.concat(res.data[i].packages[j].description) })
                    }
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
console.log(this.state.Tid)
        return (
            <div>
                {this.DisplayPack()}
                <br></br>
                <br></br>
            </div>
        );
        // const AllPackages=guide.map((item, index) => {


        //     return <div key={index} className='Card'>
        //    <div className='ContainerHomeCity'>

        //         <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
        //             {/* Add onClick event handler to the name and an image of the place */}

        //             <Card.Img variant="top" src={item.imgSrc} width="250" height="250" />
        //             <Card.Body>
        //             {/* {item.city} */}
        //             <Card.Body>Package Name &nbsp; <img src={'https://i.postimg.cc/cHtxQ60w/tour.png'} width="30" height="30" /></Card.Body>
        //             <Card.Body>Description about the Package</Card.Body>
        //             <Card.Body>Tour Guy Image</Card.Body>
        //             <Card.Body>Tour Guy Name</Card.Body>
        //             <Link to="/TourGuyProfile">Check on His Profile</Link>

        //             </Card.Body>
        //         </Card>
        //     </div>
        //     </div>
        // })   
        //return (
        // <div>
        //  <div className='ContainerHomeSearch'>
        //      <img className='TourGuyHomeImg' src={'https://www.miki.co.uk/sites/MikiTravelGlobal/files/slider_One_final.jpg?1580169600073'} width="100%" height="50%"/>
        //      <div className="searchCont">
        //      <p className='HomeText'>Our Best Tour Packages</p>
        //      </div>

        //   </div>  
        //     <Container>

        //     <Row className='Cont'>
        //           {/* render the list of city generated in the render method above */}
        //           {AllPackages}
        //     </Row>
        // </Container>
        // </div>
        //)   
    }
    DisplayPack() {
        return (
            <div>
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                <div className='ContainerHomeSearch'>
                    <img className='TourGuyHomeImg' src={'https://www.miki.co.uk/sites/MikiTravelGlobal/files/slider_One_final.jpg?1580169600073'} width="100%" height="50%" />
                    <div className="searchCont">
                        <p className='HomeText'>Our Best Tour Packages</p>
                    </div>
                </div>
                <Container>

            <Row className='Cont'>
            <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
                {this.state.firstName.map((n, index) => (
                    <div className="col mb-4">
                        <div>
                            <Card.Img variant="top" src={this.state.packImage[index]} width="250" height="250" />
                            <Card.Body>
                                <Card.Body>{this.state.name[index]} &nbsp; <img src={'https://i.postimg.cc/cHtxQ60w/tour.png'} width="30" height="30" /></Card.Body>
                                <Card.Body>{this.state.description[index]}</Card.Body>
                                <Card.Body>{this.state.firstName[index] + " " + this.state.lastName[index]}</Card.Body>
                                <Link to={"/TourGuyProfile/"+this.state.Tid[index]}>Check on His Profile</Link>
                            </Card.Body>
                        </div>
                    </div>
                ))}
            </Card>
            </Row>
        </Container>
            </div >

        )
    }
}
export default Packages;