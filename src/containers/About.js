import React from 'react';
import guide from '../DB' //Import the file where the data is stored.
import { Card } from 'react-bootstrap/';


function About() {
  return (
    <div className="About">
<div>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
</div>

<div className="background bg-dark container" >
 <img src="https://ticotimes.net/wp-content/uploads/2019/11/20191109_170435_1-1000x750.jpg" alt='..' />
 
</div>

<div className="milestones">


<div className="col-lg-6 about_col order-lg-2 order-1">


</div>


<div className="container">

  <div className="row">

    <div className="col">

      <div className="section_title text-center">
        
       <div>   
  
         
<blockquote><h3>As a team developers we believe developer who is not optimistic shouldnt be a developer. 
Programing is like any other sport. You might know the rules but you have to play to learn.Cheers!!!</h3></blockquote>


       </div>

      </div>
      <div className="section_title text-center">
      <h2>Golden Developers</h2>

<div className="card-deck">
  <div className="card">
    <img src="..." className="card-img-top" alt="..." height="210px"/>
    <div className="card-body">
      <h5 className="card-title">Abdullah Binmahfouz</h5>
    </div>
  </div>

  <div className="card">
    <img src="..." className="card-img-top" alt="..." height="210px" />
    <div className="card-body">
      <h5 className="card-title">Hanin Nouh</h5>
    </div>
  </div>
  <div className="card">
    <img src="..." className="card-img-top" alt="..." height="210px"/>
    <div className="card-body">
      <h5 className="card-title">Doaa Turkustani</h5>
    </div>
  </div>
  <div className="card">
    <img src="..." className="card-img-top" alt="..." height="210px"/>
    <div className="card-body">
      <h5 className="card-title">Khadijah Saber</h5>
    </div>
 </div>
 <div>
   <br></br>
 </div>
</div>

<div>
   <br></br>
 </div>
   </div>

    </div>

  </div>

</div>
</div>
    </div>

  );
}

export default About;
