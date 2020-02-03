// import React, { Component } from "react";
// import './App.css';


//  const Footer = function(props)
//     {
//         return (
//             <div>
//             {/* Footer */}
//       <footer className="footer">
//       <div className="container">
//         <div className="row">
//           {/* Footer Column */}
//           <div className="col-lg-4 footer_col">
//             <div className="footer_about">
//               {/* Logo */}
//               <div className="logo_container">
//                 <div className="logo">
//                   <div>Golden </div>
//                   <div>Developers</div>
//                   <div className="logo_image"><img src="images/logo.png" alt="" /></div>
//                 </div>
//               </div>
//               <div className="footer_about_text"></div>
//               <div className="copyright">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
//                 Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
//                 {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</div>
//             </div>
//           </div>
//           {/* Footer Column */}
//           <div className="col-lg-4 footer_col">
//             <div className="footer_latest">
//               <div className="footer_title">Latest News</div>
//               <div className="footer_latest_content">
//                 {/* Footer Latest Post */}
//                 <div className="footer_latest_item">
//                   <div className="footer_latest_image"><img src="images/latest_1.jpg" alt="https://unsplash.com/@peecho" /></div>
//                   <div className="footer_latest_item_content">
//                     <div className="footer_latest_item_title"><a href="news.html">Brazil Summer</a></div>
//                     <div className="footer_latest_item_date">Jan 09, 2018</div>
//                   </div>
//                 </div>
//                 {/* Footer Latest Post */}
//                 <div className="footer_latest_item">
//                   <div className="footer_latest_image"><img src="images/latest_2.jpg" alt="https://unsplash.com/@sanfrancisco" /></div>
//                   <div className="footer_latest_item_content">
//                     <div className="footer_latest_item_title"><a href="news.html">A perfect vacation</a></div>
//                     <div className="footer_latest_item_date">Jan 09, 2018</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Footer Column */}
//           <div className="col-lg-4 footer_col">
//             <div className="tags footer_tags">
//               <div className="footer_title">Tags</div>
//               <ul className="tags_content d-flex flex-row flex-wrap align-items-start justify-content-start">
//                 <li className="tag"><a href="#">travel</a></li>
//                 <li className="tag"><a href="#">summer</a></li>
//                 <li className="tag"><a href="#">cruise</a></li>
//                 <li className="tag"><a href="#">beach</a></li>
//                 <li className="tag"><a href="#">offer</a></li>
//                 <li className="tag"><a href="#">vacation</a></li>
//                 <li className="tag"><a href="#">trip</a></li>
//                 <li className="tag"><a href="#">city break</a></li>
//                 <li className="tag"><a href="#">adventure</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//           </div>  
//         );
//     }
// export default Footer;


import React, { Component } from "react";
import '../../src/App.css';


class Footer extends Component {
  render() {
    return (
      <div className="footer">
            <p>copyright 2020 | Golden Developers Team</p>
      </div>
    );
  }
}
export default Footer;