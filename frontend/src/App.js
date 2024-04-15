import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Loginpage from './components/Loginpage';
import Register from './components/Register'
import UserPage from './components/UserPage'
import Error from './components/error';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Stafflogin from './components/Stafflogin';
import Professionals from './components/Professionals';
import UserAccount from './components/SubComponents/UserAccount';
import ServicePage from './components/SubComponents/ServicePage';
import ProjectDetails from './components/SubComponents/ProjectDetails';
import Pros from './components/Pros';
function App() {
  return (
<Router>  
  <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path='Service' element={<ServicePage/>}/>
     <Route path="/login" element={<Loginpage />}/>
     <Route path= '/pros' element={<Pros/>}/>
     <Route path="/register" element={<Register />}/>
     <Route path="/UserPage" element={<UserPage />}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/admin' element={<Admin/>}/>
     <Route path='/project_details' element={<ProjectDetails/>}/>
     <Route path='/staff' element={<Stafflogin/>}/>
     <Route path="/professional" element={<Professionals/>}/>
     <Route path="/my-account" element={<UserAccount/>}/>
     <Route path="/error" element={<Error />}/>
     <Route path="*" element={<Navigate to="/error"/>}/>
   </Routes>
</Router>
  );
}

export default App;
