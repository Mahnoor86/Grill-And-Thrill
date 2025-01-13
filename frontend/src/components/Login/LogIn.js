import React from 'react';
import './LogIn.css';
import { useState, useContext} from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LogIn = ({setShowLogIn}) => {

const {url, setToken} = useContext(StoreContext);
const [currState,setCurrState] = useState("Sign Up");
const [data, setData] =useState({
  name:"",
  email:"",
  password:""
});

const onChangeHandler=(event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
}

const onLogin= async(event)=>{
     event.preventDefault();
     let newUrl=url;
     if(currState==='LogIn'){
       newUrl += "/api/user/login"
     }
     else{
      newUrl += "/api/user/register"
     }

     const res= await axios.post(newUrl, data);
     if(res.data.success){
          setToken(res.data.token);
          localStorage.setItem('token', res.data);
          setShowLogIn(false);
     }
     else{
      alert(res.data.message)
     }
}

 
return (
<div className="login-page">
       <form onSubmit={onLogin} className='login-page-container'>
<div className="login-page-title">
<h2>
{currState}
</h2>
<img onClick={()=>setShowLogIn(false)} src={assets.cross_icon} alt="cancel"/>
</div>
<div className="login-page-inputs">
 {currState==="LogIn"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
<input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
<input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
</div>
<button type='submit'>{currState==="Sign Up"?"Create account":"LogIn"}</button>

<div className="login-page-condition">
  <input type="checkbox" required/>
  <p>By continuing,I agree to the terms of use & privacy policy</p>
</div>

{currState==="LogIn"
?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up") }>Click here</span></p>
:<p>Already have an account? <span onClick={()=>setCurrState("LogIn") }>LogIn here</span> </p>
}

</form>
</div>
);
}

export default LogIn;
