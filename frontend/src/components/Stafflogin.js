import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import logo from './assets/vtkL.png'
import Footer from './SubComponents/LocalFooter.js';
import PageHeader from "./SubComponents/PageHolder.js";
import { event } from 'jquery';
const Stafflogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate(); 
  const [fail, setFail] = useState(false);
  const [failEmail, setFailEmail] = useState(false);
  const [failPassword, setFailPassword] = useState(false);

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
            if (res.data.message === 'Login Successfully' && res.data.secondColumnData === 'admin' ) {
              navigate('/admin', { state: { name:res.data.secondColumnData } });
            }
            if (res.data.message === 'Login Successfully' && res.data.secondColumnData === 'Pros' ) {
              navigate('/pros', { state: { name:res.data.secondColumnData } });
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
        {/* <PageHeader headertitle="Account" subheader="Staff Login"  /> */}
        <div className="">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img style={{width:'250px', margin:'30px 0 0 4vw '}} src={logo} alt="Logo"  />
              </Link>
        </div>
    <div className='staff'>
        
         <div className='ST_container'>
            <h1>Sign in</h1>
            <div style={{marginBottom:'10px'}}>
            <label>If you're service professional Or Admin</label></div>
            <form   onSubmit={HandleSubmit}>
            <input 
            onChange={e => setEmail(e.target.value)}
             style ={{
              borderColor: fail && !email ? 'red' : '',
              color: failEmail ? 'red' : ''
                     }}
               value={failEmail ? 'Invalid Credentials' : email}
               placeholder={fail && !email ? 'Username required' : 'Username'}
             type="text" name="username" id="username"/>
            {/* <label > Enter valid email </label> */}
            <input 
             style={{
            borderColor: fail && !password ? 'red' : '',
             color: failPassword ? 'red' : ''
                   }}
           value={failPassword ? password : password}
            onChange={e => setPassword(e.target.value)}
         placeholder={fail && !password ? 'Password required' : 'Password'}
              type="password" name="password" id="password"/>
            {/* <label > Enter password</label> */}
            <button type="submit" >Login</button><br/>
            </form>
         </div>

    </div>
    <Footer/>
    </div>
  )
}

export default Stafflogin