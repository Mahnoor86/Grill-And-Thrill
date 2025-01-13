import react from 'react';
import './CartPage.css';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar';
import { assets } from '../../assets/assets';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate();

  return (
    <div className='cart'>
    <div className="back-button">
    <img 
        src={assets.backArrow}
        alt="Back to Menu"
        onClick={() => navigate('/#Explore-Menu')} 
    className="back-icon" 
    />
    <span onClick={() => navigate('/#Explore-Menu')} className="back-text"></span>

    </div>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div  className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs {item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs {getTotalCartAmount()===0?0:200}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <b>Total</b>
                <b>Rs {getTotalCartAmount()===0?0:getTotalCartAmount()+200}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/Placeorder')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;


