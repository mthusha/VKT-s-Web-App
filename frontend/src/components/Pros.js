import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProsHead from './Pros_Components/ProsHead';
import ProsVetical from './Pros_Components/ProsVetical';

const Pros = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [auth, setAuth] = useState(false);
  const [ user, setUser]= useState('');

  axios.defaults.withCredentials= true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);

          axios.get(`http://localhost:8081/userData/${res.data.email}`)
          .then(userDataRes => {
           
            setUser(userDataRes.data.role);
          })
          .catch(err => {
            console.error('Error fetching user data:', err);
          });
        } 
        else {
          setAuth(false);
          navigate('/staff');
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const redirect = async ()=>{
    if (user !=='Pros'){
      navigate('/staff');
    }
  }
  useEffect(() => {
    if (user) {
      redirect()
    }
    }, [user]);


// update showmenu
  useEffect(() => {
  
    const updateShowMenu = () => {
      setShowMenu(window.innerWidth >= 1080);
    };
    updateShowMenu();
    window.addEventListener('resize', updateShowMenu);
    return () => {
      window.removeEventListener('resize', updateShowMenu);
    };
  }, []);


  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <ProsHead handleMenuClick={handleMenuClick} />
      <ProsVetical showMenu={showMenu} />
    </div>
  );
}

export default Pros;
