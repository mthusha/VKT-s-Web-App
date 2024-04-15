import React, { useEffect, useState } from 'react'
import {Link, useParams , useLocation} from "react-router-dom"
import axios from 'axios'
import logo from './assets/vtkL2.png'
import construction_icon0 from './assets/construction_icon0.png'
import { data } from 'jquery'
const ProjectDetails = () => {
  const [timeline , settimeline]= useState(['10'])
    const [id, setid] = useState(localStorage.getItem('userId') || '');
    const [s_title, setTitle] = useState();
    const [addr, setAddr] = useState();
    const [s_name, setS_name]= useState()
    const [sdate, setSdate]= useState()
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [edate, setEdate]= useState()
    const [serviceId, setServiceId]= useState()
    const location = useLocation();
    const [provider, setProvider ]= useState([]);

    const requestId = new URLSearchParams(location.search).get('requestId');

    const currentDate = new Date();
    const differenceMs = new Date(edate) - currentDate;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    const [feedbackdata ,setFeedBackData] = useState({
      serviceId:'',
      sender:'user',
      feedback_mgs:'',
  })
    useEffect(() => {
        fetchData();
        return () => {
        
         localStorage.removeItem('userId');
       };
      }, []);
    const fetchData = async () => {
        try {
          
          const response = await fetch(`http://localhost:8081/servicedetail/${requestId}`);
          const responseData = await response.json();
            setid(responseData.requst_id);
          setTitle(responseData.service_name)
          setAddr(responseData.service_email)
          setS_name(responseData.type_of_service)
          setSdate(responseData.start_time)
          setEdate(responseData.end_time)
          setServiceId(responseData.status_id)
          setProvider(responseData)
          setFeedBackData(prevData => ({ ...prevData, serviceId: responseData.status_id }));
        } catch (err) {
          console.error(err);
        }
      };
//////////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {
  if (serviceId) {
    paymentData();
    feedbackData ();
  }
}, [serviceId]);

const paymentData = async () => {
  try {
    
    const response = await fetch(`http://localhost:8081/payment/${serviceId}`);
    const responseData = await response.json();
    if (Array.isArray(responseData)) {
      setData(responseData);
      
    }
    else {
      console.error("Response data is not an array:", responseData);
   
    
    }
  } catch (err) {
    console.error(err);
  }
};

// get feedback 
const feedbackData = async () => {
  try {
    
    const response = await fetch(`http://localhost:8081/feeback/${serviceId}`);
    const responseData = await response.json();
    if (Array.isArray(responseData)) {
      setData2(responseData);
      
    }
    else {
      console.error("Response data is not an array:", responseData);
   
    
    }
     // fetch timeline
     const response2 = await fetch(`http://localhost:8081/timeline/${serviceId}`);
     const responseData2 = await response2.json();
     if (Array.isArray(responseData2)) {
      settimeline(responseData2);
       
     }
     // fetch pros data

     else {
       console.error("Response data is not an array:", responseData);
    
    
     }
  } catch (err) {
    console.error(err);
  }
};
// send feeback
const handleInsertfb = async (e) => {
   
  try {
     
      const response = await axios.post("http://localhost:8081/addfeedback", feedbackdata);
      if (response.data.message === 'Record inserted successfully') {
        setData2(prevData => [...prevData, { message: feedbackdata.feedback_mgs, sender: 'user', timestamp: new Date().toLocaleTimeString() }]);
        
        setFeedBackData(prevData => ({ ...prevData, feedback_mgs: '' }));
      } 
      else {
        
      }
  } catch (err) {
      console.log(err);
  }
};

//////////////////////// total cost ////////////////////////////////
let totalCost = 0;
data.forEach((d) => {
  totalCost += parseFloat(d.cost);
});
// Calculate the duration between start_time and end_time percentage
const startDate = new Date(provider.start_time);
const endDate = new Date(provider.end_time);
const totalDuration = endDate - startDate;
const currentTime = new Date();
const remainingTime = endDate - currentTime;
let remainingDays 
let remainingHours
if (remainingTime>0){
    remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    remainingHours= Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
} else{
    remainingDays=0;
    remainingHours=0;
}

let percentage;
if (totalDuration > 0) {
  const elapsedTime = currentTime - startDate;
  percentage = Math.floor((elapsedTime / totalDuration) * 100);
  percentage = Math.max(0, Math.min(100, percentage));
} else {
  percentage = 0; 
}
const progressBarStyle = {
  '--value': percentage
};



  return (
    <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} className="">
          <div className='head_holder'>
            <Link to="/" style={{ textDecoration: 'none' }}>
             <img style={{ width: '200px', margin: '30px 0 0 4vw ' }} src={logo} alt="Logo" />
            </Link>
            </div>
             <div style={{paddingRight:'20px', marginTop:'30px'}} className='head_holder'>
             <Link style={{ color: 'red' }} to="/my-account" title="My Account">
      <span style={{ color: 'red' }} className="utilize-btn-icon"><i className="fa fa-sign-in" aria-hidden="true" /></span>
      Sign Out
    </Link>
  </div>
</div>

         <div className='project_details'>
            <div className='container' style={{display:'flex'}}>
                <div className='row_pd'>
                    <div className='h1_dp'>
                    <h1>{s_title} Outlets & Fixtures - Install or Repair</h1>
                    </div>
                    <div className='pd_location'>
                        <p><i class="fa fa-map-marker" aria-hidden="true"></i><span style={{marginLeft:'5px'}}>{addr}</span> <span>{'=>'}</span> <span><i  aria-hidden="true"></i>Project ID #{id}</span></p>
                    </div>
                    <div className='pd_bu'> 
                        <button>Manage Project</button>
                    </div>
                </div>
                <div className='row_pd'>
                    <img src={construction_icon0}></img>
                </div>
            </div>

         </div>

         <div className='other_cant'>
            <div className='container'>
            <div style={{paddingTop:'30px', paddingBottom:'10px'}} className='head_pd'>
                <h3>Pros quoting your project</h3>
                <p style={{opacity:'0.5'}}>We've sent your project details to these pros.</p>
            </div>
            <div style={{backgroundColor:'#d4fff1',maxWidth:'500px',boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} className='error_g_box'>
                <p style={{marginTop:'-10px'}}><i class="fa fa-exclamation" aria-hidden="true"></i><span style={{marginLeft:'8px'}}> No pros are currently available that are a good fit for your project.</span></p>
            </div>
            {/* */}
            <div className='pros_d'>
              <div className='in_box'>
              <div style={{padding:'0 10px'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>status</th>
                                   
                                  
                                </tr>
                            </thead>
                            <tbody>
                             
                            
                                <tr>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>{provider.provider_firsr_name}{" "}{provider.provider_last_name}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>{provider.provider_email}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>{provider.p_add}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>{provider.status}</td>
                                </tr>
                              
                               
                            </tbody>
                        </table>
                        
                    </div>
              </div>
            </div>
            <div className='timeline'>
              <div className='in-box'>
                <div className='.Scroll_pop '>
                  <div className='title_box'>
                    <h6>Timeline</h6>
                  </div>
                  <div>
                  <div className='bx_tc-timeline_round'>
                 <div className='list_of_w'>
    {timeline
     .filter(d => d.status !== '0')
        .map((d, i) => {
            const daysAgo = 5
            
            let backgroundColor;
            if (daysAgo < 5) {
                backgroundColor = '#43a147'; 
            } else if (daysAgo <= 10) {
                backgroundColor = 'orange';
            } else {
                backgroundColor = 'red';
            }

            const boxStyle = {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '2rem',
                height: '2rem',
                top: '8%',
                left: '2px',
             
                opacity: '1',
                background:'transparent',
                color: '#ffffff',
                borderRadius: '50%',
                boxShadow: 'none',
                fontSize: '0.875rem',
                marginLeft: '10px',
                marginTop: '15px'
            };

            return (
              <div key={i} className='box_w'>
              <div className='in_list'>
                  <div className='mui_box' style={boxStyle}>
                      <Link style={{color:'#5ae14b'}} to=""><i style={{fontSize:'25px'}} class="fa fa-check" aria-hidden="true"></i></Link> 
                  </div>
                  <div className='width_tm' style={{display:'flex',justifyContent:'space-between'}}>
                  <div className='mui_data'>
                      <p style={{fontWeight:'bold'}}>{d.distribution}</p>
                      <p style={{marginTop:'-22px'}}>scheduling considerations.</p>
                  </div>
               <div className="containerm" style={{position:'relative'}}>
                      <div >
                      <Link><span style={{fontSize:'13px'}} >{new Date(d.date).toLocaleDateString()}</span></Link>
                      </div>
                  </div> 
                  </div>
              </div>
          </div>
            );
            })}
            </div>
                 </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{width:'100%'}} className='underLine'>
                .
            </div>
            <div className='div_n'>
            <div  className="ad_rs_popup">
        <div className="popup-content">
        <div  className='rs_p_c_pd'>
                <form style={{marginTop:'-40px'}}>
                   <div style={{textAlign:'center', padding:'20px' ,color:'black',fontWeight:'bold'}} className='ad_h_modal-header'>
                    <p>Service Details</p>
                  
                   </div>
                   <div style={{scrollbarWidth:'thin'}} className='Scroll_pop'>
  
                   <div style={{marginLeft:'0'}} className='rs_pros'>
                        <p style={{marginBottom:'10px' ,fontWeight:'bold' }}>Work Quotatin</p>
                        <div style={{padding:'0 10px'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Payments</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                   
                                  
                                </tr>
                            </thead>
                            <tbody>
                             {data 
                            .map((d, i) => ( 
                                <tr key={i}>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>{d.description}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}> {d.cost}{" "}RS</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}> {d.status}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>{new Date (d.date).toLocaleDateString()} </td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}></td>
                                    
                                </tr>
                               ))
                              } 
                               <tr>
                                  <td colSpan="1" style={{textAlign: 'left', fontWeight: 'bold'}}>Total:</td>
                                  <td style={{fontSize:'12px',backgroundColor:'white', fontWeight: 'bold'}}>{totalCost.toFixed(2)} RS</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    {/* <div style={{backgroundColor:'black'}} className='underline'></div> */}
                    <div className='ad_project_st'>
                        
                        <div className='pro_st_title'>
                            <p style={{marginBottom:'10px' ,marginTop:'50px',fontWeight:'bold' }}>Work description</p>
                        </div>
                        
                        <div className='pro_st_details'>
                            <div className='pros_dt_da'>
                               
                            </div>
                            <p style={{fontSize:'14px', fontWeight:'bold'}}>Status description by provider</p>
                            <p style={{fontFamily:'math', fontSize:'14px',marginTop:'-10px'}}> VKT Painting has recently completed a project involving the 
                                repainting of the exteriors of several commercial buildings.
                                 Our skilled painters ensured that each surface was prepped 
                                 and painted to perfection, revitalizing the appearance of 
                                 these establishments.</p>
                                 <div className='status_bar'>
                                    <p style={{marginTop:'-10px',fontSize:'12px', fontWeight:'bold'}}>Status by Provider</p>
                                 </div>
                                 <div className='pros_percentage'>
                                 <div role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100}  style={progressBarStyle}></div>


                                 </div>
                            <div className='da_cus_sg'>
                                <p style={{fontSize:'13px', fontWeight:'bold'}}>Your previous suggestions</p>
                                   {data2
                                  // .sort((a, b) => a.fb_id - b.fb_id)
                                   .map((d, i) => (
                                       <div className='ct_box' key={i}>
                                            <div className={d.sender === 'provider' ? 'containerma darker' : 'containerma'}>
                                                <p style={{ marginBottom: '0', fontSize: '12px', textAlign: d.sender === 'provider' ? 'right' : 'left' }}>
                                                    {d.sender === 'provider' ? '' : 'You: '}
                                                  {d.message}
                                              </p>
                                              <span style={{ fontSize: '10px' }} className={d.sender === 'provider' ? 'time-left' : 'time-right'}>
                                                  {d.timestamp}
                                              </span>
                                          </div>
                                        </div>
                                       ))}
                            </div>  


                            <div className='res_something'>
                               <div style={{ position: 'relative' }}>
                                <textarea  onChange={(e) => setFeedBackData({ ...feedbackdata, feedback_mgs:  e.target.value })}
                                  placeholder='Want to say something...' className='comment-field' rows='4' cols='50'></textarea>
                             <div style={{ position: 'absolute', top: '120px', right: '5px', display: 'flex', gap: '10px' }}>
                                 <label style={{fontSize:'14px'}}>
                              {/* <input style={{transform: 'scale(0.8)', verticalAlign: 'middle'}} type='checkbox' /> */}
                                To provider
                                 </label>
                                 
                                 <Link  onClick={handleInsertfb}><i className="fa fa-paper-plane" aria-hidden="true"></i></Link>
                                 </div>
                                </div>
                              </div>
 
                            
                        </div>
                    </div>
                    </div>
                    </div>
                    <div style={{textAlign:'center'}} > <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                   
                </form>
              
    
            </div>
        
       

        </div>
    </div>
            </div>
            </div>

         </div>


         <div className='other_cant'>
            <div className='container'>
                <div  style={{paddingTop:'30px', paddingBottom:'10px'}}  className='dead_pd'>
                    <h3>Project details</h3>
                </div>
                <div className='flec_boxd'>
                    <div className='f1'>
                        <p>What needs to be installed/replaced?</p>
                        <h5>{s_name}</h5>
                    </div>
                    <div className='f2'>
                        <p>When do you need this work done?</p>
                        {differenceDays <= 0 ? (
                        <h5>The work was Completed at <br/><br/><span style={{color:'green'}}> {new Date (edate).toLocaleDateString()}</span></h5>
                         ) : (
                         <h5>{new Date(edate).toLocaleDateString()} (There are {differenceDays} Days left)</h5>
                          )}

                    </div>
                    <div className='f3'>
                    <p>Place</p>
                        <h5>Home</h5>
                    </div>

                </div>
            </div>
         </div>

         <div className='have_q'>
            <h3 style={{paddingTop:'20px',paddingBottom:'20px'}}>Have a question?</h3>
            <button>We can help</button>
           
         </div>

    </div>
  )
}

export default ProjectDetails