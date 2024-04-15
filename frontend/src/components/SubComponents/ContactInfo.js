import React from 'react'
import email from './assets/email.png'
import phone from './assets/phone.png'
import location from './assets/location.png'
const ContactInfo = () => {

  return (
<div>
    <div className="contact_info">
				<div className="container">
				<div className="row">
					<div className="col-lg-my">
					<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
						<div className="ltn__contact-address-icon">
					<img src={email} alt="Icon Image" />
						</div>
						<h3>Email Address</h3>
						<p>Kiruvtk@gmail.com <br />
					.</p>
					</div>
					</div>
					<div className="col-lg-my">
					<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
						<div className="ltn__contact-address-icon">
						<img src={phone} alt="Icon Image" />
						</div>
						<h3>Phone Number</h3>
						<p>+9407798567<br /> .</p>
					</div>
					</div>
					<div className="col-lg-my">
					<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
						<div className="ltn__contact-address-icon">
						<img src={location} alt="Icon Image" />
						</div>
						<h3>Office Address</h3>
						<p>27/24, Ramekrishana lane, <br />
						Kondavil East,</p>
					</div>
					</div>
				</div>
				</div>
			</div>
            {/* ////////////////////////////////////////////// */}

            <div className="ltn__contact-message-area mb-120 mb--100">
				<div className="container">
				<div className="row">
					<div className="col-lg-12">
					<div className="ltn__form-box contact-form-box box-shadow white-bg">
						<h4 className="title-2">Get A Quote</h4>
						<form id="contact-form" method="post">
						<div className="row">
							<div className="col-md-my">
							<div className="input-itemmy input-item-name ltn__custom-icon">
								<input style={{width:'150%'}} type="text" name="name" placeholder="Enter your name" />
							</div>
							</div>
							<div className="col-md-my">
							<div className="input-itemmy input-item-email ltn__custom-icon">
								<input  style={{width:'150%'}}  type="email" name="email" placeholder="Enter email address" />
							</div>
							</div>
							<div className="col-md-my">
							<div className="input-itemmy input-item-name ltn__custom-iconmy" >
                            <select style={{
                             width:'150%',                       
                             backgroundColor: 'var(--white)',
                             border: '2px solid var(--border-color-9)',
                             height: '65px',
                             boxShadow: 'none',
                             paddingLeft: '20px',
                             fontSize: '16px',
                             color: 'var(--ltn__paragraph-color)',
                             marginBottom: '30px',
                             borderRadius: '0',
                             paddingRight: '40px'
                                              }} className="nice-select" name="service">
								<option>Select Service Type</option>
								<option>Property Management </option>

								</select>
							</div>
							</div>
							<div className="col-md-my">
							<div className="input-itemmy input-item-phone ltn__custom-icon">
								<input  style={{width:'150%'}}  type="text" name="phone" placeholder="Enter phone number" />
							</div>
							</div>
						</div>
						<div className="input-item input-item-textarea ltn__custom-icon">
							<textarea name="message" placeholder="Enter message" defaultValue={""} />
						</div>
						<p><label className="input-info-save mb-0"><input type="checkbox" name="agree" /> Save my name, email, and website in this browser for the next time I comment.</label></p>
						<div className="btn-wrapper mt-0">
							<button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">get a free service</button>
						</div>
						<p className="form-messege mb-0 mt-20" />
						</form>
					</div>
					</div>
				</div>
				</div>
			</div>
</div>
  )
}

export default ContactInfo