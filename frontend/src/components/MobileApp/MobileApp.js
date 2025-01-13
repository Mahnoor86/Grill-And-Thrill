import React from 'react'
import './MobileApp.css'
import { assets } from '../../assets/assets'

const MobileApp = () => {
  return (
    <div className='MobileApp' id='MobileApp'>
    <h2>Download our app for quick access to our menu, exclusive deals and easy ordering. </h2>
    <p>Enjoy your favorite dishes anytime anywhere, with just a few taps!</p>

    <div className='social'>
    <img src={assets.appStore} alt=""/>
    <img src={assets.playStore} alt=""/>
    </div>

    </div>
  )
}

export default MobileApp
