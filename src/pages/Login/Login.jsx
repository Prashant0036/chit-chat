import React, { useState } from 'react';
import './Login.css'
import { signup,login } from '../../config/firebase.js';

import assets from '../../assets/assets.js'; 
// this assets is a object which have all the assests 

const Login = () => {

const [formType, setFormType] = useState("Sign Up")

// three variables
const [userName,setUserName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const onSubmitHandler = (event)=>{

  event.preventDefault(); // to stop page refresh while clicking on submit button

  if(formType==="Sign Up"){

    // call signup function written in firebase.js
    signup(userName,email,password);
  }
  else{

    // user wants to log in
// call login function 
    login(email,password);
  }


}



    return (
        <div className='login'>
            
  <img src={assets.logo_big} alt='' className='logo' />

<div className="signUpForm">


  <form  onSubmit={onSubmitHandler} >
    <h2>{formType} </h2>

    {/* if formType==="Sign Up" show this input field other wise show null */}


    {/* <input  onChange={(e)=>{setUserName(e.target.value)}} /> to store userName */}

   {formType==="Sign Up" ? <input  onChange={(e)=>{setUserName(e.target.value)}} value={userName} type='text' placeholder='Username' required></input> : null} 


   <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type='email' placeholder='Email address' required></input>
   <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type='password' placeholder='Password' required></input>
   <button type='submit'>{formType==="Sign Up" ?"Create Account" : "Login Now"}</button>
    
    <input type='checkBox' required/> 
    Agree to the terms of use & privacy policy. 

    {formType==="Sign Up" ? <p>Already have an account? <span onClick={()=>setFormType("Login")}>Login here</span></p> 
    
    : 
    <div>

    <p>Create an account <span onClick={()=>setFormType("Sign Up")}>Click here</span></p> 
    
      <p>Forgot Password? <span onClick={()=>{}}>Click here</span></p>  
    </div>}


  </form>
    </div>  

        </div>
    );
}

export default Login;
