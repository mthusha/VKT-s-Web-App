import React from 'react'
import errorp from './assets/error.png'
import { Link } from 'react-router-dom'
const error = () => {
  return (
    <div className="ltn__404-area ltn__404-area-1 mb-120">
				<div className="container">
				<div className="row">
					<div className="col-lg-12">
					<div className="error-404-inner text-center">
						{/* <div className="error-img mb-30">
					 <img src={errorp} alt="#" /> 
						</div> */}
						<h1 style={{fontSize:'236px'}} className="error-404-title d-none">404</h1>
						<h2 style={{ fontSize:'39px'}}>Page Not Found!</h2>
					
						<p>Hmm, we can't find the page you're looking for. It might have been moved or deleted.</p>
						<div className="btn-wrapper go-top">
						<Link to="/" className="btn btn-transparent"><i className="fas fa-long-arrow-alt-left" /> BACK TO HOME</Link>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
  )
}

export default error