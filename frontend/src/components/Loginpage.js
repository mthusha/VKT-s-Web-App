import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './css/Header.css';
import './scribt/headerscribt.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/responsive.css'
import Header from './Header.js'
import Footer from './Footer.js';
import PageHeader from "./SubComponents/PageHolder.js";
import axios from 'axios'
const Loginpage = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate(); 
const [fail, setFail] = useState(false);
const [failEmail, setFailEmail] = useState(false);
const [failPassword, setFailPassword] = useState(false);
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
axios.defaults.withCredentials = true;
    function HandleSubmit(event) {
       
        event.preventDefault();
        if (!email || !password) {
            setFail(true);
            setTimeout(() => {
                setFail(false); 
            }, 3000);
            return;
        }
        axios.post('http://localhost:8081/loginb', { email, password })
            .then(res => {
                console.log(res.data);
              //  const { name } = res.data.secondColumnData;
                if (res.data.message === 'Login Successfully' 
                && res.data.secondColumnData === 'User' ) {
                    navigate('/UserPage', { state: { name:res.data.secondColumnData } });
                  }
                  else  {
                   console.log("Invalid Credentials");
                   setFailEmail(true);
                   setFailPassword(true);
                   setTimeout(() => {
                   setFailEmail(false);
                   setFailPassword(false);
                   }, 3000);
                   
                }

            })
            .catch(err => {
                console.log(err);
               
            });
    }

  return (
    <div>
        <Header/>
        <PageHeader headertitle="Account" subheader="Login"  />

    <div className="ltn__login-area pb-65" >
       <div style={{ boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px', marginTop:'-3pc'}} className="container">
       <div className="row">
           <div className="col-lg-12">
           <div style={{paddingTop:'20px', opacity:'1'}}  className="section-title-area text-center" >
               <h1 className="section-title">Sign In <br />To  Your Account</h1>
               <p>Welcome to VKT Construction's Secure Portal. <br />
                Please enter your credentials to access your account.</p>

           </div>
           </div>
       </div>
       <div className="space2"></div>
       <div className="lrow">
           <div className="col-lg-tm">
           <div className="account-login-inner">
               <form   onSubmit={HandleSubmit} className="ltn__form-box contact-form-box">
               <input
             style ={{
              borderColor: fail && !email ? 'red' : '',
              color: failEmail ? 'red' : ''
                      }}
               value={failEmail ? 'Invalid Credentials' : email}
               onChange={e => setEmail(e.target.value)}
               type="text"
               name="email"
               placeholder={fail && !email ? 'Email required' : 'Email'}
                />

             <input
             style={{
              borderColor: fail && !password ? 'red' : '',
             color: failPassword ? 'red' : ''
              }}
              value={failPassword ? password : password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder={fail && !password ? 'Password required' : 'Password'}
               />

               <div className="btn-wrapper mt-0">
                   <button className="theme-btn-1 btn btn-block" type="submit">SIGN IN</button>
               </div>
               <div className="go-to-btn mt-20">
               <a href="#" title="Forgot Password?" data-bs-toggle="modal" data-bs-target="#ltn_forget_password_modal"><small>FORGOTTEN YOUR PASSWORD?</small></a>
               </div>
               </form>
           </div>
           </div>
           <div className="col-lg-tm2">
           <div className="account-create text-center pt-50">
               <h4>DON'T HAVE AN ACCOUNT?</h4>
               <p>Get ready to experience streamlined home utility services<br /> Join VKT's community by creating your account. 
               </p>
               <div className="btn-wrapper go-top">
                   <Link to="/register" className="theme-btn-1 btn black-btn">CREATE ACCOUNT</Link>
               </div>
           </div>
           </div>
       </div>
       </div>
               </div>
         <div>
            <div className="space"></div>
</div>
<Footer/>
   </div>

  )
}

export default Loginpage