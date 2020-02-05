import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from '../DB' //Import the file where the data is stored.
import { Container, Row, Col } from 'react-bootstrap/';
import Rater from 'react-rater';
import {
    Link
} from 'react-router-dom';


class Packages extends Component {


    render() {

        const AllPackages = guide.map((item, index) => {
            return <div key={index} className='Card'>
                <div className='ContainerHomeCity'>
                    <Col>
                        <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
                            {/* Add onClick event handler to the name and an image of the place */}
                            <Card.Img variant="top" src={item.imgSrc} width="250" height="250" />
                            <Card.Body>
                                {/* {item.city} */}
                                <Card.Body>Package Name &nbsp; <img src={'https://i.postimg.cc/cHtxQ60w/tour.png'} width="30" height="30" /></Card.Body>
                                <Card.Body>Description about the Package</Card.Body>
                                <Card.Body>Tour Guy Image</Card.Body>
                                <Card.Body>Tour Guy Name</Card.Body>
                                <Link to="/TourGuyProfile">Check on His Profile</Link>

                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        })
        return (
            <div>
                <div className='ContainerHomeSearch'>
                    <img className='TourGuyHomeImg' src={'https://i.postimg.cc/SNJnL2v7/slider-One-final2.jpg'} width="100% " height="50%" />
                    <div className="searchCont">
                        <p className='HomeText'>Our Best Tour Packages</p>
                    </div>
                </div>
                {/* 
                <div className='ContainerHomeCity'>
                {AllPackages}

                </div>    */}

                <Container className='Cont'>


                    {AllPackages}

                </Container>
            </div>
        )
    }
}
export default Packages;