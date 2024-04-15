import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from "axios";

const Explore_category = () => {

    const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/service_data");
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };


  
  return (

    <div>

     <div className="ltn__category-area ltn__product-gutter section-bg-1--- pt-115 pb-70">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-12">
			        <div className="section-title-area ltn__section-title-2--- text-center">
			    
			          <h1 style={{fontFamily:'math' , color:'#afafaf', textAlign:'justify'}} className="section-title">Explore by category</h1>
			        </div>
			      </div>
			    </div>
			    <div style={{display:'flex' , overflow:'auto', whiteSpace:"nowrap", scrollbarWidth:'none'}} className="row ltn__category-slider-active--- slick-arrow-1 justify-content-center go-top">
                 {data.map((d, i) => (
                <div key={i}>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-6">
			        <div className="ltn__category-item ltn__category-item-5 ltn__category-item-5-2 text-center---">
              <Link to={{ pathname: '/service', search: `?serviceName=${d.service_name}` }}>
			            <span style={{backgroundColor:' transparent'}} className="category-icon">                      
                        <img src={`data:image/png;base64,${d.icon}`} style={{ width: '83px', height: 'auto', borderRadius: '5px', transform: 'translateX(0)', margin: '0 0 0 0' }} alt="#" />
                         </span>
			            <span className="category-number">0{d.service_id}</span>
			            <span className="category-title"> {d.service_name}</span>
			            <span className="category-brief">
			              {d.description}
			            </span>
			          {/* <span className="category-btn d-none"><i className="flaticon-right-arrow" /></span> */}
			          </Link>
			        </div>
                  </div>
                  </div>
                  ))} 
			    </div>
			  </div>
			</div>
    </div>
  )
}

export default Explore_category