import React, { useEffect, useState } from 'react'
import { useLocation , useNavigate} from "react-router-dom";
import ProfileHolder from "./SubComponents/ProfileHolder.js";
import Header from "./SubComponents/ProfileHeader.js";
import OfferBox from "./SubComponents/UserOffer.js"
import Categoty from './SubComponents/Explore_category.js'
import Footer from './SubComponents/ProfileFooter.js';
import PopularProject from './SubComponents/PopularProject.js'
import LoadingSpinner from './SubComponents/LoadingSpinner.js'
import Footerm from './Footer.js';
import axios from 'axios';

const UserPage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); 



/////////////////////////////////////////

  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState([]);
  const [message, setMassage]=useState([]);
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


/////////////////////////////////////////




/////////////////////////////////////////

useEffect(() => {

  const timer = setTimeout(() => {
    setIsLoading(false); 
  }, 2500);

  return () => clearTimeout(timer); 
}, []);

if (isLoading) {
  return <LoadingSpinner />; 
}

  return (
    <div>

      <Header name ={name} />
      <ProfileHolder headertitle={name}  />
      <PopularProject/>     
      <Categoty/>
      <OfferBox percentage='20%'/>
  
 
     
      {/* <p style={{ height:'100%', marginTop:'50px', display:'flex',color:'red'}} >.</p>   */}
       <Footer/>
    </div>
  )
}

export default UserPage