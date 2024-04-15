import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cp from './assets/C_Constructin.png'
import pp from './assets/C_Paint.png'
import rp from './assets/C_Roofing.png'
import plp from './assets/C_Plum.png'
import ep from './assets/C_elect.png'
import pep from './assets/C_Bin.png'
const HomeService = () => {
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    useEffect(() => {
        const handleScroll3 = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const section = document.querySelector('.sectionhs');
    
            if (section) {
                const sectionTop = section.getBoundingClientRect().top;
    
                if (sectionTop < windowHeight / 1.5 && !isVisible3) {
                    setIsVisible3(true);
                } else if (sectionTop >= windowHeight / 1.5 && isVisible3) {
                    setIsVisible3(false);
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll3);
    
        return () => {
            window.removeEventListener('scroll', handleScroll3);
        };
    }, [isVisible3]);
///////////////////////////////////////////////////////////////////////////
useEffect(() => {
    const handleScroll2 = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const section = document.querySelector('.sectionHs_lv');

        if (section) {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < windowHeight / 1.5 && !isVisible2) {
                setIsVisible2(true);
            } else if (sectionTop >= windowHeight / 1.5 && isVisible2) {
                setIsVisible2(false);
            }
        }
    };

    window.addEventListener('scroll', handleScroll2);

    return () => {
        window.removeEventListener('scroll', handleScroll2);
    };
}, [isVisible2]);
  return (
    <div className="ltn__feature-area section-bg-1--- pt-115 pb-90 mb-120---" >
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-12">
                  <div className={`sectionhs ${isVisible3 ? 'hidden' : ''}`}>
			        <div style={{opacity:'1'}} className="section-title-area ltn__section-title-2--- text-center">
			          <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Services</h6>
			          <h1 className="section-title">Our Main Focus</h1>
			        </div>
                    </div>
			      </div>
			    </div>
			    <div className="row ltn__custom-gutter--- justify-content-center go-top">
                <div className='flex_lv'>
                    <div  style={{ transition: 'opacity 0.5s, transform 0.5s'}}  className={`sectionHs_lv ${isVisible2 ? 'hidden' : ''}`}>
			      <div className="col-lg-4 col-sm-6 col-12">
                    <div className='itn_in'>
			        <div style={{opacity:'1', transform:'none'}} className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div style={{textAlign:'center'}}  className="ltn__feature-icon">
			            <img src={cp} alt="#" />
			          </div>
			          <div style={{textAlign:'center'}}   className="ltn__feature-info">
			            <h3><Link to="/service-details">Construntin</Link></h3>
			            <p>Explore our range of home utility services. From plumbing to electrical solutions, we ensure quality in every service.</p>
			            <Link className="ltn__service-btn" to="/service-details">Find A Servicr <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
                    </div>
			      </div>
                  </div>
                  <div  style={{ transition: 'opacity 0.5s, transform 1s'}}  className={`sectionHs_lv ${isVisible2 ? 'hidden' : ''}`}>
			      <div className="col-lg-4 col-sm-6 col-12">
                  <div className='itn_in'>
                  <div style={{opacity:'1', transform:'none'}} className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div style={{textAlign:'center'}}  className="ltn__feature-icon">
			            <img src={pp} alt="#" />
			          </div>
			          <div style={{textAlign:'center'}}  className="ltn__feature-info">
			            <h3><Link to="/service-details">Painting</Link></h3>
			            <p>Explore our range of home utility services. From plumbing to electrical solutions, we ensure quality in every service.</p>
			            <Link className="ltn__service-btn" to="/service-details">Find A Service <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
                    </div>
			      </div>
                  </div>
                  <div  style={{ transition: 'opacity 0.5s, transform 1.5s'}}  className={`sectionHs_lv ${isVisible2 ? 'hidden' : ''}`}>
                  <div className="col-lg-4 col-sm-6 col-12">
                  <div className='itn_in'>
                  <div style={{opacity:'1', transform:'none'}} className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div style={{textAlign:'center'}}  className="ltn__feature-icon">
			            <img src={rp} alt="#" />
			          </div>
			          <div style={{textAlign:'center'}}  className="ltn__feature-info">
			            <h3><Link to="/service-details">Roofing</Link></h3>
			            <p>Explore our range of home utility services. From plumbing to electrical solutions, we ensure quality in every service.</p>
			            <Link className="ltn__service-btn" to="/service-details">Find A Service <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
                    </div>
			      </div>
                  </div>
                  </div>
                    <div className='flex_lv'>
                    <div  style={{ transition: 'opacity 0.5s, transform 2s'}}  className={`sectionHs_lv ${isVisible2 ? 'hidden' : ''}`}>
			      <div className="col-lg-4 col-sm-6 col-12">
                    <div className='itn_in'>
			        <div style={{opacity:'1', transform:'none'}} className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div style={{textAlign:'center'}}  className="ltn__feature-icon">
			            <img src={plp} alt="#" />
			          </div>
			          <div style={{textAlign:'center'}}   className="ltn__feature-info">
			            <h3><Link to="/service-details">Plumbing</Link></h3>
			            <p>Explore our range of home utility services. From plumbing to electrical solutions, we ensure quality in every service.</p>
			            <Link className="ltn__service-btn" to="/service-details">Find A Service <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
                    </div>
			      </div>
                  </div>
                  <div  style={{ transition: 'opacity 0.5s, transform 2.5s'}}  className={`sectionHs_lv ${isVisible2 ? 'hidden' : ''}`}>
			      <div className="col-lg-4 col-sm-6 col-12">
                  <div className='itn_in'>
                  <div style={{opacity:'1', transform:'none'}} className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div style={{textAlign:'center'}}  className="ltn__feature-icon">
			            <img src={ep} alt="#" />
			          </div>
			          <div style={{textAlign:'center'}}  className="ltn__feature-info">
			            <h3><Link to="/service-details">Electrical</Link></h3>
                        <p>Explore our range of home utility services. From plumbing to electrical solutions, we ensure quality in every service.</p>
			            <Link className="ltn__service-btn" to="/service-details">Find A Service <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
                    </div>
			      </div>
                  </div>
                  <div  style={{ transition: 'opacity 0.5s, transform 3s'}}  className={`sectionHs_lv ${isVisible2 ? 'hidden' : ''}`}>
			      <div className="col-lg-4 col-sm-6 col-12">
                  <div className='itn_in'>
			        <div style={{opacity:'1', transform:'none'}} className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div style={{textAlign:'center'}}  className="ltn__feature-icon">
			            <img src={pep} alt="#" />
			          </div>
			          <div style={{textAlign:'center'}} className="ltn__feature-info">
			            <h3><Link to="/service-details">Pest Control</Link></h3>
			            <p>Explore our range of home utility services. From plumbing to electrical solutions, we ensure quality in every service.</p>
			            <Link className="ltn__service-btn" to="/service-details">Find A Service <i className="flaticon-right-arrow" /></Link>
			          </div>
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

export default HomeService