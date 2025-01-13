import React, { useEffect, useState } from 'react'
import './ListFood.css'
import axios from "axios";
import { toast } from 'react-toastify';

const ListFood = ({url}) => {
  
  const [list, setList]=useState([]);

  const fetchData = async() => {

    const res = await axios.get(`${url}/api/food/list`);
    console.log(res.data);

    if (res.data.success) {
      setList(res.data.data)
    } else {
      toast.error("An error occurred while displaying  the food.");
    }
  }
const removeFood=async(foodId)=>{
    const res= await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchData();

    if (res.data.success) {
      toast.success("Food Item Removed!");
    } else {
      toast.error("An error occurred while removing the food.");
    }
}

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='list flex-col'>
      <p className='food'>All Food List</p>
      <div className='list-table'>
      <div className='list-table-format'>
       <b>Image</b>
       <b>Name</b>
       <b>Category</b>
       <b>Price</b>
       <b>Action</b>
      </div>
      {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
             <img src={`${url}/images/`+item.image}/>
             <p>{item.name}</p>
             <p>{item.category}</p>
             <p>Rs {item.price}</p>
             <p>{item.description}</p>
             <p onClick={()=>removeFood(item._id)} className='pointer'>x</p>
            </div>
          )
      })}
      </div>
      
    </div>
  )
}

export default ListFood
