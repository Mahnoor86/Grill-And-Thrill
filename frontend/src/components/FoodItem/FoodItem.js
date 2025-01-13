import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

function FoodItem({ id, name, price, description, image }) {
  const { cartItems = {}, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
        
        {!cartItems[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.addIcon} alt="Add to cart" />
          : <div className='food-item-counter'>
              <img onClick={() => removeFromCart(id)} src={assets.removeIcon} alt="Remove from cart" />
              <p>{cartItems[id] || 0}</p> 
              <img onClick={() => addToCart(id)} src={assets.addedIcon} alt="Add more" />
            </div>
        }
      </div>
      
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className='food-item-name'>{name}</p>
        </div>
        <p className="food-item-desp">{description}</p>
        <p className="food-item-price">Rs {price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
