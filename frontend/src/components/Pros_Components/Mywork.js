import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import C_Roofing from './assets/C_Roofing.png'
import wq from './assets/wq.png'
import ct from './assets/ct.png'
const Mywork = () => {
    
const [data2, setData2] = useState([]);
const [email, setEmail]=useState("");
const [id, setId]= useState("")
const [userId, setUserId] = useState('');
const [responseData, setResponseData] = useState([]);
const [responseData_sp, setResponseData_sp] = useState([]);
const [paymentdata, setPaydata] = useState([]);
const [feedback, setFeedback] = useState([]);
// selected service status id
const [serviceId, setServiceId]= useState('');
const [selectedOption, setSelectedOption] = useState('');
const [isPopupVisible, setIsPopupVisible] = useState(false);
const [paymentDatas, setPaymenteData] = useState({
    description:'',
    cost:'',
    status_id:'',
    status:'',

  });
const [feedbackdata ,setFeedBackData] = useState({
    serviceId:'',
    sender:'provider',
    feedback_mgs:'',
})
const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
};
const handleAddQuotation = (event) => {
    event.preventDefault();
    setShowNewField((prevShowNewField) => !prevShowNewField);
};

const handleChange = (event) => {
    setSelectedOption(event.target.value);
};

// get Workser id
useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setEmail(res.data.email);

          axios.get(`http://localhost:8081/prosData/${res.data.email}`)
            .then(userDataRes => {
              setId(userDataRes.data.provider_id);
              setUserId(userDataRes.data.provider_id);
            })
            .catch(err => {
              console.error('Error fetching user data:', err);
            });
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
}, []);
// fetch service status id
useEffect(() => {
  if (userId) {
    fetchData();
  }
}, [userId]);


const fetchData = async () => {
  try {
    const response = await fetch(`http://localhost:8081/ssId/${userId}`);
    const responseData = await response.json();
    
    if (Array.isArray(responseData)) {
    
      setResponseData(responseData); 
    } else {
      console.error("Response data is not an array:", responseData);
    }
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
    const fetchData_SP = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/servicedata_pros/${selectedOption}`);
        setResponseData_sp(response.data);
        setPaymenteData(prevData => ({ ...prevData, status_id: selectedOption }));
        setFeedBackData(prevData => ({ ...prevData, serviceId: selectedOption }));
        setServiceId(selectedOption)
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
// payment
const paymentData = async () => {
    try {
      
      const response = await fetch(`http://localhost:8081/payment/${selectedOption}`);
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        setPaydata(responseData);
       
      }
      else {
        console.error("Response data is not an array:", responseData);
     
      setPaydata(['0'])
      }
    } catch (err) {
      console.error(err);
    }
  };


 if (selectedOption) {
      fetchData_SP();
      paymentData();
    }
  }, [selectedOption]);

// insert payment
const handleInsertPay = async (e) => {
    e.preventDefault();
    try {
       
        const response = await axios.post("http://localhost:8081/addpayment", paymentDatas);
        if (response.data.message === 'Record inserted successfully') {
            togglePopup();
        } 
        else {
            // Handle other responses if necessary
        }
    } catch (err) {
        console.log(err);
    }
};
// insert feedback
const handleInsertfb = async (e) => {
   
    try {
       
        const response = await axios.post("http://localhost:8081/addfeedback", feedbackdata);
        if (response.data.message === 'Record inserted successfully') {
            setFeedback(prevData => [...prevData, { message: feedbackdata.feedback_mgs, sender: 'provider', timestamp: new Date().toLocaleTimeString() }]);
        
        setFeedBackData(prevData => ({ ...prevData, feedback_mgs: '' }));
        } 
        else {
           
        }
    } catch (err) {
        console.log(err);
    }
};

//get feedback
const feedbackData = async () => {
    try {
      
      const response = await fetch(`http://localhost:8081/feeback/${serviceId}`);
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        setFeedback(responseData);
        
      }
      else {
        console.error("Response data is not an array:", responseData);
      setFeedback('')
      }

    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (serviceId) {
        setserviceData({ ...serviceData,service_id: serviceId  })
        feedbackData();
    }
}, [serviceId]);


//total cost
let totalCost = 0;
paymentdata.forEach((d) => {
  totalCost += parseFloat(d.cost);
});

  // date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };
  
// add field
const [showNewField, setShowNewField] = useState(false);

// Calculate the duration between start_time and end_time percentage
const startDate = new Date(responseData_sp.start_time);
const endDate = new Date(responseData_sp.end_time);
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

// add timeline
const [serviceData, setserviceData] = useState({

    service_id: '',
    distribution:'',
    nd_description:'',

  });
  const handleInsert = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8081/addtimeline", serviceData);
        if (response.data.message === 'Record inserted successfully') {
           
            fetchTimelineData();
        } else {
           
        }
    } catch (err) {
        console.log(err);
    }
};

const fetchTimelineData = async () => {
    try {
        const response = await fetch(`http://localhost:8081/timeline/${serviceId}`);
        const responseData = await response.json();
        if (Array.isArray(responseData)) {
            setData2(responseData);
        } else {
            console.error("Response data is not an array:", responseData);
            setData2([]);
        }
    } catch (err) {
        console.error(err);
    }
};


  return (
    <div className='pr_mywork'>
        
        <div className='p_mywork_in-box'>
            <div className='pr_first_row'>
                <div className='choose_bar'>
                    <div className='meadia_btn'>
                        <Link><a><i class="fa fa-angle-right" aria-hidden="true"></i></a></Link>
                    </div>
                    <div className='refresh_'>
                        <Link><a style={{marginLeft:'10px'}}><i style={{fontSize:'15px'}} class="fa fa-refresh" aria-hidden="true"></i><span style={{marginLeft:'10px'}}></span>Refresh</a></Link>
                    </div>
                    <div className='view_my_calendar'>
                        <Link><a><i class="fa fa-calendar-check-o" aria-hidden="true"></i></a></Link>

                    </div>
                    <div style={{ position: 'absolute', top: 0, right: 0 }}  className='choose_work'>
                       <div className='work_sl_pr'>
                       <select value={selectedOption} onChange={handleChange}>
                        <option value="">Select Service Id</option>
                          {responseData
                          .filter (item => item.chk !== 0 )
                          .map((item, index) => (
                          <option key={index}>{item.status_id}</option>
                           ))}
                       </select>
                       </div>
                    </div>
                </div>
                
                <div style={{width:'100%' ,backgroundColor:'#d6d6d6', marginTop:'5px'}} className='underLine'></div>

                <div className='t_d_c'>
                    <div className='pros_work_dtl'>
                        <div className='dtl_in'>
                        <div className='pro_row'>
                            <div className='dtl_title'>
                                <div className='dtl_roud_ico'>
                                <div className='pros_percentage'> 
                                <div role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100}  style={progressBarStyle}></div>
                                 </div>
                                </div>
                                <div className='dtl_tile'>
                                <p>{responseData_sp.service_name}</p>
                                <h6>{responseData_sp.sd}</h6>
                                </div>
                                </div>
                            </div>
                            <div  className='up_line'>.</div>
                            <div className='pro_row'>
                            <div style={{marginTop:'5px'}} className='end_cal'> 
                              <div className='dtl_tile'>
                              <p>Ets.Close Date</p>
                               {responseData_sp.end_time ? (
                                <h6>{formatDate(responseData_sp.end_time)}</h6>
                                ) : (
                               <p>No close date available</p>
                                 )}
                              </div>
                            </div>
                            </div>
                            <div  className='up_line'>.</div>
                            <div className='pro_row'>
                            <div style={{marginTop:'5px'}} className='est_estimat'>
                            <div className='dtl_tile'>
                            <p>Ets.Quotatin</p>
                              {!isNaN(totalCost) ? (
                              <h6>{totalCost.toFixed(2)} Rs.</h6>
                               ) : (
                              <p style={{color:'red'}}>Not estimated</p>              
                                )}
                              </div>
                            </div>
                            </div>
                            <div  className='up_line'>.</div>
                            <div className='pro_row'>
                            <div style={{marginTop:'5px'}} className='pros_p_status'>
                            <div className='dtl_tile'>
                               <p>Status</p>
                               <h6>{responseData_sp.status}</h6>
                               </div>
                            </div>
                            </div>
                            <div  className='up_line'>.</div>
                            <div className='pro_row'>
                            <div style={{marginTop:'5px'}} className='pros_p_owner'>
                            <div className='dtl_tile'>
                               <p>Customer</p>
                              <Link><a><i style={{ marginLeft:'-4px',fontSize:'13px'}} class="fa fa-user" aria-hidden="true"></i><span style={{fontWeight:'bold'}}>{" "}{responseData_sp.user_firsr_name}{" "}{responseData_sp.user_last_name}</span></a></Link>
                               </div>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div style={{margin:'0',padding:'0'}} className='pros_work_flow'>
                        <div className='p-w_f-flex'>
                            <div style={{backgroundColor:"#70bef3", marginTop:'12px'}} className='p-w_tbox'>
                                <h6>Service process </h6>
                                <p>Complete in {remainingDays} days and {remainingHours} hours</p>
                            </div>
                            <div className='wr_fl_chrt'>
                             
                            </div>
                        </div>
                    </div>
               <div className='pros_content'>
                   <div className='con_title'>
                    <div className='select_bar'>
                        <h6>Summary</h6>
                    </div>
                   </div>

                   <div className='box_colle'>
                    <div className='box_c_flex'>
                        <div className="bx_c_t">
                            <div className='bx_ct_in'>
                            <div style={{display:'flex', justifyContent:'space-between'}} className='bx_c_t_title'>
                        <div><p style={{margin:'0', fontWeight:'bold'}}>Owner Info</p></div>
                        <div style={{display:'flex'}}>
                            <div><Link><a><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a></Link></div>
                        </div>
                    </div>
                    <div style={{width:'100%',backgroundColor:'#e0e0e0'}} className='underLine'></div>
                            <div style={{maxHeight:'100%'}} className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Something</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>Topic</td>
                                    <td>{responseData_sp.sd}</td>
                                </tr>
                                <tr >
                                    <td>Customer</td>
                                    <td>{responseData_sp.user_firsr_name}{" "}{responseData_sp.user_last_name}</td>
                                </tr>
                                <tr >
                                    <td>Account</td>
                                    <td>{responseData_sp.user_mail}</td>
                                </tr>
                                <tr >
                                    <td>Phone</td>
                                    <td>{responseData_sp.user_email}</td>
                                </tr>
                                <tr >
                                    <td>Timeline</td>
                                    <td>Next Quarter</td>
                                </tr>
                                <tr >
                                    <td >Quotatin</td>
                                    <td style={{ color: isNaN(totalCost) ? 'red' : 'inherit' }}>{isNaN(totalCost) ? 'Not estimated' : `${totalCost.toFixed(2)} RS`}</td>
                                </tr>
                                <tr >
                                    <td>Payment Process</td>
                                    <td>Commitee</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
               </div>
            </div>
            <div  className="bx_c_t">
                <div className='bx_ct_in'>
                    <div style={{display:'flex', justifyContent:'space-between'}} className='bx_c_t_title'>
                        <div><p style={{margin:'0', fontWeight:'bold'}}>Timeline</p></div>
                        <div style={{display:'flex'}}>
                            <div><Link><a><i class="fa fa-plus" aria-hidden="true"></i></a></Link></div>
                            <div><Link><a><i class="fa fa-filter" aria-hidden="true"></i></a></Link></div>
                            <div><Link><a><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a></Link></div>
                        </div>
                    </div>
                    <div style={{width:'100%',backgroundColor:'#e0e0e0'}} className='underLine'></div>
                   <div className='timeline_src'>
                   <div style={{display:'block'}} className='ad_srch'>
                     <form action="#">
                       <div style={{ position: 'relative' }}>
                       <input onChange={(e) => setserviceData({ ...serviceData, distribution:  e.target.value })} type="text" placeholder="Add what you did today..." style={{ border:'none', marginTop:'5px', paddingRight: '30px' }} />
                      <Link  onClick={handleInsert}> <i style={{ position: 'absolute', top: '40%', fontSize:'12px', right: '20px', transform: 'translateY(-50%)' }} className="fa fa-bookmark"></i></Link>
                      </div>
                   </form>
                   </div>
                   </div>
                   <div style={{paddingRight:'110px'}}>  <div style={{width:'100%',backgroundColor:'#e0e0e0', marginLeft:'50px', marginTop:'-30px'}} className='underLine'></div></div>
                 <div className='bx_tc-timeline_round'>
                 <div className='list_of_w'>
    {data2
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
                background: 'transparent',
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
                        <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
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
            <div style={{border:'none', overflow:'hidden',width:'97%'}} className="bx_c_t">
                <div className='bx_ct_in'>
                    <div className='bx_3'>
                    <div style={{border:'0.5px solid #e0e0e0',marginBottom:'20px',marginRight:'10px'}} className='bx_ct_inline'>
                    <div className='in_br_box'>
                        <div className='br_title'>
                    <div style={{display:'flex', justifyContent:'space-between'}} className='bx_c_t_title'>
                        <div style={{display:'flex'}}><div>< img style={{maxWidth:'30px', marginTop:'5px'}} src={wq}></img></div> <div><p style={{margin:'0', fontWeight:'bold',marginTop:'5px', marginLeft:'10px'}}>Work Quotatins</p></div></div>
                        <div><Link onClick={togglePopup}><a><i class="fa fa-plus" aria-hidden="true"></i></a></Link></div>
                    </div>
                        </div>
                        <div style={{paddingRight:'110px'}}>  <div style={{width:'100%',backgroundColor:'#e0e0e0', marginLeft:'50px', marginTop:'-10px'}} className='underLine'></div></div>
                  <div className='content_box'>
                    <div className='last_int'>
                        <p style={{fontWeight:'bold',fontSize:'13px',padding:'10px',margin:'0'}}>Last Interaction</p>
                        <div style={{display:'flex'}} className='int_info'>
                            <div><Link ><i style={{marginTop:'13px'}} class="fa fa-angle-double-left" aria-hidden="true"></i></Link></div>
                            <div style={{marginLeft:'20px'}}> <p style={{margin:'0',fontSize:'12px'}}>Saturday, January 5, 2024 4:26pm</p> 
                            <p style={{margin:'0',fontSize:'14px',fontWeight:'bold'}}>Inquire about Quotatin</p>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop:'10px'}} className='all_int'>
                        <div className='int_table'>
                        <div style={{padding:'0 10px',maxHeight:'150px',scrollbarWidth:'thin'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th style={{fontSize:'13px'}}>Description</th>
                                    <th style={{fontSize:'13px'}}>Payments</th>
                                    <th style={{fontSize:'13px'}}>Status</th>
                                  
                                   
                                  
                                </tr>
                            </thead>
                            <tbody>
                           {paymentdata
                           .map((d, i) => ( 
                            <tr key={i}>
                                    <td style={{fontSize:'11px',backgroundColor:'white'}}>{d.description}</td>
                                    <td style={{fontSize:'11px',backgroundColor:'white'}}> {d.cost}{" "}RS</td>
                                    <td style={{fontSize:'11px',backgroundColor:'white'}}> </td>
                                
                                   
                                </tr>
                               )) 
                           }
                               <tr>
                                  <td colSpan="1" style={{textAlign: 'left', fontWeight: 'bold',fontSize:'13px'}}>Total:</td>
                                  <td style={{ fontSize: '11px', backgroundColor: 'white', fontWeight: 'bold', color: isNaN(totalCost) ? 'red' : 'inherit' }}>
                                 {isNaN(totalCost) ? 'Not estimated' : `${totalCost.toFixed(2)} RS`}
                                </td>

                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                        </div>
                    </div>
                  </div>
                  
                    </div>
                    </div>

                    <div style={{border:'0.5px solid #e0e0e0'}}  className='bx_ct_inline'>
                    <div className='in_br_box'>
                    <div className='br_title'>
                    <div style={{display:'flex', justifyContent:'space-between'}} className='bx_c_t_title'>
                        <div style={{display:'flex'}}><div>< img style={{maxWidth:'30px', marginTop:'5px'}} src={ct}></img></div> <div><p style={{margin:'0', fontWeight:'bold',marginTop:'5px', marginLeft:'10px'}}>Customer suggestions</p></div></div>
                        <div><Link><a><i class="fa fa-info-circle" aria-hidden="true"></i></a></Link></div>
                    </div>
                        </div>
                        <div style={{paddingRight:'110px'}}>  <div style={{width:'100%',backgroundColor:'#e0e0e0', marginLeft:'50px', marginTop:'-10px'}} className='underLine'></div></div>
                        <div className='br_body'>

                        <div className='chat_box'>
    {/* Iterate over data2 to display messages */}
    {feedback && feedback.length > 0 ? (
    feedback.map((d, i) => (
        <div className='ct_box' key={i}>
            <div className={d.sender === 'provider' ? 'containerma darker' : 'containerma'}>
                <p style={{ marginBottom: '0', fontSize: '12px', textAlign: d.sender === 'provider' ? 'right' : 'left' }}>
                    {d.sender === 'provider' ? ' You : ' : ' '}
                    {d.message}
                </p>
                <span style={{ fontSize: '10px' }} className={d.sender === 'provider' ? 'time-left' : 'time-right'}>
                    {d.timestamp}
                </span>
            </div>
        </div>
    ))
) : (
    <p>No feedback available</p>
)}

    <div style={{ position: 'relative' }}>
        <input onChange={(e) => setFeedBackData({ ...feedbackdata, feedback_mgs:  e.target.value })}  type="text" placeholder="Say something..." style={{ border: 'none', marginTop: '5px', paddingRight: '30px' }} />
        <Link onClick={handleInsertfb}><i style={{ position: 'absolute', top: '40%', fontSize: '12px', right: '20px', transform: 'translateY(-50%)' }} className="fa fa-paper-plane"></i></Link>
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
</div>
</div>

{/*  */}
<div className="ad_rs_popup">
        <div className="popup-content">
        <div className={`rs_p_cDa ${isPopupVisible ? 'show' : ''}`}>
        <div style={{display:'flex', justifyContent:'space-between', padding:'20px'}} className='btn_flex'>
            <button style={{opacity:'0'}}></button>
                <Link style={{ display: 'flex', justifyContent: 'flex-start', padding:'0px', alignItems: 'center' }}className='xxbox' onClick={togglePopup}>x</Link>
                
                </div>
                <form style={{marginTop:'-40px'}}>
                   <div style={{textAlign:'center', padding:'20px' ,color:'black',fontWeight:'bold'}} className='ad_h_modal-header'>
                    <p>Work Quotatin</p>
                    <div className='underline'></div>
                   </div>
                   <div className='Scroll_pop'>
                    <div className='fill_box'>
                    <div className='int_table'>
                        <div style={{padding:'0 10px',maxHeight:'350px',scrollbarWidth:'thin'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th style={{fontSize:'13px'}}>Description</th>
                                    <th style={{fontSize:'13px'}}>Payments</th>
                                    <th style={{fontSize:'13px'}}>Status</th>
                                  
                                   
                                  
                                </tr>
                            </thead>
                            <tbody>
                           {paymentdata
                           .map((d, i) => ( 
                            <tr key={i}>
                                    <td style={{fontSize:'11px',backgroundColor:'white'}}>{d.description}</td>
                                    <td style={{fontSize:'11px',backgroundColor:'white'}}> {d.cost}{" "}RS</td>
                                    <td style={{fontSize:'11px',backgroundColor:'white'}}>{d.status} </td>
                                
                                   
                                </tr>
                               )) 
                           }
                               <tr>
                                  <td colSpan="1" style={{textAlign: 'left', fontWeight: 'bold',fontSize:'13px'}}>Total:</td>
                                  <td style={{ fontSize: '11px', backgroundColor: 'white', fontWeight: 'bold', color: isNaN(totalCost) ? 'red' : 'inherit' }}>
                                 {isNaN(totalCost) ? 'Not estimated' : `${totalCost.toFixed(2)} RS`}
                                </td>

                                <td style={{ textAlign: 'right' ,backgroundColor:'white'}}>
                                <button className='pop_don_btn' style={{borderRadius:'5px',backgroundColor:'transparent', color:'green'}} onClick={(event) => handleAddQuotation(event)}>Add Quotation</button>
                            </td>
                        </tr>
                        
                        {showNewField && (
                            <tr>
                                <td style={{backgroundColor:'white'}}><input onChange={(e) => setPaymenteData({ ...paymentDatas, description:  e.target.value })}  style={{border:'none'}} placeholder="Description" /></td>
                                <td style={{backgroundColor:'white'}}><input onChange={(e) => setPaymenteData({ ...paymentDatas, cost:  e.target.value })}  style={{border:'none'}}  placeholder="Payments" /></td>
                                <td style={{backgroundColor:'white'}}><input onChange={(e) => setPaymenteData({ ...paymentDatas, status:  e.target.value })}  style={{border:'none'}} placeholder="Status" /></td>
                            </tr>
                        )}
                            </tbody>
                        </table>
                        
                    </div>
                        </div>
                    </div>

                    </div>
                    <div style={{textAlign:'center'}} > <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                   
                </form>
                <div style={{display:'flex', justifyContent:'space-between'}} className='btn_flex'>
                <button style={{opacity:'0'}}> .</button>
                <button onClick={handleInsertPay} className='pop_don_btn'>Add </button>
                </div>
    
            </div>
        
       

        </div>
    </div>
{/*  */}

</div>
  )
}

export default Mywork