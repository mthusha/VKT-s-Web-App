import React from 'react'
import offer from './assets/offer.png'
import arrow from './assets/arrow.png'
import { Link } from 'react-router-dom';
const UserOffer = (props) => {

    let Percentage = props.percentage;

  return (
    <div>
    <div class="offerbox">
        <div>
            <p style={{color:'rgb(255 255 255)' , paddingTop:'15px'}}><span>SEE YOUR PRICE</span><span style={{ fontSize: '25px', fontWeight: 'bold' }}>.</span> <span>PICK A TIME</span> <span style={{ fontSize: '25px', fontWeight: 'bold' }} >.</span><span className='offerspan' >MEMBERS GET UP TO {Percentage} OFF</span><span className='getoff' > MEMBERS GET UP TO {Percentage} OFF</span></p>
        </div>
        <div className='offboxp'>
           <p> How to become a member of this company?</p>
    
           <form action="" class="search-bar">
	         
	        <div class="exbutton" type="submit">
	        	<Link  ><span>Explore Now</span></Link>
                <img src={arrow} alt="Logo" style={{ width: '80px', height: 'auto', borderRadius: '5px' , margin: '30px -50px 0px ', position:'absolute' }} />
	        </div>
         
           </form>
        </div>
    </div>
    </div>
  )
}

export default UserOffer