import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import profile from './assets/3.jpg';

const ProsHead = ({ handleMenuClick }) => {
  const [name, setName] = useState([]);
  const [email , setEmail]=useState('')
  const [status , setStatus]=useState('')
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          axios.get(`http://localhost:8081/userData/${res.data.email}`)
            .then(userDataRes => {
              setName(userDataRes.data.name); 
              setEmail(res.data.email)
            
            })
            .catch(userDataErr => {
              console.error('Error fetching user data:', userDataErr);
            });

            // set status to online only when the user is logged
            axios.get(`http://localhost:8081/prosData/${res.data.email}`)
            .then(userDataRes => {
             
              setStatus(userDataRes.data.status)
            
            })
            .catch(userDataErr => {
              console.error('Error fetching user data:', userDataErr);
            });
        } else {
         
        }
        
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

// status update 
const handleClick = async () => {
  try {
    const response = await axios.post(`http://localhost:8081/prosStatus/${email}`);
    if (response.status === 200) {
      window.location.reload();
      console.log('Status updated successfully');
     
    } else {
      console.error('Failed to update status');
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};



  return (
    <div className='admin-header'>
      <div className='head_in'>
        <div className='pros_dis_no1'>
          <h1>VKT Consruction</h1>
        </div>
        <div className='ad_srch'>
          <form action="#">
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search..." style={{ border:'none', marginTop:'5px', paddingRight: '30px' }} />
              <i style={{ position: 'absolute', top: '40%', fontSize:'12px', right: '10px', transform: 'translateY(-50%)' }} className="fas fa-search"></i>
            </div>
          </form>
        </div>
        <div className='pros_ded_b'>
          <div className='ad_h_but'>
            <a onClick={handleMenuClick}><i className="fa fa-bars" aria-hidden="true"></i></a> 
          </div>
        </div>
        <div className='pros_profile'>
          <div className='prof_img' style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', marginTop:'15px', height: '40px' }}>
            <img src={profile} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <div className='ad_name'>
          <div className="col header-menu-column">
            <div className="header-menu d-none d-xl-block go-top">
              <nav>
                <div className="ltn__main-menu">
                  <ul>
                    <li>
                      <Link style={{fontSize:'12px'}} to="/about">{name}<i className="fa fa-angle-down" aria-hidden="true"></i></Link>
                      <ul className="sub-menu menu-pages-img-show">
                        <li>
                          <Link style={{fontSize:'12px'}} to="/service"><i style={{fontSize:'12px'}} className="fa fa-history" aria-hidden="true"></i>{" "}Activity Log</Link>
                        </li>
                        <li>
                          <Link style={{fontSize:'12px'}} to="/service"><i style={{fontSize:'12px', color:'red'}} className="fa fa-sign-in" aria-hidden="true"></i>{" "}Signout</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '17px' }} className='message'>
          <a href="/"><i className="fa fa-comments" aria-hidden="true"></i></a>
        </div>
        <div style={{ marginTop:'17px' }} className='ad_noti'>
          <a href="/"><i className="fa fa-bell" aria-hidden="true"></i></a>
        </div>
        <div style={{ marginTop:'17px' }} className='ad_npoff'>
          <Link onClick={handleClick} ><a ><i style={{ color: status === 'Available' ? '#1ad51a' : 'red'}}  className="fa fa-power-off" aria-hidden="true"></i> </a></Link>
         
        </div>
      </div>
    </div>
  );
}

export default ProsHead;
