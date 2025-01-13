import React from 'react'
import './Navbar.css';
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
    <img src={assets.logo} alt="logo" className='Logo' />
    <img src={assets.adminlogo} alt="profile" className='profile' />
    </div>
  )
}

export default Navbar
