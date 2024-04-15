import React, { useEffect } from 'react';
import './Global.css';
import './Globalscribt.js'
import './responsive.css'
// import './bootsrap.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import eman from './assets/eman3.png'
const FooterBox = () => {

  useEffect(() => {
    const submitEmailButton = document.querySelector('.submit-email');

    if (submitEmailButton) {
      submitEmailButton.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const subscriptionElement = document.querySelector('.subscription');

        if (subscriptionElement) {
          subscriptionElement.classList.add('done');
        }
      });
    }

   
    return () => {
      if (submitEmailButton) {
        submitEmailButton.removeEventListener('mousedown', (e) => {
          e.preventDefault();
          const subscriptionElement = document.querySelector('.subscription');

          if (subscriptionElement) {
            subscriptionElement.classList.add('done');
          }
        });
      }
    };
  }, []);
  
  return (
    
    <div class="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
        <div class="call-to-action-inner call-to-action-inner-6 ltn__secondary-bg position-relative text-center---">
            <div class="coll-to-info text-color-white">
              <h1 >Subscribe to our newsletter to get updates to our lates package</h1>
              <p style={{textAlign:'left'  }}>We can help you realize your dream of a new home</p>
            
<div className='sub'>
   <div class="container">
  <div class="content">
    <form class="subscription">
    <input class="add-email" type="email" placeholder="subscribe@me.now" />
      <button class="submit-email" type="button">
        <span class="before-submit">Subscribe</span>
        <span class="after-submit">Thank you for subscribing!</span>
       </button>
    </form>
  </div>
</div>
        </div>
            </div>
        </div>
        <div className="image-container" style={{ zIndex: 2 }}>
  <a className="">
    <i className="icon-next">
      <img
        src={eman}
        alt="Logo"
        style={{

          height: 'auto',
          borderRadius: '5px',
          margin: '0',
          position: 'absolute',
          top: '0',
          width:'340px',
          left: '75%',
          transform: 'translate(-50%, -50%)', 
        }}
      />
    </i>
  </a>
</div>
 </div>
</div>
</div>
</div>

  )
}

export default FooterBox