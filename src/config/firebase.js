// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setDoc,doc } from "firebase/firestore";
import {toast} from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API",
  authDomain: "chit-chat-036.firebaseapp.com",
  projectId: "chit-chat-036",
  storageBucket: "chit-chat-036.firebasestorage.app",
  messagingSenderId: "569293553310",
  appId: "API ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Database
const db = getFirestore(app);


// Create Sign up method to create a new account
const signup = async(username,email,password)=>{

    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;

        // saved user data in collection named "users"
        await setDoc(doc(db,"users",user.uid),{
id : user.uid,
username : username.toLowerCase(),
email,
name : "",
avatar : "",
bio : "Hey! I'm using chit-chat created by Prashant. I'm loving it :) ",
lastSeen : Date.now()
        })

// Let's create new collection for chats
        await setDoc(doc(db,"chats",user.uid),{

            chatData : [] // for storing chats
        })
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split('-').join(" ")); // last wali error show karni h bss
    }

}



const  login= async (email,password)=>{

    try{

        await signInWithEmailAndPassword(auth,email,password);

    }
catch(error){
console.error(error);

toast.error(error.code.split("/")[1].split('-').join(" ")); 


}

}


const logout = async()=>{


    try{

        await signOut(auth);
        // auth is the Firebase Authentication instance that lets us manage users (sign up, login, logout) in our app.
    }
    catch(error){
        console.error(error);

toast.error(error.code.split("/")[1].split('-').join(" ")); 
    }

}

// Export the sign up method
// and import it in login.jsx page
export {signup,login,logout,auth,db};
