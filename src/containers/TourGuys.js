import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from '../DB' //Import the file where the data is stored.
import { Container, Row} from 'react-bootstrap/';
import Rater from 'react-rater';
import {
    Link
  } from 'react-router-dom';
import axios from 'axios'

class TourGuys extends Component {
    constructor(props){
        super(props);
        this.state={ 
        firstName:[],
        lastName:[],
        address:[],
        img:[],
        rate:[],
        price:[],
        id:[],
        city: this.props.match.params.city
        // city: this.props.displayItem
        }
    }
    componentDidMount() {
     this.setState({city: this.props.match.params.city})
      //console.log(this.state.city)
      if (this.state.city == undefined){
        console.log("outside tour guys in city")
        axios.get("http://localhost:7000/api/t-users") 
        .then(res => {
          for(let i in res.data){
              this.setState({firstName: this.state.firstName.concat(res.data[i].firstName)})
              this.setState({lastName: this.state.lastName.concat(res.data[i].lastName)} )
              this.setState({address: this.state.address.concat(res.data[i].address)})
              this.setState({img: this.state.img.concat(res.data[i].img)} )
              this.setState({rate: this.state.rate.concat(res.data[i].rate)} )
              this.setState({price: this.state.price.concat(res.data[i].price)} )
              this.setState({id: this.state.id.concat(res.data[i]._id)} )
          }
          //console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
      }
 ////////////////////////////////////////
       else{
      console.log("inside tour guys in city")
      //console.log(this.props.match.params.city)
      //console.log(this.state.city)
          axios.get("http://localhost:7000/api/t-users/"+this.state.city) 
          .then(res => {
            for(let i in res.data){
                this.setState({firstName: this.state.firstName.concat(res.data[i].firstName)})
                this.setState({lastName: this.state.lastName.concat(res.data[i].lastName)} )
                this.setState({address: this.state.address.concat(res.data[i].address)})
                this.setState({img: this.state.img.concat(res.data[i].img)} )
                this.setState({rate: this.state.rate.concat(res.data[i].rate)} )
                this.setState({price: this.state.price.concat(res.data[i].price)} )
                this.setState({id: this.state.id.concat(res.data[i]._id)} )
            }
            //console.log(res)
          })
          .catch((error) => {
            console.log(error)
          })
      }}
    render() {
        return(
            <div>
               <div className='ContainerHomeSearch'>
                <img className='TourGuyHomeImg' src={'https://i.postimg.cc/CMcw8xKf/Screen-Shot-2020-01-28-at-2-18-16-PM.png'} width="100%" height="50%"/>
                <div className="searchCont">
                <p className='HomeText'>Privileged Access With The Best Tour Guys</p>
                </div>     
            </div>  
            <br></br>
              {this.DisplayAllTourGuys()} 
              <br></br>
            </div> 
        );
        // const AllTourGuys=guide.map((item, index) => {
        //     return <div key={index} className='Card'>
        //    <div className='ContainerHomeCity'>
        //         <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
        //             {/* Add onClick event handler to the name and an image of the place */}
        //             <Card.Img variant="top" src={item.imgSrc} width="250" height="250" />
        //             <Card.Body>
        //             {/* {item.city} */}
        //             <span></span>
        //             <Link to="/TourGuyProfile">Tour Guy Name</Link>
        //             <Card.Body>100<img src={'https://i.dlpng.com/static/png/2304771-image-sr-iconpng-dragon-ball-z-dokkan-battle-wikia-fandom-sr-png-290_160_preview.webp'} width="40" height="30" />Per 2 hours</Card.Body>
        //             <Card.Body>Brand Statement For The Tour Guy</Card.Body>
        //             <Rater total={5} rating={3} interactive={false} style={{cursor:'pointer'}} />
        //             </Card.Body>
        //         </Card>
        //     </div>
        //     </div>
        // })   
        // return (
        // <div>
        //  <div className='ContainerHomeSearch'>
        //      <img className='TourGuyHomeImg' src={'https://i.postimg.cc/CMcw8xKf/Screen-Shot-2020-01-28-at-2-18-16-PM.png'} width="100%" height="50%"/>
        //      <div className="searchCont">
        //      <p className='HomeText'>Privileged Access With The Best Tour Guys</p>
        //      </div>
        //   </div>  
        //   <Container>
        //       <Row className='Cont'>
        //             {/* render the list of city generated in the render method above */}
        //             {AllTourGuys}
        //       </Row>
        //   </Container>
        // </div>
        // )   
    }
    DisplayAllTourGuys(){
        return(
        <div>
          <div className='ContainerHomeCity'>
                { this.state.firstName.map((n, index) => (
                <div className="col mb-4">
                    <div>
                    <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
                    {/* Add onClick event handler to the name and an image of the place */}
                    <Card.Img variant="top" src={this.state.img[index]} width="250" height="250" />
                    <Card.Body>
                    {/* {item.city} */}
                    <span></span>
                    <Link to={"/TourGuyProfile/"+ this.state.id[index]}>{this.state.firstName[index]+" "+this.state.lastName[index]}</Link>
                    <Card.Body>{this.state.address[index]}</Card.Body>
                    <Card.Body>{this.state.price[index]}<img src={'https://pbs.twimg.com/media/EL4M2uIXsAAkx-f.png'} width="40" height="30" />Per 1 hour</Card.Body>
                    <Card.Body>{this.state.rate[index]}</Card.Body>
                     {/* <Rater >{this.state.rate[index]}</Rater>total={5} rating={3} interactive={false} style={{cursor:'pointer'}} /> */}
                    </Card.Body>
                </Card>
                    </div>    
                </div>
            ))}
            </div>
            </div>
        )
  }
}
export default TourGuys;