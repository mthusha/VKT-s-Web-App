import { Link, useNavigate } from "react-router-dom";
import './css/Header.css';
import './scribt/headerscribt.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/responsive.css'
import Header from './Header.js'
import Footer from './Footer.js';
import PageHeader from "./SubComponents/PageHolder.js";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Register = () => {
    const navigate = useNavigate(); 
    const [fail, setFail] = useState(false);
    const [data, setData] = useState([]);
    const [failEmail, setFailEmail] = useState(false);
    const [formData, setFormData] = useState({
      id: '',
      name: '',
      last_name: '',
      email: '',
      role: 'User',
      password: '',
      phone:'',
    });
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8081')
        .then(res => {
          if (res.data.Status === "Success") {
              navigate('/UserPage');
          }
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }, []);
    const handleInsert = async (e) => {
      if(formData.name===''||formData.email===''||formData.last_name===''||formData.password===''||formData.phone===''){
        setFail(true);
        setTimeout(() => {
            setFail(false); 
        }, 3000);
        return;
      }else{
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8081/useradd", formData);
      
          if (response.data.message === 'Login Successfully') {
            navigate('/UserPage', { state: { name:response.data.secondColumnData } });


            setFormData({
              id: '',
              name: '',
              last_name: '',
              email: '',
              role: '',
              password: '',
              phone:'',
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
      

  return (
    <div>
           <Header/>
        <PageHeader headertitle="Account" subheader="Register"  /> 
    <div className="ltn__login-area pb-110">
				<div className="container"  style={{ boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px'}} >
				<div className="row">
					<div className="col-lg-12">
					<div className="section-title-area text-center" style={{paddingTop:'20px', opacity:'1'}} >
						<h1 className="section-title">Register <br />Your Account</h1>
						<p>Get ready to experience streamlined home utility services<br /> Join VKT's community by creating your account. 
               </p>
					</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 offset-lg-3">
					<div className="account-login-inner">
						<div   className="ltn__form-box contact-form-boxtm">
						<input type="text" name="firstname" placeholder="First Name" 
                           value={formData.name}
                           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           style ={{
                            borderColor: fail && !formData.name ? 'red' : '',
                            
                                    }}
                           />


						<input type="text" name="lastname" placeholder="Last Name" 
                         value={formData.last_name}
                         onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                         style ={{
                          borderColor: fail && !formData.last_name ? 'red' : '',
                          
                                  }}
                         />


						<input type="text" name="email" placeholder="Email*"  
                        value={failEmail ? 'Email already exists' :formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           style ={{
                            borderColor: fail && !formData.email ? 'red' : '',
                            color: failEmail ? "red" : ""
                                    }}
                            />


						<input type="text" name="phone" placeholder="Phone Number" 
                         value={formData.phone}
                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                         style ={{
                          borderColor: fail && !formData.phone ? 'red' : '',
                          
                                  }}
                         />


						<input type="password" name="password" placeholder="Password*" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style ={{
                borderColor: fail && !formData.password ? 'red' : '',
               
                        }}
              />
						
						<label className="checkbox-inline">
							<input type="checkbox" defaultValue /> 
							By clicking "create account", I consent to the privacy policy.
						</label>
						<div className="btn-wrapper">
							<button  onClick={handleInsert}  className="theme-btn-1 btn reverse-color btn-block" >CREATE ACCOUNT</button>
						</div>
                        <div className="btn-wrapper">
                        <Link to="/login">ALREADY HAVE AN ACCOUNT ?</Link>
						</div>
                       
						</div>
						
					</div>
					</div>
				</div>
				</div>
			</div>
            <div className="space"></div>
            <Footer/>
            </div>
  )
}

export default Register