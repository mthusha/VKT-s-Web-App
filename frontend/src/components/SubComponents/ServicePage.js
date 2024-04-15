import React, { useEffect, useState }  from 'react'
import { Link, useNavigate,useParams,useLocation  } from "react-router-dom";
import axios from 'axios'
import Footer from './ProfileFooter.js'
import Header from './ProfileHeader.js'
import logo from './assets/vtk.png'
import back from './assets/services_back.png'
import tick from './assets/tick.png'
const ServicePage = () => {
    const location = useLocation();
    const [auth, setAuth] = useState(false);
    const serviceName = new URLSearchParams(location.search).get('serviceName');
    const navigate = useNavigate(); 
    const [bookingStatus, setBookingStatus] = useState('Book Now');
    axios.defaults.withCredentials= true;
    var serviceID;
    if (serviceName === 'Construction')
    serviceID = '1';
    else if (serviceName ==='Painting')
    serviceID = '2';
    else if  (serviceName==='Plumbing')
    serviceID = '3';
    else if (serviceName==='Electrical')
    serviceID="4";
    else if (serviceName ==='Roofing')
    serviceID="5"

    useEffect(() => {
      axios.get('http://localhost:8081')
        .then(res => {
          if (res.data.Status === "Success") {
            setAuth(true);
            axios.get(`http://localhost:8081/userData/${res.data.email}`)
            .then(userDataRes => {
                setserviceData({ ...serviceData, user_id: userDataRes.data.id, email: userDataRes.data.email, phone: userDataRes.data.phone });
             
            })
            .catch(userDataErr => {
              console.error('Error fetching user data:', userDataErr);
            });
          }else{
            setAuth(false)
           
          }
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }, []);

    const [serviceData, setserviceData] = useState({
        requst_id: '',
        user_id: '',
        service_id: serviceID,
        service_name: serviceName,
        type_of_service: '',
        need_item: '',
        need_item_count:'',
        cut_wall_st:'',
        ladder_height:'',
        purchasing_item_st:'',
        anything:'',
        time:'',
        date:'',
        email:'',
        phone:'',
      });

 // Submit the form to add

      const handleInsert = async (e) => {
        e.preventDefault();
        if (auth===false){ navigate('/login');}
        // else if (serviceData.type_of_service===''||serviceData.time===''||serviceData.email===''||serviceData.phone===''){
        //     setBookingStatus('Fill Nessasery  Fields')  ;  
        //     setTimeout(() => {
        //         setBookingStatus('Book Now');
        //       }, 4000);
        // }
        try {
            const response = await axios.post("http://localhost:8081/sr_requir", serviceData);
        
            if (response.data.message === 'Record inserted successfully') {
                setBookingStatus('Booked! Got to profile');
                setTimeout(() => {
                    setBookingStatus('Book Now');
                  }, 4000);
        
  
            } 
            else{
                setBookingStatus('Booking  Failed ! Try Again Later');
                setTimeout(() => {
                    setBookingStatus('Book Now');
                  }, 4000);
            }
          } catch (err) {
            console.log(err);
          
          }
      };


    
    
  return (
<div>
    <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-white">
    <div className="container">
    <div className="row">
        <div className="site-logo-wrap">
		<div className="site-logo go-top">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <img src={logo} alt="Logo"  />
            </Link>
	  </div>
    </div>
    </div>
    </div>
    <div>
    </div>
    </div>


    <div className='img_container'>
    <div className='img_c'>
    <p>.</p>
    </div>
    </div>

    <div className='serv_container'>
        <div className='sr_row1'>
            <div className='sr1'>
                <div className='sr2'>
                    <div className='sr_row1_h'>
                        <h4>{serviceName} Outlets & Fixtures - Install or Repair</h4>
                        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                    </div>
                    <div className='sr_row1_id'>
                        <input readOnly defaultValue={serviceName}  /> 
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>Select the type of service you need:&nbsp;</label><br/>
                            <select  onChange={(e) => setserviceData({ ...serviceData, type_of_service: e.target.value })} name="type" id="type" className="select-style">
                            <option value="0">Select</option>
                                <option value="installation">Installation</option>
                                <option value="repair">Replacement of existing components</option>
                                <option value="both">Both (Installation and Repair)</option>
                            </select>
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>Which items need this service?&nbsp;</label><br/>
                            <input onChange={(e) => setserviceData({ ...serviceData, need_item:  e.target.value })} name="type" id="type" className="select-style">
                            </input>
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>How many items need this service?&nbsp;</label><br/>
                        <select onChange={(e) => setserviceData({ ...serviceData,need_item_count: e.target.value })} name="type" id="type" className="select-style">
                        <option value="0">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="+4">+4</option>
                            </select>
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>Will the pro need to cut through the wall/ceiling/floor to do the job?&nbsp;</label><br/>
                        <select onChange={(e) => setserviceData({ ...serviceData,cut_wall_st:  e.target.value })} name="type" id="type" className="select-style">
                        <option value="0">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="Unsure">Unsure</option>
                                <option value="No">No</option>
                            </select>
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>If a ladder is required, what height is your ceiling?&nbsp;</label><br/>
                        <select onChange={(e) => setserviceData({ ...serviceData, ladder_height: e.target.value })} name="type" id="type" className="select-style">
                        <option value="0">Select</option>
                                <option value="N/A">N/A</option>
                                <option value="10-14ft">10-14ft</option>
                                <option value="14-17ft">14-17ft</option>
                                <option value="Over 17fr">Over 17ft</option>
                            </select>
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>Do you need assistance purchasing items required for the job?&nbsp;</label><br/>
                        <select onChange={(e) => setserviceData({ ...serviceData, purchasing_item_st: e.target.value })} name="type" id="type" className="select-style">
                        <option value="0">Select</option>
                                <option value="N/A - Items not needed">N/A - Items not needed</option>
                                <option value="Unsure if items are needed">Unsure if items are needed</option>
                                <option value="No - I will purchase prior to service">No - I will purchase prior to service</option>
                                <option value="Yes - I need help purchasing and will reimburse my Pro">Yes - I need help purchasing and will reimburse my Pro</option>
                            </select>
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>Anything else we should know?&nbsp;</label><br/>
                            <input onChange={(e) => setserviceData({ ...serviceData,anything:  e.target.value })} placeholder='Optinal' name="type" id="type" className="select-style">
                            </input>
                    </div>
                    <div className='sr_row1_id'>
                        <label for="type" style={{fontWeight:'bold'}}>When would you like us to come?&nbsp;</label><br/>
                            <input  onChange={(e) => setserviceData({ ...serviceData, date: e.target.value })} type='date' placeholder='22/07/1999' name="type" id="type" className="select-style">
                        </input>    
                        <input onChange={(e) => setserviceData({ ...serviceData, time: e.target.value })} type='time' placeholder='' name="type" id="type" className="select-style">
                        </input>
                        <input  onChange={(e) => setserviceData({ ...serviceData,  email: e.target.value })} type='text' placeholder='Address with ZIP' name="type" id="type" className="select-style">
                        </input>
                        <input value={serviceData.phone} onChange={(e) => setserviceData({ ...serviceData, phone: e.target.value })} type='text' placeholder='Phone' name="type" id="type" className="select-style">
                        </input>
                    </div>
                    <div className='book_test'>
                        <p style={{fontSize:'12px'}}>
                        By clicking Book Now, you agree and authorize VKT 
                        and its affiliates, and their networks of Service Professionals, 
                        to deliver marketing calls or texts using automated 
                        technology to the number you provided above regarding
                         your project and other home services offers.
                          Consent is not a condition of purchase.
                        </p>

                    </div>
                    <div className='sr_row1_id'>
                    <button onClick={handleInsert}
                     style={{   backgroundColor: bookingStatus === 'Booked! Got to profile' ? 'green' : bookingStatus === 'Booking  Failed ! Try Again Later' ? 'red' : 'rgb(1, 153, 255)'}}>{bookingStatus}
                     
                     </button>
                    </div>
                    <div className='booked'>

                    </div>



                </div>
            </div>

        </div>

        <div className='sr_row2'>
        <div className='sr1'>
                <div className='sr2'>
                <div className='sr_row1_h'>
                        <h2>{serviceName} Outlets & Fixtures - Install or Repair</h2>
                 </div>
                 <div className='rate_box'>
    <div className='rate_text'>
   <Link><h4 style={{marginTop:'19px',fontWeight:'normal',fontSize:'16px',color:'#88d8ff'}}>52,503 customers rated this service</h4></Link> 
  </div>
    <div class="rate">
    <input type="radio" id="star5" name="rate" value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="rate" value="4" />
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="rate" value="3" />
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="rate" value="2" />
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="rate" value="1" />
    <label for="star1" title="text">1 star</label>
  </div>
    </div>
          <div className='paragraph_box'>
            <p>
            We understand that your home maintenance tasks can often feel overwhelming, 
            especially with the demands of work and family life. At VKT Construction, 
            we offer a wide range of home utility services to alleviate the burden. 
            When you book our services, you'll connect with local professionals skilled in various trades, 
            ready to tackle any task. Whether it's electrical work, plumbing repairs, 
            or general maintenance, we've got you covered. 
            Our goal is to free up your time for more important priorities
            while ensuring that your home is in expert hands. With VKT Construction, 
            you can trust that your tasks will be handled efficiently and effectively, 
            giving you peace of mind.
            </p>
          </div>
          <div className='tick'>
           <div style={{display:'flex'}}>
           <img style={{width:'20px',height:'100%'}} src={tick} alt="Logo"  />
           <p style={{marginTop:'-6px',marginLeft:'13px'}}>Experienced, rated, and vetted professionals</p>
           </div>
           <div style={{display:'flex'}}>
           <img style={{width:'20px',height:'100%'}} src={tick} alt="Logo"  />
           <p style={{marginTop:'-6px',marginLeft:'13px'}}>Book appointments at your convenience, without any time constraints</p>
           </div>
           <div style={{display:'flex'}}>
           <img style={{width:'20px',height:'100%'}} src={tick} alt="Logo"  />
           <p style={{marginTop:'-6px',marginLeft:'13px'}}>Access to friendly customer service around the clock</p>
           </div>
           <div style={{display:'flex'}}>
           <img style={{width:'20px',height:'100%'}} src={tick} alt="Logo"  />
           <p style={{marginTop:'-6px',marginLeft:'13px'}}>Assured quality backed by our Service Quality Assurance</p>
           </div>

          </div>
         

            </div>
        </div>
        </div>

    </div>

<div style={{marginTop:'50px'}}>.</div>

 <Footer/> 
</div>
  )
}

export default ServicePage