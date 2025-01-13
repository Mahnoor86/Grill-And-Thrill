import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/Add/AddFood';
import ListFood from './pages/List/ListFood';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateFood from './pages/Update/UpdateFood'

const App = () => {
  const url = "http://localhost:4000";  // backend URL
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      
      <div className='app-cont'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<AddFood url={url}/>} />
          <Route path='/list' element={<ListFood url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
          <Route path='/update' element={<UpdateFood url={url}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
