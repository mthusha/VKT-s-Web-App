import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios';
import './css/Header.css';
import './scribt/headerscribt.js'
import logo from './assets/vtk.png'
import down from './assets/down.png'
import logol from './assets/vtkL.png'
import video1 from './assets/video.mp4'
import qickq from './assets/qickq.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/responsive.css'

const Header = () => {
  const [log, setLog] = useState('Join With Us');
  useEffect(() => {
    const header = document.getElementById('ltn__header');

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY > 100) {
        header.classList.add('fixed-header');
      } else {
        header.classList.remove('fixed-header');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  ////////////////////////////////////////////////////

let url = './assets/'
useEffect(() => {
 
  const addColumnClasses = () => {
    document.querySelectorAll('.mega-menu').forEach((menu) => {
      const ulChildren = menu.querySelectorAll('li').length;
      menu.classList.add(`column-${ulChildren}`);
    });
  };

  addColumnClasses();


  document.querySelectorAll('.mega-menu').forEach((menu) => {
    menu.parentElement.classList.add('mega-menu-parent');
  });


  window.addEventListener('DOMContentLoaded', () => {
    if (window.elementor) {
      window.elementorFrontend.hooks.addFilter(
        'frontend/handlers/menu_anchor/scroll_top_distance',
        (scrollTop) => scrollTop - 75
      );
    }
  });
  return () => {
    window.removeEventListener('DOMContentLoaded', () => {});
  };
}, []);

//////////////////////////////////////////////////
axios.defaults.withCredentials = true;
useEffect(() => {
  axios.get('http://localhost:8081')
    .then(res => {
      
      if (res.data.Status === "Success") {
         setLog("My Account");
       
      }
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
    
}, []);

  return (

    <>



    <header  id="ltn__header" className="ltn__header-logo-and-mobile-menu ltn__header-transparent--- gradient-color-4--- ">
    <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-white">
				<div className="container">
				<div className="row">
      <div className="site-logo-wrap">
						<div className="site-logo go-top">
            <Link to="/" style={{ textDecoration: 'none' }}>
           <img src={logo} alt="Logo"  />
           </Link>
						</div>
						<div style={{  margin: '50px 0 0 7%' }} >
						<div className="get-support-icon">
							<i   className="icon-call" />
						</div>
						<div  className="get-support-info">
							<h6 ></h6>
							<h4><a  href=""></a></h4>
						</div>
						</div>
					</div>
      <div   className="col header-menu-column">
        <div className="header-menu d-none d-xl-block go-top">
          <nav>
            <div  style={{  margin: '-90px 0 0 30vw'}}className="ltn__main-menu">
              <ul>
              <div className="search">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossOrigin="anonymous"
      />

      <form action="">
        <input type="search" required />
        <i className="fa fa-search"></i>
        <a href="javascript:void(0)" id="clear-btn">
          Clear
        </a>
      </form>
    </div>
    
                <li >
                <Link to="/">Home</Link>
                 
                </li>


                <li >
                <Link to="/about">Service<img src={down}  style={{ width: '15px', height: 'auto', borderRadius: '5px' , transform: 'translateX(0)', margin: '0 0 0 3px' }} alt="#" /></Link>
                  <ul className="sub-menu menu-pages-img-show">
                    <li>
									<Link to="/service">Construction</Link>
                  </li>
                  <li>
                  <Link to="/service">Painting</Link>
                  </li>
                  <li>
                  <Link to="/service">Plumbing</Link>
                  </li>
                  <li>
                  <Link to="/service">Electrical</Link>
                  </li>
                  <li>
                  <Link to="/service">Roofing</Link>
                  </li>
                  <li>
                  <Link to="/service">Pest Control</Link>
								</li>
                  </ul>
                </li>


                <li ><Link to="#">More <img src={down}  style={{ width: '15px', height: 'auto', borderRadius: '5px' , transform: 'translateX(0)', margin: '0 0 0 0' }} alt="#" /> </Link>
								<ul className="mega-menu" style={{position:'absolute', left:'10vw'}}  >
									<li><a href="#">Interior</a>
										<ul>
											<li><Link to="/">Electrical</Link></li>
                      <li><Link to="/error">Flooring</Link></li>
											<li><Link to="/">Plumbing</Link></li>
											<li><Link to="/">Interior Painting</Link></li>
											<li><Link to="/">Drywall</Link></li>
											<li><Link to="/">HVAC</Link></li>
										</ul>
									</li>
									<li><Link to="#">Exterior</Link>
										<ul>
											<li><Link to="/">Home Builders</Link></li>
											<li><Link to="/">Concrete Repair</Link></li>
											<li><Link to="/">Exterior Painting</Link></li>
											<li><Link to="/">Guttur Cleaning</Link></li>
											<li><Link to="/">Garage Door</Link></li>
											<li><Link to="/">Window</Link></li>
										</ul>
									</li>
									<li><Link to="#">Construction</Link>
										<ul>
											<li><Link to="/">New Construction</Link></li>
											<li><Link to="/">Concrete Repair</Link></li>
											<li><Link to="/">House Modify</Link></li>
											<li><Link to="/">Concrete Coating</Link></li>
											<li><Link to="/">Concrete Slab</Link></li>
											<li><Link to="/"></Link></li>
										</ul>
									</li>
                  <ul>
        <li>

            <video width="320" height="280"  controls autoPlay muted loop>
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </li>
      </ul>
								</ul>
							</li>

              <li ><Link to="/about">About<img src={down}  style={{ width: '15px', height: 'auto', borderRadius: '5px' , transform: 'translateX(0)', margin: '0 0 0 3px' }} alt="#" /></Link>
								<ul>
								<li><Link to="/about">About</Link></li>
								<li><Link to="/service-details">Service Details</Link></li>
								<li><Link to="/team-details">Team Details</Link></li>
								<li><Link to="/faq">FAQ</Link></li>
								<li><Link to="/location">Google Map Locations</Link></li>
								</ul>
							</li>
              <li><Link to="/contact">Contact</Link></li>
              <li > 
                    <div className="header-top-btntmm"><Link to="/Login"></Link>
                      <li ><a><Link to="/Login" className="custom-add-listing-btntmm">{log}</Link></a></li> 
                   </div>
               </li>

              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="col--- ltn__header-optionstm ltn__header-options-2 ">
        <div className="mobile-menu-toggle d-xl-none">
          <a href="#ltn__utilize-mobile-menu" className="ltn__utilize-toggle">
            <svg viewBox="0 0 800 600">
              <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
              <path d="M300,320 L540,320" id="middle"></path>
              <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
            </svg>
          </a>
        </div>
      </div>
      </div>
				</div>
			</div>
    </header>
    <div id="ltn__utilize-mobile-menu" className="ltn__utilize ltn__utilize-mobile-menu">
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <div className="site-logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
                <img src={logol} alt="Logo" style={{ width: '200px', height: 'auto', borderRadius: '5px' , margin: '10px 0 0 0' }} />
          </Link>
          </div>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="ltn__utilize-menu-search-form">
          <form action="#">
            <input type="text" placeholder="Search..." />
            <button><i className="fas fa-search"></i></button>
          </form>
        </div>
        <div style={{ textAlign: 'left' }} className="ltn__utilize-menu">
          <ul>
          <li><Link to="/">Home</Link></li>
        <li><span class="menu-expand"></span>
        <a href="#">Service</a>
        <ul class="sub-menu">
                  <li>
									<Link to="/">Handy Persion</Link>
                  </li>
                  <li>
                  <Link to="/">Landscaping</Link>
                  </li>
                  <li>
                  <Link to="/">Plumbing</Link>
                  </li>
                  <li>
                  <Link to="/">Electrical</Link>
                  </li>
                  <li>
                  <Link to="/">Roofing</Link>
                  </li>
                  <li>
                  <Link to="/">Construction</Link>
								</li>
        </ul>
       </li>
       <li><span class="menu-expand"></span>
        <a href="#">More</a>
        <ul class="sub-menu">
        <li style={{ fontWeight: 'bold' ,textDecoration: 'underline'}} >Interior</li>
        <li><a href="#/">Electrical</a></li>
        <li><Link to="/error">Flooring</Link></li>
        <li><a href="#/">Plumbing</a></li>
        <li><a href="#/">Interior Painting</a></li>
        <li><a href="#/">Drywall</a></li>
        <li><a href="#/">HVAC</a></li>
        <li style={{ fontWeight: 'bold' ,textDecoration: 'underline'}} >Exterior</li>
        <li><a href="#/">Home Builders</a></li>
        <li><a href="#/">Concrete Repair</a></li>
        <li><a href="#/">Exterior Painting</a></li>
        <li><a href="#/">Guttur Cleaning</a></li>
        <li><a href="#/">Garage Door</a></li>
        <li><a href="#/">Window</a></li>
        <li style={{ fontWeight: 'bold' ,textDecoration: 'underline'}} >Construction</li>
        <li><a href="#/">New Construction</a></li>
        <li><a href="#/">Concrete Repair</a></li>
        <li><a href="#/">House Modify</a></li>
        <li><a href="#/">Concrete Coating</a></li>
        <li><a href="#/">Concrete Slab</a></li>
        </ul>
       </li>
           
       <li><span class="menu-expand"></span>
        <a href="#">About</a>
        <ul class="sub-menu">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/Service_Details">Service Details</Link></li>
        <li><Link to="/Team_Details">Team Details</Link></li>
        <li><Link to="/FAQ">FAQ</Link></li>
        <li><Link to="/Locations">Google Map Locations</Link></li>
        </ul>
       </li>     
       <li><Link to="/contact">Contact</Link></li>
           <li>
                    <div >
                      <li className="landMenu" ><a><Link  to="/Login" className="landMenubt">{log}</Link></a></li> 
                   </div>
               </li>


          </ul>
        </div>
        <div  style={{ textAlign: 'left' }} className="ltn__utilize-buttons ltn__utilize-buttons-2">
          <ul>
            <li>
            <Link to="/my-account" title="My Account">
                <span className="utilize-btn-icon"><i className="far fa-user" /></span>
                My Account
              </Link>
            </li>
            <li>
            <Link to="/my-account" title="My Account">
                <span className="utilize-btn-icon"><i className="far fa-heart" /></span>
                Status
              </Link>
            </li>
            <li>
            <Link to="/my-account" title="My Account">
                <span className="utilize-btn-icon"><i><img src={qickq} alt="Logo" style={{ width: '20px', height: 'auto' , margin: '10px 0 0 0' }} /></i></span>
                Quick Quote
              </Link>
            </li>
          </ul>
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



    

</>


    
  )
}

export default Header