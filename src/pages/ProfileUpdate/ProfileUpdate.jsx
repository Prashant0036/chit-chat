import React, { useEffect, useState } from 'react';
import "./ProfileUpdate.css"
import assets from '../../assets/assets';
import { onAuthStateChanged } from 'firebase/auth';
import { auth,db } from '../../config/firebase';
import { getDoc,doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
const ProfileUpdate = () => {

    const navigate = useNavigate();

    const [image,setImage] = useState(false);
    const [name, setName] = useState("");
    const [bio,setBio] = useState("");
    const [uid,setUid] = useState("");

    const [prevImage, setPrevImage] = useState("");

const profileUpdate = async (event)=>{

    event.preventDefault(); // it let not the page refresh while submit the form

    try {
        

        const docRef = doc(db,'users',uid);

        if(image){
                 const imgUrl = await upload(image);
                 setPrevImage(imgUrl);
                 await updateDoc(docRef,{

                    avatar : imgUrl,
                    bio:bio,
                    name : name
                 })
        }
        else{

           await updateDoc(docRef,{
                    bio:bio,
                    name : name
                 })
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.code); // last wali error show karni h bss
        
    }
}
    useEffect(()=>{

onAuthStateChanged(auth,async (user)=>{

    if(user){
        setUid(user.uid)
        // if user is there get and save uid in uid state varible
        const docRef = doc(db,"users",user.uid);

        const docSnap = await getDoc(docRef);

        if(docSnap.data().name){
         
            // agar phle se name h to fetch karke show kar diya
            setName(docSnap.data().name);
        }

        if(docSnap.data().bio){
         
            // agar phle se bio h to fetch karke show kar diya
            setBio(docSnap.data().bio);
        }
        if(docSnap.data().avatar){
         
            // agar phle se profile pic h to fetch karke show kar diya
            setPrevImage(docSnap.data().avatar);
        }

    }
    else{
        // if user is logged out 
        // navigate to home page
navigate("/")

    }
})
    },[])

    return (
        <div className='profile'>
<div className="profile-container">
    
    <form onSubmit={profileUpdate}>
        <h3>Profile Details</h3>

        <label htmlFor='avatar'>

            <input onChange={(e)=>{setImage(e.target.files[0])}} type='file' id='avatar' accept='.png,.jpg,.jpeg' hidden />
            {/* <img src={image ? URL.createObjectURL(image) : assets.avatar_icon } alt=''/> */}
            <img 
  src={ image 
          ? URL.createObjectURL(image) 
          : prevImage 
            ? prevImage 
            : assets.avatar_icon } 
  alt='' 
/>

            upload profile image
        </label>
        
        <input onChange={(e)=>{setName(e.target.value)}} value={name} type='text' placeholder='Your name' required/>
        <textarea onChange={(e)=>{setBio(e.target.value)}} value = {bio} placeholder='Something about you' required/>
        <button type='submit' >Save</button>
        
        </form>
        
        {/* <img className='profile-pic' src={image ? URL.createObjectURL(image) : assets.avatar_icon } alt=''/> */}
       <img 
  className='profile-pic'
  src={ image 
          ? URL.createObjectURL(image) 
          : prevImage 
            ? prevImage 
            : assets.avatar_icon } 
  alt='' 
/>

        </div>            
            
        </div>
    );
}

export default ProfileUpdate;
