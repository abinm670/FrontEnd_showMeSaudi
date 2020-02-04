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
        cityShow:[],
        image:[],
        rate:[],
        price:[],
        id:[],
        city: this.props.match.params.city
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
              this.setState({cityShow: this.state.cityShow.concat(res.data[i].city)})
              this.setState({image: this.state.image.concat(res.data[i].image)} )
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
                this.setState({cityShow: this.state.cityShow.concat(res.data[i].city)})
                this.setState({image: this.state.image.concat(res.data[i].image)} )
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
                    <Card.Img variant="top" src={this.state.image[index]} width="250" height="250" />                    
                    <Card.Body>
                    <span></span>
                    <Link to={"/TourGuyProfile/"+ this.state.id[index]}>{this.state.firstName[index]+" "+this.state.lastName[index]}</Link>
                    <Card.Body>{this.state.cityShow[index]}</Card.Body>                    
                    <Card.Body>{this.state.rate[index]}</Card.Body>
                    <Card.Body>{this.state.price[index]}<img src={'data:image/jpeg;base64,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'} width="40" height="30" />Per 1 hours</Card.Body>

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