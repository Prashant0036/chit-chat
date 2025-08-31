import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailLink } from "firebase/auth";

// To access data globally in any of the file

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const navigate = useNavigate(); // to control navigation in different pages

const[userData,setUserData] = useState(null);
const[chatData,setChatData] = useState(null);

const loadUserData = async(uid)=>{

// users is collections name
    try {
        const userRef = doc(db,'users',uid);

        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        // console.log(userSnap);


        // store the userData from this snap shot
        // console.log("Auth UID:", uid);
        // console.log(userData);
      
        // store user data in state variable i.e. userData 
        setUserData(userData);

        if(userData.avatar && userData.name){
            // if avatar and name is already set user
            // will be navigated to chat
          navigate("/chat");
        }
        // else{
        //     // send user to profile page to set name and pp
        //     navigate("/profile");
        // }

        // Now update last seen every minute if user is logged in

        setInterval( async()=>{
            if(auth.chatUser){
                
  await updateDoc(userRef,{
            lastSeen:Date.now()
        })

            }
        },60000);

    } catch (error) {
        
    }
}
    const value = {

userData,setUserData,chatData,setChatData,loadUserData

// Now we can use state these variables in any component of our project

    }

    return (

        <AppContext.Provider value={value}>
{props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;