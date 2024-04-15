import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js'
import Footer from './Footer.js';
import HomeBanner from './SubComponents/HomeBanner.js';
import HomeAbout from './SubComponents/HomeAbout.js';
import HomeOur_P from './SubComponents/HomeOur_P.js';
import HomeVideo from './SubComponents/HomeVideo.js';
import HomeService from './SubComponents/HomeService.js';

const Home = () => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const namech = () => {
    const names = ['welcome to great kirikalan magic show', 'welcome to great kirikalan magic show', 'welcome to great kirikalan magic show'];
    const randomIndex = Math.floor(Math.random() * 3);
    return names[randomIndex];
  };

  const [name, setName] = useState('Tuza');
  const [textColor, setTextColor] = useState(getRandomColor());

  const namech2 = () => {
    const names = ['home1', 'home2', 'home3'];
    const randomIndex = Math.floor(Math.random() * 3);
    setName(names[randomIndex]);
    setTextColor(getRandomColor());
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      namech2();
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []); 

  ////////////////////////////////////////////////////

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2500);

    return () => clearTimeout(timer); 
  }, []);

  // if (isLoading) {
  //   return <LoadingSpinner />; 
  // }

  return (
    

        <main>
        <Header />
        <HomeBanner/>
        <HomeAbout/>
        <HomeVideo/>
        <HomeService />
        <HomeOur_P/>
      {/* <p style={{ height: '100%', marginTop: '500px', color: textColor, textAlign: 'center', fontSize:'20px' }}>{namech()}</p> */}
      <p style={{ height:'100%', marginTop:'80px', display:'flex',color:'red'}} >.</p>
      <Footer />
    </main>
  );
};

export default Home;
