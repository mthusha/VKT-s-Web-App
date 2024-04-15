import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import profile from './assets/3.jpg'
import down from './assets/down.png'
import axios from 'axios';
const AdminHeadder = () => {
    const [name, setName] = useState([]);


    axios.defaults.withCredentials= true;
    useEffect(() => {
      axios.get('http://localhost:8081')
        .then(res => {
          if (res.data.Status === "Success") {
  
            axios.get(`http://localhost:8081/userData/${res.data.email}`)
            .then(userDataRes => {
              setName(userDataRes.data.name); 
            })
  
            .catch(userDataErr => {
              console.error('Error fetching user data:', userDataErr);
            });
  
          }else{
    
  
          }
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }, []);


  return (
    <div className='admin-header'>

        <div className='head_in'>
            
           <h1>VKT Consruction</h1>
           <div className='ad_h_but'>
              <a><i  class="fa fa-bars" aria-hidden="true"></i></a>
          </div>
          <div className='ad_srch' >
          <form action="#">
         <div style={{ position: 'relative' }}>
         <input type="text" placeholder="Search..." style={{ border:'none',marginTop:'5px',paddingRight: '30px' }} />
         <i style={{ position: 'absolute', top: '40%',fontSize:'12px', right: '10px', transform: 'translateY(-50%)' }} className="fas fa-search"></i>
         </div>
        </form>
          </div>


          <div className='ad_profile'>
          <div className='prof_img' style={{ borderRadius: '50%', overflow: 'hidden', width: '40px',marginTop:'15px', height: '40px' }}>
              <img src={profile} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         </div>
          </div>
          <div className='ad_name'>
         <div   className="col header-menu-column">
        <div className="header-menu d-none d-xl-block go-top">
          <nav>
            <div className="ltn__main-menu">
              <ul>
            
         <li >
                <Link style={{fontSize:'12px'}} to="/about">{name}<i class="fa fa-angle-down" aria-hidden="true"></i></Link>
                  <ul className="sub-menu menu-pages-img-show">
                    <li>
				 <Link style={{fontSize:'12px'}} to="/service"><i  style={{fontSize:'12px'}} class="fa fa-history" aria-hidden="true"></i>{" "}Activity Log</Link>
                  </li>
                  <li>
                  <Link style={{fontSize:'12px'}} to="/service"><i  style={{fontSize:'12px', color:'red'}} class="fa fa-sign-in" aria-hidden="true"></i>{" "}Signout</Link>
                  </li>
                  </ul>
                </li>
                </ul>
                </div>
                </nav>
                </div>
         </div>
      </div>
   
        <div  style={{ marginTop: '17px' }} className='message'>
            <a href="/"><i class="fa fa-comments" aria-hidden="true"></i></a>
        </div>
        <div  style={{ marginTop:'17px' }} className='ad_noti'>
            <a href="/"><i class="fa fa-bell" aria-hidden="true"></i></a>
        </div>
        <div  style={{ marginTop:'17px' }}  className='ad_npoff'>
            <a href="/"><i style={{opacity:'0'}} class="fa fa-power-off" aria-hidden="true"></i></a>
        </div>
    
      </div>
    </div>
  )
}

export default AdminHeadder