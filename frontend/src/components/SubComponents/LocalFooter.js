import React from 'react'
import logol from './assets/vtkLgr.png'
import pay from './assets/pay3.png'
import {Link} from "react-router-dom"

const LocalFooter = () => {
    const yr = new Date();
  return (
        <div className='Profile_footer'>
  <footer>
         <div class="footer-content">
           
             <ul class="socials">
                 <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                 <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                 <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                 <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
             </ul>
         </div>
         <div class="footer-bottom">
             <p>copyright &copy; <a href="#">{yr.getFullYear()}, VKT. All Rights Reserved.</a>  </p>
                     <div class="footer-menu">
                       <ul class="f-menu">
                         <li><a href="">Home</a></li>
                         <li><a href="">About</a></li>
                         <li><a href="">Support</a></li>
                         <li><a href="">Services</a></li>
                       </ul>
                     </div>
         </div>

     </footer>

     </div>
  )
}

export default LocalFooter