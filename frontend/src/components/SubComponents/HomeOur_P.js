import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import photo1 from './assets/m27.jpg'
import photo2 from './assets/m28.jpg'
import bc from './assets/22.jpg'
const backgroundImageUrl = "url('./assets/22.jpg')";
const projectList = [
    {
      img: photo1,
      name: "Decks & Porches",
      place: "Apartment / Home",
      location: "Jaffna, SL",
      services: "10+",
      investment: "14,500RS"
    },
    {
      img: photo2, 
      name: "Dream Living Space",
      place: "Apartment / Home",
      location: "Lanka, 4000",
      services: "10+",
      investment: "17,500"
    }
  ];
const HomeOur_P = () => {

	const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [imageOpacity, setImageOpacity] = useState(1); 
    useEffect(() => {
        const interval = setInterval(() => {
            setImageOpacity(0); 
            setTimeout(() => {
                setCurrentProjectIndex(prevIndex => (prevIndex + 1) % projectList.length);
                setImageOpacity(1); 
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

      /////////////////////////////////////

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const section = document.querySelector('.sectionHo');

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

////////////////////////////////////
useEffect(() => {
    const handleScroll2 = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const section = document.querySelector('.sectionHd');

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
/////////////////////////////////////////////////
useEffect(() => {
    const handleScroll3 = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const section = document.querySelector('.sectionmt');

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


  return (
    <div className={`sectionmt ${isVisible3 ? 'hidden' : ''}`}>
<div className={"ltn__upcoming-project-area section-bg-1--- bg-image-toptm  pt-115 pb-65" } >
<div className="containermt">
  <div className="row">
    <div className="col-lg-12">
    <div className={`sectionHo ${isVisible ? 'hidden' : ''}`}>
      <div style={{textAlign:'justify', transition: 'opacity 1s, transform 5s'}} className={`section-title-area ltn__section-title-2--- text-center--- ${isVisible ? 'show':''}`}>
        <h6 className="section-subtitle section-subtitle-2--- ltn__secondary-color--- white-color">Upcoming Projects</h6>
        <h1 className="section-title  white-color">Dream Living Space <br />
          Setting New Standards</h1>
      </div>
   </div>
    </div>
  </div>
  <div className="row ltn__upcoming-project-slider-1-active slick-arrow-3">
    {/* upcoming-project-item */}
    <div className={`sectionHd ${isVisible2 ? 'hidden' : ''}`}>
    <div className="col-lg-12">
      <div style={{ transition: 'opacity 1s, transform 1s' }}className="ltn__upcoming-project-item">
        <div  className="rowho">
          <div className="col-lg-7">
            <div className="ltn__upcoming-project-img">
            <img
      src={projectList[currentProjectIndex].img}
      alt="Project Image"
      className="project-image" 
      style={{ 
        opacity: imageOpacity
      }}
    />
            </div>
          </div>
          <div className="col-lg-5 section-bg-1">
            <div style={{padding:'20px 20px'}} className="ltn__upcoming-project-info ltn__menu-widget">
              <h6 className="section-subtitle ltn__secondary-color mb-0">About Projects</h6>
              <h2 className="mb-30">Popular home projects</h2>
              <ul className="mt">
                          <li >1. Project Name: <span  >{projectList[currentProjectIndex].name}</span></li>
                          <li>2. Project Place: <span>{projectList[currentProjectIndex].place}</span></li>
                          <li>3. Appropriate Location: <span>{projectList[currentProjectIndex].location}</span></li>
                          <li>4. No. Of Service: <span>{projectList[currentProjectIndex].services}</span></li>
                          <li>5. Total Investment: <span>{projectList[currentProjectIndex].investment}</span></li>
                        </ul>
              <div className="btn-wrapper animated go-top">
              {/* className="project-image" style={{  opacity: imageOpacity }} */}
                <Link to="/contact" className="theme-btn-1 btn btn-effect-1">Get Brochure</Link>
              </div>
            </div>
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

export default HomeOur_P