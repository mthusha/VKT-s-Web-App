import React, { useEffect, useState } from 'react'
import { useLocation , useNavigate} from "react-router-dom";
import axios from 'axios';
import {Link} from "react-router-dom"
import logo from './assets/vtkL2.png'
import projectImage from './assets/elect.jpg'
import plumbing from './assets/back11.jpg'
import cons from './assets/cons.png'
import roof from './assets/roof.jpg'
import paint from './assets/back12.jpg'
import Footer from './ProfileFooter.js';

const UserAccount = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    const [showAll, setShowAll] = useState(false);
    const [showAll2, setShowAll2] = useState(false);
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState([]);
    const [id, setid] = useState(localStorage.getItem('userId') || '');
    const [phone, setPhone] = useState([]);
    const [LastName, setLast] = useState([]);
    const [title, settile] = useState([]);
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false); 
    const [successp, setSuccessp] = useState(false); 
    const [fail, setfail] = useState(false); 
    const [faild, setfaild] = useState(false); 
    const [chk, setChk] = useState(false); 
    const [chkpass, setChkpass]=useState("");

    const [passData, setpassData] = useState({
        newPass: '',
        conPass: ''
       });

   var alert;
   /////////////////////////
   const [data, setData] = useState([]);
   const [data2, setData2] = useState([]);

   useEffect(() => {
     fetchData();
     return () => {
     
      localStorage.removeItem('userId');
    };
   }, []);
   
   const fetchData = async () => {
    try {
      
      const response = await fetch(`http://localhost:8081/servicebox/${id}`);
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        setData(responseData);
      }
      const response2 = await fetch(`http://localhost:8081/waiting/${id}`);
      const responseData2 = await response2.json();
      if (Array.isArray(responseData2)) {
        setData2(responseData2);
      }
       else {
        console.error("Response data is not an array:", responseData);
      
      }

      
    } catch (err) {
      console.error(err);
    }
  };
  

   /////////////////////
    const [message, setMassage]=useState('');

    axios.defaults.withCredentials= true;
    useEffect(() => {
      axios.get('http://localhost:8081')
        .then(res => {
          if (res.data.Status === "Success") {
            setAuth(true);
            setEmail(res.data.email);
  
            axios.get(`http://localhost:8081/userData/${res.data.email}`)
            .then(userDataRes => {
              setName(userDataRes.data.name); 
              setLast(userDataRes.data.last_name);
              setPhone(userDataRes.data.phone);
             setPassword(userDataRes.data.password);
             var tm =userDataRes.data.id;
             setid(tm)
             localStorage.setItem('userId', tm); 
              const na = userDataRes.data.name;
              settile(na)

            })
  
            .catch(userDataErr => {
              console.error('Error fetching user data:', userDataErr);
            });
          
          
          }else{
            setAuth(false)
            setMassage(res.data.message)
            navigate('/login');
  
          }
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }, []);


    const handleUpdate = async (email) => {
        if (name ===''||phone===''||LastName===''){  setfaild(true); setTimeout(() => {setfaild(false); }, 3000);}
        else{
        try {
          const response = await fetch(`http://localhost:8081/updateuser/${email}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, last_name: LastName, phone }),
          });
          const data = await response.json();
          console.log(data.message);
          setSuccess(true); 
        setTimeout(() => {
            setSuccess(false); 
            setTimeout(() => {
                window.location.reload();
            });
        }, 3000);
        } catch (err) {
          console.log(err);
        }}
      };
      
      const handlePassword = async (email) => {
        if (passData.newPass !== passData.conPass || passData.newPass === ''&& passData.conPass === passData.newPass) {
          setfail(true); 
          setTimeout(() => {
            setfail(false); 
          }, 3000);
        } else {
          if (chkpass !== password) {
            setChk(true); 
            setTimeout(() => {
              setChk(false); 
            }, 3000);
          } else {
            try {
              const response = await fetch(`http://localhost:8081/updatepassword/${email}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({newPass: passData.newPass}),
              });
              const data = await response.json();
              console.log(data.message);
              setSuccessp(true); 
              setTimeout(() => {
                setSuccessp(false); 
              }, 1000);
            } catch (err) {
              console.log(err);
            }
          }
        } 
      };
      
      const handleSaveClick = () => {
        handlePassword(email); 
      };      

      /////////////////////////////
      const isValidDate = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      };
      const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

      const handleServiceClick = (index) => {
        if (selectedServiceIndex === index) {
         
          setSelectedServiceIndex(null);
        } else {
         
          setSelectedServiceIndex(index);
        }
      };
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
    
    <div>
  <div style={{ display: 'flex', justifyContent: 'space-between'}} className="">
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


        <div style={{marginTop:'60px'}} className='useracc'>
        <div className='container'>
        <div className='row_ac'>
            <div style={{}} className='col_box1'>
              <div  className='in_box1'>
              <h1 style={{}}>Welcome Back,<br/><span style={{color:'#70bef3'}}>{title}</span></h1>

              </div>
            </div>
                <div style={{marginTop:'-24px'}} className='col_box2'>
                    <div className='in_box2'>
                        <div className='in_contain'>
                        <div className='search_box_u'>
                          <div className="search-wrapper">
                            <input className='' type='text' placeholder='Search for activities...' value={searchTerm} onChange={handleSearchChange} />
                            <button><i className="fas fa-search"></i></button>
                         </div>
                       </div>
                       <div style={{marginTop:'-15px'}} className='serviceBox_ua'>
                            <h4 style={{color:'#bbbbbb', fontSize:'15px'}}> Your Recent Project</h4>
                            <p style={{marginTop:'-10px' ,color:'#b3b3b3'}}>Thank For Your Support and Trust</p>
                            <div className='ser_meadia'>
                              <div className='media_h'>
                                <h4>
                                  Waiting List
                                </h4>
                              </div>
                            {data2
                           .filter((d) => d.status !== '0')
                           .map((d, i) => (
                            (i < 4 || showAll2) && (
                           <div key={i} className='service_boxFlex'>
                             <div style={{display:'flex', borderRadius:'10px'}} className='serviceBox_in'>
                             <div className='phto_box'>
                                <img src={d.service_name === 'Plumbing' ? plumbing: d.service_name === 'Roofing' ? roof: d.service_name === 'Electrical' ? projectImage : d.service_name === 'Construction' ? cons: d.service_name === 'Painting' ? paint: projectImage} alt="" style={{borderRadius:'10px 0 0 10px'}} />
                            </div>
                              <div style={{marginLeft:'20px', color:'black', fontWeight:'bold'}} className='info_box'>
                                <a style={{color:'#70bef3'}} href="#">{d.service_name}</a>
                                <p style={{marginTop:'5px', fontSize:'14px'}}>
                              {isValidDate(d.start_time) ? new Date(d.start_time).toLocaleDateString() :'Request id #' +d.requst_id}
                              <span style={{color:'green', marginLeft:'10px'}}>
                              {isValidDate(d.end_time) ? new Date(d.end_time).toLocaleDateString() : ""}
                            </span>
                             </p>
                             <p style={{ fontSize: '14px' }}>
                              {d.status ? d.status : "Waiting"}
                             <Link onClick={() => deleteFeedback(d.requst_id)}>
                               <i style={{ marginLeft: '120px', color: 'red' }} className="fa fa-trash" aria-hidden="true"></i>
                             </Link>
                             </p>

                           </div>                                   
                            </div>
                           
                            </div>
                             )
                             ))
                             }




                              {/* {data2.length > 3 && !showAll2 ? (
                                <div className='expand_b' style={{ alignSelf: 'flex-end', marginLeft: 'auto', marginRight: '20px', marginBottom: '10px', marginTop: '20px' }}>
                                <button onClick={() => setShowAll2(true)}>Show all<i className="fa fa-sort-desc" aria-hidden="true"></i></button>
                               </div>
                                 ) : ''}


                                     {!showAll2 && <div style={{ marginTop: '50px' }}></div>} */}
                               <div className='media_h'>
                                <h4>
                                Accepted List
                                </h4>
                              </div>
                              {data.map((d, i) => (
              
                              (i < 3 || showAll) && (
                              
                       <div key={i} className='service_boxFlex'>
                        <div className='ser_flex'>
                          <div style={{display:'flex' ,  borderRadius:'10px'}} className='serviceBox_in'>
                            <div className='phto_box'>
                                <img src={d.service_name === 'Plumbing' ? plumbing: d.service_name === 'Roofing' ? roof: d.service_name === 'Electrical' ? projectImage : d.service_name === 'Construction' ? cons: d.service_name === 'Painting' ? paint: projectImage} alt="" style={{borderRadius:'10px 0 0 10px'}} />
                            </div>
                             <div style={{ marginLeft:'20px', color:'black',fontWeight:'bold'}} className='info_box'>
                                        <a style={{color:'#70bef3'}} href="#">{d.service_name}</a>
                                        <p style={{marginTop:'5px', fontSize:'14px'}}>{new Date(d.start_time).toLocaleDateString()} <bt/><span  style={{color:'green', marginLeft:'10px'}}>{new Date(d.end_time).toLocaleDateString()}</span></p>
                                        <p style={{ fontSize:'14px'}}> {d.status ? d.status : "Waiting"}<Link  onClick={() => handleServiceClick(i)}><i style={{marginLeft:'120px', color:'#70bef3'}} class="fa fa-angle-down" aria-hidden="true"></i></Link></p>                                
                            </div>                                   
                          </div>
                          <div className={`blank-service-box ${selectedServiceIndex === i ? 'open' : ''}`}>
                            <div className='bla_shadow_box' style={{padding:'10px'}}>
                              <h6 style={{fontSize:'12px', marginTop:'5px'}}>More details</h6>
                              <div>
                                <div style={{display:'flex',justifyContent:'space-between',marginTop:'5px', maxWidth:'270px'}}>
                                  <label>
                                    Request id:
                                  </label>
                                  <label>
                                   {'#'+d.requst_id}
                                  </label>
                                </div>
                                <div style={{display:'flex',justifyContent:'space-between',marginTop:'5px', maxWidth:'310px'}}>
                                  <label>
                                    Provider Name
                                  </label>
                                  <label>
                                   {d.provider_firsr_name}{ " "}{d.provider_last_name}
                                  </label>
                                </div>
                                <div style={{display:'flex',justifyContent:'space-between',marginTop:'5px', maxWidth:'325px'}}>
                                  <label>
                                    Provider Contact
                                  </label>
                                  <label>
                                   {d.provider_email}
                                  </label>
                                </div>
                                <div className='btn_near_rate' style={{display:'flex',marginTop:'10px',justifyContent:'space-between', maxWidth:'325px'}}>
                                <div class="rate">
                                     <input type="radio" id="star5" name="rate" value="5" />
                                     <label style={{fontSize:'25px'}} for="star5" title="text">5 stars</label>
                                     <input type="radio" id="star4" name="rate" value="4" />
                                     <label style={{fontSize:'25px'}}  for="star4" title="text">4 stars</label>
                                     <input  type="radio" id="star3" name="rate" value="3" />
                                     <label style={{fontSize:'25px'}}  for="star3" title="text">3 stars</label>
                                     <input type="radio" id="star2" name="rate" value="2" />
                                     <label style={{fontSize:'25px'}} for="star2" title="text">2 stars</label>
                                     <input type="radio" id="star1" name="rate" value="1" />
                                     <label style={{fontSize:'25px'}} for="star1" title="text">1 star</label>
                                   </div>
                                  

                                  <Link  to={{
                                    pathname: '/project_details',
                                     search:  `?requestId=${d.requst_id}`
                                    }}><button style={{marginTop:'10px'}}>
                                    view
                                  </button></Link>
                                
                                
                                </div>
                                
                              </div>


                            </div>
                           
                           </div>
                             
                              </div>
                     </div>
                              )
                              ))}
                     </div>


                                    {data.length > 3 && !showAll && (
                <div className='expand_b' style={{ alignSelf: 'flex-end', marginLeft: 'auto', marginRight: '20px', marginBottom: '10px', marginTop: '20px' }}>
                    <button onClick={() => setShowAll(true)}>Show all<i class="fa fa-sort-desc" aria-hidden="true"></i></button>
                </div>
                                    )}
                                     {!showAll && <div style={{ marginTop: '50px' }}></div>}
                                    
                       </div>  
                     </div>


                     <div className='in_contain2'>
                       

                            <div style={{ boxShadow:'0px 2px 7px rgba(0, 0, 0, 0.1)' ,borderRadius:'8px',backgroundColor:'white'}} className='personal_box'>
                                <h4 style={{padding:'12px'}}> Personal Information<br/><span style={{fontWeight:'normal', fontSize:'13px'}}>{email}</span></h4>
                           
                            <div style={{display:'flex', marginLeft:'12px',marginRight:'12px', marginTop:'25px'}} className='name_box'>
                            <div className="lab-wrapper">
                            <input style={{ borderColor: faild && !name ? 'red':''}} className='' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='First Name..'  />
                            </div>
                            <div className="lab-wrapper">
                            <input style={{marginLeft:'10px',borderColor: faild && !LastName ? 'red':''}} value={LastName}  onChange={(e) => setLast(e.target.value)} className='' type='text' placeholder='Last Name..'  />
                            </div>
                            </div>
                            <div style={{marginTop:'10px'}} className="lab2-wrapper">
                            <input style={{borderColor: faild && !phone ? 'red':''}} className='' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number..'  />
                            </div>
                            <div style={{padding:'10px', display:'flex'}} className='btn_box_ma'>
                            {success && (
                                  <div className='success_label'>
                                   <label style={{ color: '#00ad00',position:'absolute',fontSize:'13px' }}>Update Successful</label>
                                  </div>
                                 )}
                                 {faild && (
                                  <div className='success_label'>
                                   <label style={{ color: 'red',position:'absolute',fontSize:'13px' }}>Enter valid info</label>
                                  </div>
                                 )}
                               <div>
                               <button  onClick={() => handleUpdate(email)} className=''>Save</button>
                               </div>
                               
                            </div>
                            </div>
                       

                            <div style={{marginTop:'90px'}}></div>
                        
                        

                            <div style={{ boxShadow:'0px 2px 7px rgba(0, 0, 0, 0.1)' ,borderRadius:'8px'}} className='personal_box'>
                                <h4 style={{padding:'12px'}}> Change Password<br/><Link><span style={{fontWeight:'normal', fontSize:'13px ', color:'#71d1ff'}}>Forgot password?</span></Link></h4>
                                <div style={{marginTop:'10px'}} className="lab2-wrapper">
                            <input style={{}} className=''  type='text' placeholder='Current Password' onChange={(e) => setChkpass(e.target.value)}  />
                            </div>
                            <div style={{display:'flex', marginLeft:'12px',marginRight:'12px', marginTop:'25px'}} className='name_box'>
                            <div className="lab-wrapper">
                            <input style={{borderColor: fail && !passData.newPass ? 'red':''}} className='' type='text' onChange={(e) => setpassData({ ...passData, newPass: e.target.value })} placeholder='New Password'/>
                            </div>
                            <div className="lab-wrapper">
                            <input style={{marginLeft:'10px' ,borderColor: fail && !passData.conPass ? 'red':''}} className='' onChange={(e) => setpassData({ ...passData, conPass: e.target.value })}  type='text' placeholder='Confirm Password'  />
                            </div>
                            </div>
                            
                            <div style={{padding:'10px', display:'flex'}} className='btn_box_ma'>
                            {successp && (
                                  <div className='success_label'>
                                   <label style={{ color: '#00ad00',position:'absolute',fontSize:'13px' }}>Update Successfully</label>
                                  </div>
                                 )}
                                  {chk && (
                                  <div className='success_label'>
                                   <label style={{ color: 'red',position:'absolute',fontSize:'13px' }}>Current Password not match</label>
                                  </div>
                                 )}
                             {fail && (
                                  <div className='success_label'>
                                   <label style={{ color: 'red',position:'absolute',fontSize:'13px' }}>Password Not match</label>
                                  </div>
                                 )}
                               <div>
                               <button   onClick={handleSaveClick}  className=''>Save</button>
                               </div>
                               
                            </div>
                            </div>
                       
                        <div style={{marginTop:'90px'}}></div>
                      

                            <div style={{ boxShadow:'0px 2px 7px rgba(0, 0, 0, 0.1)' ,borderRadius:'8px'}} className='personal_box'>
                                <h4 style={{padding:'12px'}}> Primary Address</h4>
                                <div style={{marginTop:'10px'}} className="lab2-wrapper">
                            <input style={{}} className='' type='text' placeholder='Street Address'  />
                            </div>
                            <div style={{display:'flex', marginLeft:'12px',marginRight:'12px', marginTop:'25px'}} className='name_box'>
                            <div className="lab-wrapper">
                            <input className='' type='text' placeholder='City'/>
                            </div>
                            <div className="lab-wrapper">
                            <input style={{marginLeft:'10px'}} className='' type='text' placeholder='ZIP'  />
                            </div>
                            </div>
                            <div style={{padding:'10px', display:'flex'}} className='btn_box_ma'>
                            {/* {success && (
                                  <div className='success_label'>
                                   <label style={{ color: '#00ad00',position:'absolute',fontSize:'13px' }}>Update Successfully</label>
                                  </div>
                                 )}
                             {fail && (
                                  <div className='success_label'>
                                   <label style={{ color: 'red',position:'absolute',fontSize:'13px' }}>Password does not match</label>
                                  </div>
                                 )} */}
                               <div>
                               <button   className=''>Save</button>
                               </div>
                               
                            </div>
                           
                            </div>
                      
                     </div>

                    </div>

                </div>

                </div>

            </div>
        </div>
        <div style={{marginTop:'50px'}}></div>
     <Footer />
     <div id="confirmationModal" class="modal">
  <div class="modal-content">
    <p style={{fontWeight:'bold'}}>Are you sure you want to delete this request?</p>
    <div class="button-container">
      <button id="confirmBtn">Confirm</button>
      <button id="cancelBtn">Cancel</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserAccount