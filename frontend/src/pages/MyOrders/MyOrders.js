import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
   
   const {url,token}=useContext(StoreContext);
   const [data,setData]=useState([]);
  
   const fetchOrders = async()=>{
   const res= await axios.post(url+"/api/order/userorders",{},{headers:{token}});
   setData(res.data.data);
}

   useEffect(()=>{
     if(token){
        fetchOrders();
     }
   },[token])

  return (
    <div className='myorders'>
    <h2>My Orders</h2>
    <div className='container'>
    {data.map((order, index)=>{
     return(
        <div key={index} className='myorder'>
        <img src={assets.parcel_icon}/>
        <p>{order.item.map((item,index)=>{
         if(index===order.item.length-1){
         return item.name+ " x " +item.quantity
         }
         else{
            return item.name+ " x " +item.quantity+",  "
         }
        })}</p>
        <p>Rs {order.amount}</p>
        <p>Items:{order.item.length}</p>
        <p><span>&#x25cf; </span><b>{order.status}</b></p>
        <button onClick={fetchOrders}>Track Order</button>
        </div>
     )
    })}

    </div>
      
    </div>
  )
}

export default MyOrders
