import React from 'react'
import ContactInfo from './SubComponents/ContactInfo'
import Header from './Header'
import Footer from './Footer'
import PageHeader from "./SubComponents/PageHolder.js";
import { Form } from 'react-router-dom'
import Map from './SubComponents/Map.js';
const Contact = () => {
  return (
    <div>
    <Header/>
    <PageHeader headertitle="Home" subheader="Contact"/>
    <ContactInfo/>
    <Map/>
    <Footer/>
    </div>
  )
}

export default Contact