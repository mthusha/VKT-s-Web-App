import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Table = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [originalDate, setOriginalDate] = useState(new Date()); 
    const [clickedRowData, setClickedRowData] = useState(null); 
    const [fail, setFail] = useState(false);
    const [failEmail, setFailEmail] = useState(false);
    const [defaultDate, setDefaultDate] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        address: '',
        role: 'Pros',
        phone: '',
        email:'',
        password:'',
      });
      const navigate = useNavigate(); 
///////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        try {
          
          const response = await fetch(`http://localhost:8081/servicerequestData`);
          const responseData = await response.json();
          
          if (Array.isArray(responseData)) {
            setData(responseData);
          }
         const response2 = await fetch(`http://localhost:8081/prosData`);
           const responseData2 = await response2.json();
           if (Array.isArray(responseData2)) {
             setData2(responseData2);
           }

           const response3 = await fetch(`http://localhost:8081/userData`);
           const responseData3 = await response3.json();
           if (Array.isArray(responseData3)) {
             setData3(responseData3);
           }

           else {
            console.error("Response data is not an array:", responseData);
          
          }
    
          
        } catch (err) {
          console.error(err);
        }
      };
      ///////////////////////////////////////////
      
      useEffect(() => {
        const date = clickedRowData?.date ? new Date(clickedRowData?.date) : new Date();
        const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        setDefaultDate(adjustedDate.toISOString().split('T')[0]);
    }, [clickedRowData]);
    
      const [isPopupVisible, setIsPopupVisible] = useState(false);
  // Define state variable for the date

  const handleDateChange = (event) => {
    setDefaultDate(event.target.value);
};


// other
      const togglePopup = () => {
          setIsPopupVisible(!isPopupVisible);
      };
      const handleRowClick = (rowData) => {
        setClickedRowData(rowData);
        togglePopup(); 
    };
    ////////////////////////Add pros //////////////////////////////
    const [isPopupVisible2, setIsPopupVisible2] = useState(false);

    
    const togglePopup2 = () => {
        setIsPopupVisible2(!isPopupVisible2);
    };
    

////////////////////////////   set work /////////////////////////////////////////
const [selectedProsIds, setSelectedProsIds] = useState("");

const handleCheckboxChange = (event, providerId) => {
    if (event.target.checked) {
        setSelectedProsIds([...selectedProsIds, providerId]);
    } else {
        setSelectedProsIds(selectedProsIds.filter(id => id !== providerId));
    }
};
if (clickedRowData){
    console.log(clickedRowData.requst_id)
console.log(selectedProsIds)
}


const handleSetWork = async () => {
    if (clickedRowData) {
        try {
          
            const response = await fetch(`http://localhost:8081/add_requir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service_id: clickedRowData.service_id,
                    user_id: clickedRowData.user_id,
                    provider_id:selectedProsIds,
                    request_id: clickedRowData.requst_id,
                    start_time: defaultDate,
                    end_time: defaultDate,
                    status: "Pending",
                  
                })
            });
            const responseData = await response.json();
            console.log('Work set successfully:', responseData);
            if (response.ok) {
               
                togglePopup();
                alert('Work set successfully');
            } else {
                console.error('Error setting work:', responseData.error);
            }
           
        } catch (error) {
            console.error('Error setting work:', error);
        }
    } else {
        console.error('Clicked row data or selected provider ID is null');
    }
};
/////////////////// add pros /////////////////////////
const handleInsertPros = async (e) => {
    if(formData.first_name===''||formData.email===''||formData.last_name===''||formData.password===''||formData.phone===''){
      setFail(true);
      setTimeout(() => {
          setFail(false); 
      }, 3000);
      return;
    }else{
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8081/prosadd", formData);
    
        if (response.data.message === 'Record inserted successfully') {
            togglePopup2();


          setFormData({
            id: '',
        first_name: '',
        last_name: '',
        address: '',
        role: 'Pros',
        phone: '',
        email:'',
        password:'',
          });
        
        } else if(response.data.message === 'Email already exists.')  {
          setFailEmail(true);     
          setTimeout(() => {
          setFailEmail(false);
          }, 3000);
          console.log(response.data.message);

        }
      } catch (err) {
        console.log(err);
      
      }
    }
    };

/////////////////////////////////////////////////////
// delete requst
const deleteFeedback = async (id) => {
    try {
    
      const modal = document.getElementById('confirmationModal');
      modal.style.display = 'block';
      
     
      document.getElementById('confirmBtn').onclick = async () => {
        const response = await fetch(`http://localhost:8081/requst_d/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log(data.message);
          togglePopup();
        
        } else {
          console.error('Error:', data.error);
          
        }
        modal.style.display = 'none';
      };
      
      document.getElementById('cancelBtn').onclick = () => {
        modal.style.display = 'none'; 
      };
    } catch (error) {
      console.error('Error:', error);
    }
  };
// delete user
const userDelete = async (id) => {
    try {
    
      const modal = document.getElementById('confirmationModal');
      modal.style.display = 'block';
      
     
      document.getElementById('confirmBtn').onclick = async () => {
        const response = await fetch(`http://localhost:8081/user_d/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log(data.message);
        
        } else {
          console.error('Error:', data.error);
          
        }
        modal.style.display = 'none';
      };
      
      document.getElementById('cancelBtn').onclick = () => {
        modal.style.display = 'none'; 
      };
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
<div className='ad_table'>
    <div className='containerm'>
        <div style={{display:'flex',justifyContent:'space-between' ,maxWidth:'98%'}} className='ta_title'>
            <div className='ta_ti_in'>
                <p style={{fontWeight:'bold',color:'black'}}>Basic  Information</p>
            </div>
            <div className='ta_ti_in'>
                <a style={{color:'blue', fontSize:'15px'}} href="#">Table /<span style={{color:'black'}}>  Basictables</span></a>
            </div>
        </div>
        <div className='ad_row'>
                <div className='on_user'>
                    <div className='on_p_title'>
                        <div className='on_p'>
                            <p style={{fontWeight:'bold'}}>Registered Users</p>
                            <p style={{marginTop:'-20px'}}>All</p>
                        </div>
                        <div className='on_p'>
                            <p></p>
                        </div>
                    </div>
                    <div  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>User status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data3 
                            .filter(d => d.role === 'User')
                            .map((d, i) => (
                                <tr key={i}>
                                    <td style={{fontSize:'12px'}}># {d.id}</td>
                                    <td style={{fontSize:'12px'}}>{d.name}{"  "}{d.last_name}</td>
                                    <td style={{fontSize:'12px'}}>{d.email}</td>
                                    <td style={{fontSize:'12px'}}>{d.phone}</td>
                                    <td style={{fontSize:'12px'}}></td>
                                    <td style={{fontSize:'12px'}}><Link onClick={() => userDelete(d.id)} ><i class="fa fa-bars" aria-hidden="true"></i></Link></td>
                                </tr>
                                ))
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{marginLeft:'20px'}} className='on_user'>
                    <div className='on_p_title'>
                        <div className='on_p'>
                            <p style={{fontWeight:'bold'}}>Service Pros</p>
                            <p style={{marginTop:'-20px'}}>All</p>
                        </div>
                        <div className='on_p'>
                           <Link><a onClick={() => togglePopup2()} ><p style={{color:'green'}}>+ Add Pros</p></a> </Link>
                        </div>
                    </div>
                    <div  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data2 
                            .map((d, i) => (
                                <tr key={i}>
                                    <td style={{fontSize:'12px'}}># {d.provider_id}</td>
                                    <td style={{fontSize:'12px'}}>{d.firsr_name}{" "}{d.last_name}</td>
                                    <td style={{fontSize:'12px'}}>{d.email}</td>
                                    <td style={{fontSize:'12px'}}>{d.phone}</td>
                                    <td style={{ fontSize: '12px', color: d.status === 'Available' ? 'green' : 'red' }}>{d.status}</td>
                                    <td style={{fontSize:'12px'}}><Link><i class="fa fa-bars" aria-hidden="true"></i></Link></td>
                                </tr>
                                ))
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                <div className='ad_row'>
                <div className='on_service_r'>
                    <div className='on_p_title'>
                        <div className='on_p'>
                            <p style={{fontWeight:'bold'}}>Requested service</p>
                            <p style={{marginTop:'-20px'}}>All</p>
                        </div>
                        <div className='on_p'>
                            <p style={{color:"red"}}>Reject all</p>
                        </div>
                    </div>
                    <div style={{maxHeight:'500px'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>User id</th>
                                    <th>Service Name</th>
                                    <th>Type</th>
                                    <th>Needed item</th>
                                    <th>Wall Cutting</th>
                                    <th>Lader size</th>
                                    <th>Purchasing item</th>
                                    <th>Somthing</th>
                                    <th>Time & Date</th>
                                    <th>Requested Date</th>
                                    <th>Address</th>
                                    <th>T.P Number</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {data 
                            .filter(d => d.status !== '0')
                            .map((d, i) => (
                                <tr key={i}>
                                    <td style={{fontSize:'12px'}}># {d.requst_id}</td>
                                    <td style={{fontSize:'12px'}}># {d.user_id}</td>
                                    <td style={{fontSize:'12px'}}>{d.service_name}</td>
                                    <td style={{fontSize:'12px'}}>{d.type_of_service}</td>
                                    <td style={{fontSize:'12px'}}>{d.need_item}{"  "}{d.need_item_count}</td>
                                    <td style={{fontSize:'12px'}}>{d.cut_wall_st}</td>
                                    <td style={{fontSize:'12px'}}>{d.ladder_height}</td>
                                    <td style={{fontSize:'12px'}}>{d.purchasing_item_st}</td>
                                    <td style={{fontSize:'12px'}}>{d.anything}</td>
                                    <td style={{fontSize:'12px'}}>{d.time}{" "}{new Date(d.date).toLocaleDateString()}</td>
                                    <td style={{fontSize:'12px'}}>{new Date(d.curren_date).toLocaleDateString()}</td>
                                    <td style={{fontSize:'12px'}}>{d.email}</td>
                                    <td style={{fontSize:'12px'}}>{d.phone}</td>
                                    <td><Link><a onClick={() => handleRowClick(d)}><i className="fa fa-bars" aria-hidden="true"></i></a></Link></td>
                                </tr>
                                ))
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        
    </div>
  
    <div className="ad_rs_popup">
        <div className="popup-content">
     {/* pop up add pros */}
     <div className={`pop_mt ${isPopupVisible2 ? 'show' : ''}`}>
     <div style={{display:'flex', justifyContent:'space-between', padding:'20px'}} className='btn_flex'>
            <button style={{opacity:'0'}}></button>
                <Link style={{ display: 'flex', justifyContent: 'flex-start', padding:'0px', alignItems: 'center' }}className='xxbox' onClick={togglePopup2}>x</Link>
                
                </div>
                <form style={{marginTop:'-40px'}}>
                   <div style={{textAlign:'center', padding:'20px' ,color:'black',fontWeight:'bold'}} className='ad_h_modal-header'>
                    <p>Add Pros</p>
                    <div className='underline'></div>
                   </div>
                  <div style={{ marginLeft:'100px',marginTop:'-8px',maxHeight:'640px', padding:'0 80px 0 80px'}} className='ST_container'>
                    <div className='pros_field'>
                        <label>First Name</label>
                        <input type='text'
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                         style ={{
                          borderColor: fail && !formData.first_name ? 'red' : '',
                          
                                  }} ></input>
                    </div>
                    <div className='pros_field'>
                        <label>Last Name</label>
                        <input type='text'
                         value={formData.last_name}
                         onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                         style ={{
                          borderColor: fail && !formData.last_name ? 'red' : '',
                          
                                  }}
                        ></input>
                    </div>
                    <div className='pros_field'>
                        <label>Address</label>
                        <input type='text' 
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          style ={{
                           borderColor: fail && !formData.address ? 'red' : '',
                           
                                   }}
                        ></input>
                    </div>
                    <div className='pros_field'>
                        <label>Phone Number:</label>
                        <input placeholder=' (xxx) xxx-xxxx' type='text' id='phone' name='phone' maxLength='14' required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style ={{
                           borderColor: fail && !formData.phone ? 'red' : '',
                           
                                   }}
                        ></input>
                    </div>
                    <div className='pros_field'>
                        <label>Email</label>
                        <input type='email'
                         value={failEmail ? 'Email already exists' :formData.email}
                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                         style ={{
                          borderColor: fail && !formData.email ? 'red' : '',
                          color: failEmail ? "red" : ""
                                  }}
                        ></input>
                    </div>
                    <div className='pros_field'>
                        <label>Password</label>
                        <input type='text' 
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          style ={{
                           borderColor: fail && !formData.password ? 'red' : '',
                           
                                   }}
                        ></input>
                    </div>
                  </div>
                </form>
                <div style={{display:'flex', justifyContent:'space-between'}} className='btn_flex'>
                <button className='pop_btn'style={{opacity:'0'}}>.</button>       
               <button className='pop_don_btn'  onClick={handleInsertPros} >Add</button>
         </div>
     </div>
     {/* for accept rq */}
            <div className={`rs_p_c ${isPopupVisible ? 'show' : ''}`}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'20px'}} className='btn_flex'>
            <button style={{opacity:'0'}}></button>
                <Link style={{ display: 'flex', justifyContent: 'flex-start', padding:'0px', alignItems: 'center' }}className='xxbox' onClick={togglePopup}>x</Link>
                
                </div>
                <form style={{marginTop:'-40px'}}>
                   <div style={{textAlign:'center', padding:'20px' ,color:'black',fontWeight:'bold'}} className='ad_h_modal-header'>
                    <p>Service Response</p>
                    <div className='underline'></div>
                   </div>
                   <div className='Scroll_pop'>
                   <div className='rs_d_tm'>
                    <div style={{display:'flex' , justifyContent:'space-between',height:'320px'}} className='rs_d_flex'>
                        <div  className='rs_date'>
                            <label>Service name</label><br/><br/>
                            <label>Type</label><br/><br/>
                            <label>Needed items</label><br/><br/>
                            <label>Date & Time</label><br/><br/>
                            <label>Available date</label><br/><br/>
                            <label>Address</label>
                        </div>
                        <div style={{maxWidth:'190px'}} className='rs_data'>
                        <label>{clickedRowData?.service_name}</label><br/><br/>
                        <label>{clickedRowData?.type_of_service}</label><br/><br/>
                        <label>{clickedRowData?.need_item}{" "}{clickedRowData?.need_item_count}</label><br/><br/>
                        <label>{clickedRowData?.time}{" / "}{new Date(clickedRowData?.date).toLocaleDateString()}</label><br/><br/>
                        <input className='ad_date' type='date' value={defaultDate} onChange={handleDateChange} ></input><br/><br/>
                        <label>{clickedRowData?.email}</label>
                        <label style={{display:'none'}}>{clickedRowData?.request_id}</label>
                        </div>
                    </div>
                   </div>
                   <div className='rs_pros'>
                        <p style={{marginBottom:'0'}}>Available Pros</p>
                        <div style={{padding:'0 10px'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Add</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                            {data2 
                            .filter(d => d.status === 'Available')
                            .map((d, i) => (
                                <tr key={i}>
                                    <td><input type='checkbox' onChange={(e) => handleCheckboxChange(e, d.provider_id)} /></td>
                                    <td style={{fontSize:'12px'}}>{d.firsr_name}{" "}{d.last_name}</td>
                                    <td style={{fontSize:'12px'}}>{d.email}</td>
                                    <td style={{fontSize:'12px'}}>{d.phone}</td>
                                    <td style={{ fontSize: '12px', color: d.status === 'Available' ? 'green' : 'red' }}>{d.status}</td>
                                    
                                </tr>
                                ))
                              }
                            </tbody>
                        </table>
                    </div>
                    </div>
                    </div>
                    <div style={{textAlign:'center'}} > <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                   
                </form>
                <div style={{display:'flex', justifyContent:'space-between'}} className='btn_flex'>
                <button onClick={() => clickedRowData && deleteFeedback(clickedRowData?.requst_id)} className='pop_btn'>Reject</button>
                <button className='pop_don_btn' onClick={handleSetWork}>Set work</button>
                </div>
    
            </div>
        
       

        </div>
    </div>
    <div id="confirmationModal" class="modal">
  <div class="modal-content">
    <p style={{fontWeight:'bold'}}>Are you sure you want to Reject this request?</p>
    <div class="button-container">
      <button id="confirmBtn">Confirm</button>
      <button id="cancelBtn">Cancel</button>
    </div>
  </div>
</div>
</div>    
  )
}

export default Table