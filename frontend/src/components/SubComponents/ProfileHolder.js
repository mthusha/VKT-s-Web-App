import React from 'react';
import { Link } from "react-router-dom";
import Pback from './assets/pback.png';

const ProfileHolder = (props) => {
    let HeaderTitle = props.headertitle;
    let Name = props.name;
    let Subheader = props.subheader ;
    let CustomClass = props.customclass ? props.customclass : '';
    const breadcrumbAreaStyle = {
        backgroundColor: 'white',
        marginBottom: '120px',
        paddingTop: '110px',
        paddingBottom: '110px',
        boxShadow: '6px 4px 20px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px'
       
      };
      

  return (
    <div className='profileHolder'>
    <div className='profile-holder'>
    <div className={"somthing"} style={breadcrumbAreaStyle} >
      <div style={{marginLeft:'10px'}} className="container">
            <div className="ltn__breadcrumb-innerttmp">
            <h1 className="page-title">Welcome Back, <span style={{ color: 'black' }}>{HeaderTitle}</span></h1>
             
            </div>
          </div>
          <form action="" class="search-bar">
	            <input type="search" name="search" pattern=".*\S.*" placeholder='What do you need done?' required/>
	        <button class="search-btn" type="submit">
	        	<span>Search</span>
	        </button>
         
           </form>
           
          </div>
          <p style={{ marginTop:'-230px', marginLeft:'30px'}}> <div className="ltn__breadcrumb-list">
                <ul>
                  {/* <li style={{opacity:'0.5', fontStyle:'italic'}}><Link to="/support"><span className="ltn__secondary-color"><i className="fab fa-" /></span > Go to customer support</Link></li> */}
                  <li>{Subheader}</li>
                </ul>
              </div></p>
        </div>
        <div className='PH-imageHolder' >

        </div> 
        </div>
      

   
  )
}

export default ProfileHolder