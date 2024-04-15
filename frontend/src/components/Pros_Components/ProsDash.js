import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const ProsDash = () => {
const [data, setData] = useState([]);
const [email, setEmail]=useState("");
const [responseData, setResponseData] = useState([]);
const [userId, setUserId] = useState('');
const [id, setId] = useState('');
// pop up fix now form
const [isPopupVisible, setIsPopupVisible] = useState(false);
const togglePopup = () => {
  setIsPopupVisible(!isPopupVisible);
};
//date
const [date, setDate] = useState('');
const [clickedRowData, setClickedRowData] = useState(null); 
const handleRowClick = (rowData) => {
setClickedRowData(rowData);
togglePopup(); 
};




// get Workser id
useEffect(() => {
  axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === "Success") {
        setEmail(res.data.email);

        axios.get(`http://localhost:8081/prosData/${res.data.email}`)
          .then(userDataRes => {
           
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
    const response = await fetch(`http://localhost:8081/userdata_p/${userId}`);
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
// set service details
useEffect(() => {
  handleSetDetails();
}, [clickedRowData]);
useEffect(() => {
  if (clickedRowData) {
    console.log('Clicked Row Data:', clickedRowData);
    setId(clickedRowData.status_id);
    console.log('ID:', clickedRowData.status_id);
  }
}, [clickedRowData]);

const handleSetDetails = async () => {
  if (clickedRowData) {
      try {
        
        const response = await fetch(`http://localhost:8081/servicerequestData/${clickedRowData.requst_id}`);
        const responseData = await response.json();
        
      
          setData(responseData);
        
         
      } catch (error) {
          console.error('Error fetch data:', error);
      }
  } else {
      console.error('Clicked row data or selected requat ID is null');
  }
};

// put ets.close date
const handleUpdate = async () => {
  try {
    if (!id) {
      console.error('ID is not set');
      return;
    }
    const response = await fetch(`http://localhost:8081/est_date/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date })
      
    });
    togglePopup();
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error updating record:', error);
  }
};

  return (
    <div className='pr_mywork'>
        
    <div className='p_mywork_in-box'>
        <div className='pr_first_row'>
        <div className='ad_row'>
                <div className='on_service_r'>
                    <div className='on_p_title'>
                        <div className='on_p'>
                            <p style={{fontWeight:'bold'}}>Requested service</p>
                            <p style={{marginTop:'-20px'}}>All</p>
                        </div>
                        <div className='on_p'>
                            <p style={{color:"red"}}></p>
                        </div>
                    </div>
                    <div style={{maxHeight:'500px'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Location</th>
                                    <th>Service</th>
                                    <th>Start date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {responseData
                           .filter(d => d.chk === 0)
                           .map((d, i) => {
       
                               const currentDate = new Date();
                               const startDate = new Date(d.start_time);
                               const remainingDays = Math.floor((startDate - currentDate) / (1000 * 60 * 60 * 24));
                                let dateColor = 'green';
                               if (remainingDays < 2) {
                                dateColor = 'red';
                            } else if (remainingDays < 4) {
                          dateColor = 'orange';
                          }

                          return (
                                <tr key={i}>
                                    <td style={{ fontSize: '12px' }}># {d.requst_id}</td>
                                    <td style={{ fontSize: '12px' }}>{d.name} {d.last_name}</td>
                                    <td style={{ fontSize: '12px' }}>{d.phone}</td>
                                    <td style={{ fontSize: '12px' }}>{d.email}</td>
                                    <td style={{ fontSize: '12px' }}>{d.description}</td>
                                    <td style={{fontWeight:'bold', fontSize: '12px', color: dateColor }}>{new Date(d.start_time).toLocaleDateString()}</td>
                                    <td><Link><a onClick={() => handleRowClick(d)} style={{ fontSize: '13px', fontFamily: 'math', color: 'green', fontWeight:'bold' }}>Fix Now</a></Link></td>
                                </tr>
                               );
                               })
                          }

                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
            
            
            </div>
        </div>

        <div className="ad_rs_popup">
        <div className="popup-content">

        <div className={`rs_p_cDa ${isPopupVisible ? 'show' : ''}`}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'20px'}} className='btn_flex'>
            <button style={{opacity:'0'}}></button>
                <Link style={{ display: 'flex', justifyContent: 'flex-start', padding:'0px', alignItems: 'center' }}className='xxbox' onClick={togglePopup}>x</Link>
                
                </div>
                <form style={{marginTop:'-40px'}}>
                   <div style={{textAlign:'center', padding:'20px' ,color:'black',fontWeight:'bold'}} className='ad_h_modal-header'>
                    <p>Service details</p>
                    <div className='underline'></div>
                   </div>
                   <div className='Scroll_pop'>
                 <div className='detail_table'>
                 <div style={{padding:'0 10px'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Request</td>
                                    <td style={{fontSize:'12px'}}># </td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Customer</td>
                                    <td style={{fontSize:'12px'}}>{clickedRowData?.name}{" "}{clickedRowData?.last_name}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Service Title</td>
                                    <td style={{fontSize:'12px'}}>{data.service_name}{" "}{clickedRowData?.description}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Type</td>
                                    <td style={{fontSize:'12px'}}>{data.type_of_service}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Start Date</td>
                                    <td style={{fontSize:'12px'}}>{clickedRowData?.start_time}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Needed Items</td>
                                    <td style={{fontSize:'12px'}}>{data.need_item}{" "}{data.need_item_count}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Wall Cutting</td>
                                    <td style={{fontSize:'12px'}}>{data.cut_wall_st}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Lader Size {"(If needded)"} </td>
                                    <td style={{fontSize:'12px'}}>{data.ladder_height}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Purchasing Item</td>
                                    <td style={{fontSize:'12px'}}>{data.purchasing_item_st}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>Location</td>
                                    <td style={{fontSize:'12px'}}>{data.email}</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                 </div>
            
                    </div>
                    <div style={{textAlign:'center',marginTop:'-18px'}} > <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                    <div className='set_wor_cal'>
                      <div className='sw_in_box'>
                        <div className='date_pick'>
                          <div>
                          <p style={{margin:'0'}}>Ets.Close Date</p>
                          </div>
                          <div className='etsclose-date'>
                          <input  value={date}  onChange={(e) => setDate(e.target.value)} type='datetime-local' ></input>
                          </div>
                     
                        </div>
                        <div className='pre_work'>

                        </div>
                       
                        
                      </div>
                    </div>
                </form>
                <div  className='btn_flexad'>
                  <div>  
                 
                    </div>
                  <div>  <button onClick={handleUpdate} className='pop_don_btn' >Fix Time</button></div>
                </div>
    
            </div>


          </div>
          </div>


   </div>         
  )
}

export default ProsDash