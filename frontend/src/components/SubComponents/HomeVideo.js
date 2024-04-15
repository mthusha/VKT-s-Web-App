import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"

const HomeVideo = () => {
	const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [imageOpacity, setImageOpacity] = useState(1); 
    useEffect(() => {
        const handleScroll3 = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const section = document.querySelector('.sectionmt_lv');
            if (section) {
                const sectionTop = section.getBoundingClientRect().top;
    
                if (sectionTop < windowHeight / 1.2 && !isVisible3) {
                    setIsVisible3(true);
                } else if (sectionTop >= windowHeight / 1.2 && isVisible3) {
                    setIsVisible3(false);
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll3);
    
        return () => {
            window.removeEventListener('scroll', handleScroll3);
        };
    }, [isVisible3]);
    //////////////////////////////////////////////////////////////////
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const section = document.querySelector('.sectionHo_lv');

            if (section) {
                const sectionTop = section.getBoundingClientRect().top;

                if (sectionTop < windowHeight / 1.5 && !isVisible) {
                    setIsVisible(true);
                } else if (sectionTop >= windowHeight / 1.5 && isVisible) {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);
    //////////////////////////////////////////////////////////
    useEffect(() => {
        const handleScroll2 = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const section = document.querySelector('.sectionHd_lv');
    
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
  <div className={`sectionmt_lv ${isVisible3 ? 'hidden' : ''}`}>
    <div className="ltn__about-us-area section-bg-1 bg-image-right-before pt-120 pb-90">
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between'}} className="rowy">
        <div className="col-lg-6 align-self-center">
          <div className="about-us-info-wrap">
          <div className={`sectionHo_lv ${isVisible ? 'hidden' : ''}`}>
            <div style={{opacity:'1',textAlign:'left'}} className="section-title-area ltn__section-title-2--- mb-20">
              <h6 className="section-subtitle section-subtitle-2--- ltn__secondary-color">Building Facilities</h6>
              <h1 className="section-title">Making living spaces
                More Beautiful</h1>
              <p>Over 39,000 people work for us in more than 70 countries all over the
                This breadth of global coverage, combined with specialist services</p>
            </div>
            </div>
            <ul className="ltn__list-item-half ltn__list-item-half-2 list-item-margin clearfix">
              
              <li style={{ transition: 'opacity 0.5s, transform 0.5s'}}  className={`sectionHd_lv ${isVisible2 ? 'hidden' : ''}`}>
                <i className="icon-done" />
                Living rooms are pre-wired for Surround
              </li>
              <li style={{ transition: 'opacity 0.5s, transform 1s'}}  className={`sectionHd_lv ${isVisible2 ? 'hidden' : ''}`}>
                <i className="icon-done" />
                Luxurious interior design and amenities
              </li>
              <li  style={{ transition: 'opacity 0.5s, transform 1.5s'}}  className={`sectionHd_lv ${isVisible2 ? 'hidden' : ''}`}>
                <i className="icon-done" />
                Nestled in the Buckhead Vinings communities
              </li>
              <li  style={{ transition: 'opacity 0.5s, transform 2s'}} className={`sectionHd_lv ${isVisible2 ? 'hidden' : ''}`}>
                <i className="icon-done" />
                Private balconies with stunning views
              </li>
              <li  style={{ transition: 'opacity 0.5s, transform 2.5s'}} className={`sectionHd_lv ${isVisible2 ? 'hidden' : ''}`}>
                <i className="icon-done" />
                A rare combination of inspired architecture
              </li>
              <li  style={{ transition: 'opacity 0.5s, transform 3.5s'}}  className={`sectionHd_lv ${isVisible2 ? 'hidden' : ''}`}>
                <i className="icon-done" />
                Outdoor grilling with dining court
              </li>
            </ul><div></div>
            <div className="ltn__animation-pulse2 text-center mt-30" onClick={() => window.open("https://www.youtube.com/watch?v=jXUm5sy3eiI")}>
              <a className="ltn__video-play-btn bg-white--- ltn__secondary-bg" href="https://www.youtube.com/watch?v=jXUm5sy3eiI" data-rel="lightcase">
              <i style={{color:'white'}} class="fa fa-play" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 align-self-center">
          <div className="about-us-img-wrap about-img-left">
            <div className='hid'>
          <div className="about-us-info-wrap">
            <div style={{opacity:'0'}} className="section-title-area ltn__section-title-2--- mb-20">
              <h6 className="section-subtitle section-subtitle-2--- ltn__secondary-color">Building Facilities</h6>
              <h1 className="section-title">Making living spaces
                More Beautiful</h1>
              <p>Over 39,000 people work for us in more than 70 countries all over the
                This breadth of global coverage, combined with specialist services</p>
            </div>
            <ul className="ltn__list-item-half ltn__list-item-half-2 list-item-margin clearfix">
              <li>
                <i className="icon-done" />
                Living rooms are pre-wired for Surround
              </li>
              <li>
                <i className="icon-done" />
                Luxurious interior design and amenities
              </li>
              <li>
                <i className="icon-done" />
                Nestled in the Buckhead Vinings communities
              </li>
              <li>
                <i className="icon-done" />
                Private balconies with stunning views
              </li>
              <li>
                <i className="icon-done" />
                A rare combination of inspired architecture
              </li>
              <li>
                <i className="icon-done" />
                Outdoor grilling with dining court
              </li>
            </ul>
            {/* <div className="  ltn__animation-pulse2 text-center mt-30">
              <a className="ltn__video-play-btn bg-white--- ltn__secondary-bg" href="" data-rel="lightcase">
                <i className="icon-play  ltn__secondary-color--- white-color" />
              </a>
            </div> */}
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

export default HomeVideo