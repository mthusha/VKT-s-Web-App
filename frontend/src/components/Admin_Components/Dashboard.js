import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import circle from './assets/circle.svg'
import axios from 'axios';
const Dashboard = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data6, setData6] = useState([]);
    const [status, setStatus]=useState("")
    const [originalDate, setOriginalDate] = useState(new Date()); 

///////////////////////////////on going update//////////////////////////
const [isPopupVisible, setIsPopupVisible] = useState(false);
const [clickedRowData, setClickedRowData] = useState(null); 
const date = clickedRowData?.date ? new Date(clickedRowData?.date) : new Date();



const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
};
const handleRowClick = (rowData) => {
  setClickedRowData(rowData);
  setStatus(rowData.status);
  setStatusid(rowData.status_id)
  togglePopup(); 

};

////////////////////// set status//////////////////////////////////////////
const [fail, setfail] = useState(false); 
const [statusid, setStatusid]= useState('')
const handleStatus = async (email) => {
    if (status==='') {
      setfail(true); 
      setTimeout(() => {
        setfail(false); 
      }, 3000);
    } else {

        try {
          const response = await fetch(`http://localhost:8081/updateStatus/${statusid}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({status: status}),
          });
          const data = await response.json();
          console.log(data.message);
          togglePopup(); 
        } catch (err) {
          console.log(err);
         
        }
      }
  };
///////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8081/active`);
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            setData(responseData);
          }
         const response2 = await fetch(`http://localhost:8081/waiting_all`);
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



      ///////////////////////////////////////////////////
      function calculateDaysAgo(date) {
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - date.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }


    ///////////////////////// for calendur ////////////////////////////////
    const setTodayDate = () => {
        const today = new Date(); 
        setOriginalDate(today); 
    };
    useEffect(() => {
        fetchData();
        setTodayDate();
    }, []);


    
    useEffect(() => {
        const currentDate = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[currentDate.getMonth()];
        const date = currentDate.getDate();
        const suffix = (date === 1 || date === 21 || date === 31) ? 'st' : (date === 2 || date === 22) ? 'nd' : (date === 3 || date === 23) ? 'rd' : 'th';
        const formattedDate = `${dayOfWeek}<br>${month} ${date}${suffix}`;
        
        document.querySelector('.date').innerHTML = formattedDate;
      }, []);


////////////////////////// get payment/////////////////////////
useEffect(() => {
    if (statusid) {
      paymentData();
    }
  }, [statusid]);
  
  const paymentData = async () => {
    try {
      
      const response = await fetch(`http://localhost:8081/payment/${statusid}`);
      const responseData = await response.json();
      if ( responseData.data === 'Payments not found'){
        console.log('Payments not found')
        setData6(["0"])
        console.log(data6)
        }
      if (Array.isArray(responseData)) {
        setData6(responseData);
        // console.log(statusid)
      }
   
      else {
        console.error("Response data is not an array:", responseData);
        setData6(["0"])
      
      }
    } catch (err) {
      console.error(err);
    }
  };

      /////////////////////////////////total pay///////////////////////////////
      let totalCost = 0;
data6.forEach((d) => {
  totalCost += parseFloat(d.cost);
});
// Calculate the duration between start_time and end_time
const startDate = new Date(clickedRowData && clickedRowData.start_time);
const endDate = new Date(clickedRowData && clickedRowData.end_time);
const totalDuration = endDate - startDate;
let percentage;
if (totalDuration > 0) {
  const currentTime = new Date();
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
    <div className='ad_dashboard'>
        <div className='containerm'>
            <div style={{display:'flex'}} className='title_ad'>
                <div className='mt1' >
                   <h4><span style={{display:'flex'}} className='page-title-icon'>
                    <i style={{fontSize:'12px', margin:'13px 25px 7px 11px'}} class="fa fa-home" aria-hidden="true"></i>Dashboard</span></h4>
                </div>
                <div className='mt1'>
                   <Link><p>Overview<i style={{color:'#70bef3'}} class="fa fa-info-circle" aria-hidden="true"></i></p></Link> 
                </div>
            </div>
            <div className='ad_row'>
                <div style={{}} className='ad_col'>
                    <div  className='col_body_1'>
                        <img  src={circle} alt=''/>
                    </div>
                    <div style={{padding:'25px 30px 25px 50px'}} className='ad_col_body_in'>
                    <div className='ad_in_head'>
                        <p style={{color:'white'}}>
                            Requested Service
                        </p>
                       <p style={{color:'white', fontSize:'25px',fontWeight:'bold',    margin: '-22px 0 0 1px'}}>{" +"}{data2.length-1}</p>
                       <p style={{color:'white',fontWeight:'bold' , margin:'35px 0 0 0'}}>Increased by 22%</p>
                    </div>
                    </div>
                </div>
                <div style={{    background: 'linear-gradient(90deg,#90caf9,#047edf 99%)'}} className='ad_col'>
                <div className='col_body_1'>
                        <img  src={circle} alt=''/>
                    </div>
                    <div style={{padding:'25px 30px 25px 50px'}} className='ad_col_body_in'>
                    <div className='ad_in_head'>
                        <p style={{color:'white'}}>
                            Today's Users
                        </p>
                       <p style={{color:'white', fontSize:'25px',fontWeight:'bold',    margin: '-22px 0 0 1px'}}>+{data3.length}{" "}in active </p>
                       <p style={{color:'white',fontWeight:'bold' , margin:'35px 0 0 0'}}>3% than last month</p>
                    </div>
                    </div>
                </div>
                <div style={{background: 'linear-gradient(90deg,#84d9d2,#07cdae)'}} className='ad_col'>
                <div className='col_body_1'>
                        <img src={circle} alt=''/>
                    </div>
                    <div style={{padding:'25px 30px 25px 50px'}} className='ad_col_body_in'>
                    <div className='ad_in_head'>
                        <p style={{color:'white'}}>
                            Revenue
                        </p>
                       <p style={{color:'white', fontSize:'25px',fontWeight:'bold',    margin: '-22px 0 0 1px'}}>34K</p>
                       <p style={{color:'white',fontWeight:'bold' , margin:'35px 0 0 0'}}>Increased by +2%</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className='ad_row'>
                <div className='on_project'>
                    <div className='on_p_title'>
                        <div className='on_p'>
                            <p style={{fontWeight:'bold'}}>Ongoing Project</p>
                            <p style={{marginTop:'-20px'}}>{data.length}{" "}Projects are on</p>
                        </div>
                        <div className='on_p'>
                            <p>Sroll to more</p>
                        </div>
                    </div>
                    <div className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Project title</th>
                                    <th>Pros</th>
                                    <th>Budget</th>
                                    <th>Completion</th>
                                    <th>Tracking ID</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data 
                            .map((d, i) => (
                                <tr key={i}>
                                    <td>{d.description}</td>
                                    <td>{d.provider_firsr_name}{" "}{d.provider_last_name}</td>
                                    <td></td>
                                    <td>{d.status}</td>
                                    <td># {d.status_id}{" "}<Link onClick={() => handleRowClick(d)}><i style={{fontSize:'11px'}} class="fa fa-bars" aria-hidden="true"></i></Link></td>
                                </tr>
                                ))
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='on_project2'>
                    <div className='waiting_list'>
                        <div className='wl_head'>
                        <p style={{fontWeight:'bold'}}>Waiting List</p>
                            <p style={{marginTop:'-20px'}}><span style={{color:'#48d348'}}>3% </span>than last month</p>
                        </div>
                        <div className='list_of_w'>
    {data2
     .filter(d => d.status !== '0')
        .sort((a, b) => {
            const dateA = new Date(a.curren_date);
            const dateB = new Date(b.curren_date);
            return dateA - dateB; 
        })
        .map((d, i) => {
            const daysAgo = calculateDaysAgo(new Date(d.curren_date));
            
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
                zIndex: '2',
                opacity: '1',
                background: backgroundColor,
                color: '#ffffff',
                borderRadius: '50%',
                boxShadow: 'none',
                fontSize: '0.875rem',
                marginLeft: '54px',
                marginTop: '28px'
            };

            return (
                <div key={i} className='box_w'>
                    <div className='in_list'>
                        <div className='mui_box' style={boxStyle}>
                            <Link to="./home">Go</Link> 
                        </div>
                        <div className='mui_data'>
                            <p style={{fontWeight:'bold'}}>{d.service_description}</p>
                            <p style={{marginTop:'-22px'}}>{new Date(d.date).toLocaleDateString()}</p>
                            <p style={{marginTop:'-22px'}}>{daysAgo}{" "}Days ago</p>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>

                    </div>
                </div>
            </div>
            <div className='ad_row'>
    <div className="calendar">
        <div className="col leftCol">
            <div className="content">
                <h1 className="date">Friday<span>September 12th</span></h1>
                <div className="notes">
                    <p>
                        <input type="text" value="" placeholder="new note here"/>
                        <a href="#" title="Add note" className="addNote animate">+</a>
                    </p>
                    <ul className="noteList">
                        <li>VKT's today appointments<a href="#" title="Remove note" className="removeNote animate">x</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="col rightCol">
            <div className="content">
                <h2 className="year">{originalDate.getFullYear()}</h2>
                <ul style={{marginTop:'-48px'}} className="months">
                    <li><a href="#" title="Jan" data-value="1">Jan</a></li>
                    <li><a href="#" title="Feb" data-value="2">Feb</a></li>
                    <li><a href="#" title="Mar" data-value="3">Mar</a></li>
                    <li><a href="#" title="Apr" data-value="4">Apr</a></li>
                    <li><a href="#" title="May" data-value="5">May</a></li>
                    <li><a href="#" title="Jun" data-value="6">Jun</a></li>
                    <li><a href="#" title="Jul" data-value="7">Jul</a></li>
                    <li><a href="#" title="Aug" data-value="8">Aug</a></li>
                    <li><a href="#" title="Sep" data-value="9">Sep</a></li>
                    <li><a href="#" title="Oct" data-value="10">Oct</a></li>
                    <li><a href="#" title="Nov" data-value="11">Nov</a></li>
                    <li><a href="#" title="Dec" data-value="12">Dec</a></li>
                </ul>
                <div className="clearfix"></div>
                <ul className="weekday">
                    <li><a href="#" title="Sun" data-value="0">Sun</a></li>
                    <li><a href="#" title="Mon" data-value="1">Mon</a></li>
                    <li><a href="#" title="Tue" data-value="2">Tue</a></li>
                    <li><a href="#" title="Wed" data-value="3">Wed</a></li>
                    <li><a href="#" title="Thu" data-value="4">Thu</a></li>
                    <li><a href="#" title="Fri" data-value="5">Fri</a></li>
                    <li><a href="#" title="Sat" data-value="6">Sat</a></li>
                </ul>
                <div className="clearfix"></div>
                <ul className="days">
                    {Array.from({ length: new Date(originalDate.getFullYear(), originalDate.getMonth() + 1, 0).getDate() }, (_, i) => (
                        <li key={i}><a href="#" title={i + 1} data-value={i + 1} className={i + 1 === originalDate.getDate() ? 'today' : ''}>{i + 1}</a></li>
                    ))}
                </ul>
                <div className="clearfix"></div>
            </div>
        </div>

        <div className="clearfix"></div>
    </div>
    <div className='date_service_box'>
        <div className='d_s_inbox'>
            <div className='dsbox_head'>
                <p style={{fontWeight:'bold'}}>Overview by date</p>
                <div className='underline'></div>
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
                    <p>Service Details</p>
                    <div className='underline'></div>
                   </div>
                   <div className='Scroll_pop'>
  
                   <div className='rs_pros'>
                        <p style={{marginBottom:'10px' ,fontWeight:'bold' }}>Status</p>
                        <div style={{padding:'0 10px'}}  className='ad_project_table'>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Provider</th>
                                    <th>Customer</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                            {/* {data2 
                            .filter(d => d.status === 'Available')
                            .map((d, i) => ( */}
                                <tr>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}> {clickedRowData && clickedRowData.service_name}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}> {clickedRowData && clickedRowData.provider_firsr_name}{" "}{clickedRowData && clickedRowData.provider_last_name}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}> {clickedRowData && clickedRowData.name}</td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>cannot be performed </td>
                                    <td style={{fontSize:'12px',backgroundColor:'white'}}>
                                        <input value={status} onChange={(e)=>setStatus(e.target.value)} style={{border:'none'}}></input>
                                        </td>
                                    
                                </tr>
                                {/* ))
                              } */}
                            </tbody>
                        </table>
                    </div>
                    <div>
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
                             {data6
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
                                    <p style={{marginTop:'-10px',fontSize:'12px', fontWeight:'bold'}}>Status by Date</p>
                                 </div>
                                 <div className='pros_percentage'>
                                 <div role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100}  style={progressBarStyle}></div>


                                 </div>
                            <div className='da_cus_sg'>
                                <p style={{fontSize:'13px', fontWeight:'bold'}}>Customer suggestions</p>
                                <p style={{fontFamily:'math', fontSize:'14px',marginTop:'-10px'}}> VKT Painting has recently completed a project involving the 
                                repainting of the exteriors of several commercial buildings.
                                 Our skilled painters ensured that each surface was prepped 
                                 and painted to perfection, revitalizing the appearance of 
                                 these establishments.</p>
                            </div>  
                            <div className='res_something'>
                               <div style={{ position: 'relative' }}>
                                <textarea placeholder='Want to say something...' className='comment-field' rows='4' cols='50'></textarea>
                             <div style={{ position: 'absolute', top: '120px', right: '5px', display: 'flex', gap: '10px' }}>
                                 <label style={{fontSize:'14px'}}>
                              <input style={{transform: 'scale(0.8)', verticalAlign: 'middle'}} type='checkbox' />
                                To provider
                                 </label>
                                 <label style={{fontSize:'14px'}}>
                                <input style={{transform: 'scale(0.8)', verticalAlign: 'middle'}} type='checkbox' />
                                 To Customer
                                 </label>
                                 <Link to='#'><i className="fa fa-paper-plane" aria-hidden="true"></i></Link>
                                 </div>
                                </div>
                              </div>
 
                            
                        </div>
                    </div>
                    </div>
                    </div>
                    <div style={{textAlign:'center'}} > <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                   
                </form>
                <div style={{display:'flex', justifyContent:'space-between'}} className='btn_flex'>
                <button style={{opacity:'0'}}> .</button>
                <button onClick={handleStatus} className='pop_don_btn'>Save change</button>
                </div>
    
            </div>
        
       

        </div>
    </div>

    </div>
  )
}

export default Dashboard