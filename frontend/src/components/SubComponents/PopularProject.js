import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
const HomeProject = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/popolar");
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='popular_project'>
      <div className=''><h1>Keep your home in tip-top shape</h1></div>
      <div className='horizontal'>

      {data.map((d, i) => (
          <Link key={i} to='/'>
            <div
              className='popularbox'
              style={{
                backgroundImage: `url(data:image/png;base64,${d.ct_image})`,
                backgroundSize: 'cover'
              }}
            ></div>
          </Link>
        ))}


      </div>

    </div>
  )
}

export default HomeProject