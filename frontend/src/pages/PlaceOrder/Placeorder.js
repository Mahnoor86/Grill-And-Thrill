import React, { useContext, useState, useEffect } from "react";
import './Placeorder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets";
import axios from 'axios';


const Placeorder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItem = [];
        food_list.forEach((items) => {
            if (cartItems[items._id] > 0) {
                let itemInfo = { ...items, quantity: cartItems[items._id] };
                orderItem.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            item: orderItem,
            amount: getTotalCartAmount() + 2,
        };

        try {
            let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
            console.log("Response from place order:", response.data);

            if (response.data.success) {
                const { session_url } = response.data;

                // Clear the cart
                setCartItems((prev) => Object.fromEntries(Object.keys(prev).map(key => [key, 0])));

                // Show success message
                alert("Your order has been placed successfully!");

                if (session_url) {
                    // Redirect to Stripe's payment page
                    window.location.replace(session_url);
                } else {
                    alert("Session URL not found. Please try again.");
                }
            } else {
                alert("Sorry, an error occurred while placing the order.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while processing the order.");
        }
    };

    useEffect(()=>{
        if (!token){
          navigate('/CartPage')
          alert("Make a Account to Proceed!")
        }
        else if(getTotalCartAmount()===0)
        {
        navigate('/CartPage')
         alert("Your Cart is Empty!")
         
        }
      },[token])

    return (
        <div className="ProceedPayment">
            {/* Back Button placed above Delivery Information */}
            <div className="back-button" onClick={() => navigate('/CartPage')}>
                <img src={assets.backArrow} alt="Back" className="back-button2" />
            </div>

            <form onSubmit={placeOrder} className="place-order">
                <div className="place-order-left">
                    <p className="title">Delivery information</p>

                    <div className="multi-fields">
                        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
                        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
                    </div>

                    <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
                    <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />

                    <div className="multi-fields">
                        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
                        <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
                    </div>

                    <div className="multi-fields">
                        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
                        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
                    </div>

                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
                </div>

                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>Rs {getTotalCartAmount()}</p>
                            </div>

                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>Rs {getTotalCartAmount() === 0 ? 0 : 200}</p>
                            </div>

                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</b>
                            </div>
                        </div>

                        <button type='submit'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Placeorder;
