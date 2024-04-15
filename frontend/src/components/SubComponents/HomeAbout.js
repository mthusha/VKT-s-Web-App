import React, { useEffect, useState } from 'react';
import x1 from './assets/x1.jpg'
import x2 from './assets/x2.jpg'
import hp2 from './assets/hp2.png'
import hp3 from './assets/hp3.png'
const HomeAbout = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [showItems, setShowItems] = useState(false);
	const [aboutImg, setaboutImg] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const section = document.querySelector('.section-title-area');

        if (section) {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < windowHeight / 1.5 && !isVisible) {
                setIsVisible(true);
            }

            if (scrollPosition === 0 && isVisible) {
         
                setIsVisible(false);
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, [isVisible]);

  /////////////////////////////////////////////////////////////
  useEffect(() => {
    const handleScroll2 = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const featureItems = document.querySelectorAll('.ltn__feature-item');
        const aboutImg = document.querySelectorAll('.about-us-img-wrap');

        featureItems.forEach(item => {
            if (featureItems.length > 0) {
                featureItems.forEach(item => {
                    const itemTop = item.getBoundingClientRect().top;

                    if (itemTop < windowHeight / 1.5) {
                        setShowItems(true);
                    }
                });
            }

            if (aboutImg.length > 0) {
                aboutImg.forEach(item => {
                    const itemTop = item.getBoundingClientRect().top;

                    if (itemTop < windowHeight / 2) {
                        setaboutImg(true);
                    }
                });
            }
        });


        if (scrollPosition === 0) {
           
            setShowItems(false);
            setaboutImg(false);
        }
    };

    window.addEventListener('scroll', handleScroll2);

    return () => {
        window.removeEventListener('scroll', handleScroll2);
    };
}, []);

///////////////////////////////////////////////



  return (
    <div style={{paddingTop:'0'}} className="ltn__about-us-area pt-115 pb-100 ">
			  <div style={{}} className="container">
			    <div  className="rowha">
				<div className="col-lg-6 align-self-center" style={{ position: 'relative' }}>
                   <div className={`about-us-img-wrap about-img-left ${aboutImg ? 'show' : ''}`}>
                      <img className='mimg'
                      style={{  transition: 'opacity 0.5s, transform 3s' }}
                      src={hp3}
                      alt="About Us Image"
                      />
                      </div>
                   </div>
			      <div  className="col-lg-6t align-self-center">
			        <div style={{marginTop:'90px'}} className="about-us-info-wrap">
			        <div
                        style={{ textAlign: 'left', transition: 'opacity 1s, transform 5s' }}
                         className={`section-title-area ltn__section-title-2--- mb-30 ${isVisible ? 'show' : ''}`}
                         >
                        <h6 className="section-subtitle section-subtitle-2--- ltn__secondary-color">About Us</h6>
                        <h1 className="section-title">VKT's Innovative Home Solutions</h1>
                       <p>With a dedicated team of over 50 professionals spanning across 10 states, VKT brings a global reach and specialized services to meet your needs.</p>
                      </div>
                      <div className="ltn__feature-wrapper">
      <div
        style={{ transition: 'opacity 0.5s, transform 0.5s',paddingTop:'0' }}
        className={`ltn__feature-item ltn__feature-item-3 ${showItems ? 'show' : ''}`}
      >
        <div className="ltn__feature-icon">
          <span><i style={{ marginTop: '50px' }} className="fa fa-heartbeat" aria-hidden="true"></i></span>
        </div>
        <div className="ltn__feature-info">
          <h4 style={{fontSize:'18px'}} ><a href="service-details.html">The Ideal Living Space</a></h4>
          <p style={{fontSize:'14px'}}>Vision for Your Comfort and Convenience, VKT's Commitment to Exceptional Living Environments</p>
        </div>
      </div>
      <div
        style={{ transition: 'opacity 0.5s, transform 1s' ,paddingTop:'0'}}
        className={`ltn__feature-item ltn__feature-item-3 ${showItems ? 'show' : ''}`}
      >
        <div className="ltn__feature-icon">
          <span><i style={{ marginTop: '50px' }} className="fa fa-globe" aria-hidden="true"></i></span>
        </div>
        <div className="ltn__feature-info">
          <h4 style={{fontSize:'18px'}} ><a href="service-details.html">World-Class Architectural Solutions</a></h4>
          <p style={{fontSize:'14px'}}>VKT's Expertise in Crafting Global Environments of Distinction and Unrivaled Expertise in Architectural Design</p>
        </div>
      </div>
      <div
        style={{ transition: 'opacity 0.5s, transform 1.5s',paddingTop:'0' }}
        className={`ltn__feature-item ltn__feature-item-3 ${showItems ? 'show' : ''}`}
      >
        <div className="ltn__feature-icon">
          <span><i style={{ marginTop: '50px' }} className="fa fa-commenting"   aria-hidden="true"></i></span>
        </div>
        <div className="ltn__feature-info">
          <h4 style={{fontSize:'18px'}} ><a href="service-details.html">Innovative Storage Solutions</a></h4>
          <p style={{fontSize:'14px'}} >VKT's Built-in Cupboards for Streamlined Living Spaces and Organized Living Experiences</p>
        </div>
      </div>
    </div>



			        </div>
			      </div>
			    </div>
			  </div>
			</div>
  )
}

export default HomeAbout