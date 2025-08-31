import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import { ToastContainer, toast } from 'react-toastify';
// to display any message or error
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AppContext } from './context/appContext';


const App = () => {

  const navigate = useNavigate();
  const {loadUserData} = useContext(AppContext);
useEffect(()=>{

  onAuthStateChanged(auth,async (user)=>{

    // onAuthStateChanged used when user login or logout 

    if(user){

      navigate('/chat');
      // if user exist
      // means user has been instanciated in auth
      // so navigate user to chat page

      // console.log(user.uid);

      //uid is there in user object, paas it in loadUserData function in AppContext file 
      // and get userData
      await loadUserData(user.uid);

    }
    else{
      // navigate user on login page
      // if auth instance has been removed

      // we'll provide the path of home page if user log out
      navigate('/');

    }

  })
},[])

  return (
    <div>

      <ToastContainer/>
    
      <Routes>

        <Route path='/' element ={<Login/>}/> 
        {/* We wan't to make it Home Page */}

       <Route path='/chat' element={<Chat/>}/>
       {/* For Chat page */}
 

 <Route path='/profile' element={<ProfileUpdate/>}/>


      </Routes>
      
    </div>
  );
}

export default App;
