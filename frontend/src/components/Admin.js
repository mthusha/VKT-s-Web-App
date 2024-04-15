import React, { useEffect, useState } from 'react'
import { useLocation , useNavigate} from "react-router-dom";
import axios from 'axios';
import AdminHeadder from './Admin_Components/AdminHeadder';
import VerticalMenu from "./Admin_Components/VerrticalMenu";
const Admin =  ()  => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState([]);
  const [message, setMassage]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success" && res.data.email ==='admin') {
          setAuth(true);
          setEmail(res.data.email);

        }else{
          setAuth(false)
          setMassage(res.data.message)
          navigate('/staff');

        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);


  return (
    
    <div className="admin_m">
       <div className="admin_alert">
      Resolution not compoteble. Please use a larger screen for optimal experience.
    </div>
    <div className='admin_block'>
    <AdminHeadder />
    <VerticalMenu />
    </div>
  </div>
  )
}

export default Admin