import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import './plugin.css'
import p1 from './assets/x12.jpg'
import p2 from './assets/back00.png'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingSpinner from './assets/loading.svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeBanner = () => {
  const [isVisible3, setIsVisible3] = useState(false);
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };
    let publicUrl = process.env.PUBLIC_URL+'/'
    let imagealt = 'image'
    window.addEventListener('load', function() {
      window.addEventListener('scroll', function() {
        var element = document.querySelector('.slider-sticky-icon-2');
        var scrollPosition = window.scrollY;
    
        if (element) {
          if (scrollPosition > 100) {
            element.classList.add('show');
          } else {
            element.classList.remove('show');
          }
        }
      });
    });
    
    ///////////////////////////////////////////////
    function namech(){
      const name =["Mithu" , "Mathu", "Tuza"];
      const int = Math.floor(Math.random()*3);
      return name[int]
  }
  useEffect(() => {
    const windowHeight = window.innerHeight;
    const section = document.querySelector('.sectionmt');

    if (section) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight / 0 && !isVisible3) {
            setIsVisible3(true);
        } else if (sectionTop >= windowHeight / 0 && isVisible3) {
            setIsVisible3(false);
        }
    }
}, []); 
  return (
    <div className={`sectionmt ${isVisible3 ? 'hidden' : ''}`}>
  <div className="homeba">   
      {/* First Slide */} 
      <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3 ltn__slide-item-11">
        <div className="ltn__slide-item-inner" style={{backgroundColor:'#rgb(237 237 237)'}}>
          <div className="container">
            <div  style={{display:'flex'}} className="row">
              <div className="col-lg-12 align-self-center">
                <div className='slide-item-info'>
                    <h6 style={{color:'#70bef3'}} className="slide-sub-title white-color--- animated"><span></span> Home utility Agency</h6>
                    <h1 className="slide-title animated ">Find top-rated <span style={{color:'#258fff;'}} >Pros </span> <br /> in your area.</h1>
                    <div className="slide-brief animated">
                      <p>Explore our range of services and solutions designed to make your life easier</p>
                    </div>
                    <div style={{marginTop:'5px'}} className="btn-wrappertm animated">
                      <Link to="/service" className="theme-btn-1 btn btn-effect-1">Or SERVICES</Link>
                      <Link to="/about" style={{backgroundColor:'white' , marginTop:'10px'}} className="btn btn-transparent btn-effect-3">LEARN MORE</Link>
                    </div>
                    </div> 
              </div>
              {/* <div style={{display:'flex'}} className="slide-item-imghp">
                         <img className='evil' src={p2} alt="#" />    
                     </div>  */}
            </div> 
            </div>
           
       
        </div>
      </div>
   
    <div className="slider-sticky-icon-2">
			      <ul>
			        <li><a href="#" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
			        <li><a href="#" title="Twitter"><i className="fab fa-twitter" /></a></li>
			        <li><a href="#" title="Linkedin"><i className="fab fa-linkedin" /></a></li>
			      </ul>
			    </div>
          

</div>
</div>

  )
}

export default HomeBanner