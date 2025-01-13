import React from 'react'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/NavBar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import CartPage from './pages/Cart/CartPage'
import Placeorder from './pages/PlaceOrder/Placeorder'

import LogIn from './components/Login/LogIn'
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import MobileApp from './components/MobileApp/MobileApp';
import MyOrders from './pages/MyOrders/MyOrders';
import Verify from './pages/Verify/Verify';

const App = () => {
  const [showLogIn,setShowLogIn] = useState(false)

  return (
    <>
    {showLogIn?<LogIn setShowLogIn={setShowLogIn}/>:<></>}

      <div className='app'>
      <Navbar setShowLogIn={setShowLogIn}/>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/CartPage' element={<CartPage/>}></Route>
      <Route path='/Placeorder' element={<Placeorder/>}></Route>
      <Route path="/explore-menu" element={<ExploreMenu/>}></Route>
      <Route path="/MobileApp" element={<MobileApp/>}></Route>
      <Route path='/myorder' element={<MyOrders/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>

    </Routes>
    </div>
    <Footer/>
    </>
  
  )
}

export default App
