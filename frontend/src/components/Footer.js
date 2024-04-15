import React from 'react'
import {Link} from "react-router-dom"
import './css/footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FooterBox from "./SubComponents/FooterBox.js"
import logol from './assets/vtkLgr.png'
import pay from './assets/pay3.png'
const Footer = () => {
  const yr = new Date();
  return (
    <>
      <FooterBox />
      <footer class="footer_area section_padding_130_0">
      <div class="containerttm">
        <div class="rowfooter">
          <div class="colft1">
            <div class="single-footer-widget section_padding_0_130">
              <div style={{marginTop:'-70px'}} class="footer-logo mb-3">
              <div className="site-logo" style={{ position: 'relative', top: '-10px' }}>
  <Link to="/" style={{ textDecoration: 'none' }}>
    <img src={logol} alt="Logo" style={{ width: '150px', height: 'auto' }} />
  </Link>
 
</div>

              </div>
              <p>Luxurious & Spacious homes built with us
VTK Engineers. </p>
              <div >
                <p style={{ fontWeight: 'bold' }}class="mb-0">Sign in, Join with Us</p>
              </div>
              <div className="ltn__social-media-2">
          <ul>
            <li><a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#" title="Twitter"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" title="Linkedin"><i className="fab fa-linkedin"></i></a></li>
            <li><a href="#" title="Instagram"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
            </div>
          </div>
          <div class="colft">
            <div class="single-footer-widget section_padding_0_130">
              <h5 class="widget-title">About</h5>
              <div class="footer_menu">
                <ul>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/Service_Details">Service Details</Link></li>
        <li><Link to="/Team_Details">Team Details</Link></li>
        <li><Link to="/Locations">Google Map Locations</Link></li>
                  
                </ul>
              </div>
            </div>
          </div>
          <div class="colft">
            <div class="single-footer-widget section_padding_0_130">
              <h5 class="widget-title">Support</h5>
              <div class="footer_menu">
                <ul>
                <li><Link to="/">Support</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
                <li><Link to="/">Term & Conditions</Link></li>
                <li><Link to="/">Feedback</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="colft">
            <div class="single-footer-widget section_padding_0_130">
              <h5 class="widget-title">Contact</h5>
         
              <div class="footer_menu">
                <ul>
                  <li><a href="#">Call Centre</a></li>
                  <li><a href="#">Email Us</a></li>
                  <li><a href="#">Term &amp; Conditions</a></li>
                  <li><a href="#">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="colftct">
            <div class="single-footer-widget section_padding_0_130">
          
         
              <div class="footer_menu">
              <ul>
              <img src={pay} alt="Logo" style={{ width: '350px', height: 'auto', borderRadius: '5px', marginTop:'20px' , margin: '0 0 0 -40px' }} />
                </ul>
                <ul>
               <li style={{textAlign:'left', marginLeft:'10px', fontSize:'10px', marginTop:'-10px' }}> All Rights Reserved @ VTK Engineers. {yr.getFullYear()}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
    </>
  );
};

export default Footer