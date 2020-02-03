import React from 'react';

export default function Contact(){
    return (
        <div>
                    
          {/* Contact */}
          <div className="contact">
           
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="contact_title">Get in touch</div>
                </div>
              </div>
              <div className="row contact_content">
                <div className="col-lg-5">
                  <div className="contact_text">
                    <p></p>
                  </div>
                  <div className="contact_info">
                    <div className="contact_info_box">i</div>
                    <div className="contact_info_container">
                      <div className="contact_info_content">
                        <ul>
                          <li>Address: Jeddah, Saudi Arabia</li>
                          <li>Phone: Only email</li>
                          <li>Email: contactUs@goldenDevelopers.com</li>
                        </ul>
                      </div>
                      <div className="contact_info_social">
                        <ul>
                          {/* <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true" /></a></li>
                          <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a></li>
                          <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                          <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact_form_container">
                    <form action="#" id="contact_form" className="clearfix">
                      <input id="contact_input_name" className="contact_input contact_input_name" type="text" placeholder="Name" required="required" data-error="Name is required." />
                      <input id="contact_input_email" className="contact_input contact_input_email" type="text" placeholder="E-mail" required="required" data-error="E-mail is required." />
                      <input id="contact_input_subject" className="contact_input contact_input_subject" type="text" placeholder="Subject" />
                      <textarea id="contact_input_message" className="contact_message_input contact_input_message" name="message" placeholder="Message" required="required" data-error="Please, write us a message." defaultValue={""} />
                      <button id="contact_send_btn" type="submit" className="contact_send_btn trans_200" value="Submit">Send</button>
                    </form>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
           
        </div>
      );
}