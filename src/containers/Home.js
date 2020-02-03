import React, { Component } from 'react';
import CityList from './CityList' 





class Home extends Component{


  render() {
    return (
      <div className="AllHome">
        <div className='ContainerHomeSearch'>
          <img className='HomeImg' src={'https://imcdn.org/uploads/2018/12/tantoura1.jpg'} width="100%" height="50%"/>

          <div className="searchCont">
            <div>
              <p className='HomeText'>FIND YOUR ADVENTURE</p>
            </div>

            {/* Search bar */}
            <div class="input-group md-form form-sm form-2 pl-0">
              <input class="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search"/>
              <div class="input-group-append">
                <span class="input-group-text red lighten-3" id="basic-text1"><i class="fas fa-search text-grey" aria-hidden="true"></i></span>
              </div>
            </div>
          </div>    
        </div>

        <div className='ContainerHomeCity'>
        <CityList/>

        </div>      

      </div>
    );
  }

 
}


export default Home;

