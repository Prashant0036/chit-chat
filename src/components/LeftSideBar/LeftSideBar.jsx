import React, { useState } from 'react';
import "./LeftSideBar.css";
import assets from '../../assets/assets';
import { useNavigate } from "react-router-dom";


const LeftSideBar = () => {

    const navigate = useNavigate(); // to control navigation in different pages

    function openProfilePage(){
        navigate("/profile");


    }

    const[subMenu,setSubMenu] = useState(false);
    return (
        <div className='ls'>
            <div className="ls-top">

            <div className="ls-nav">


                <img src={assets.logo} className='logo' alt=''/>

                <div className="menu">

                    <img src={assets.menu_icon} onClick={()=>{
                        
                        if(!subMenu){

                            setSubMenu(true); 
                        }else{
                            setSubMenu(false);
                        }
                    }
                        
                        
                        } className='menu-icon' alt=''/>
                    
                    {subMenu=== true ?<div className="sub-menu">

                        <p onClick={openProfilePage}>Edit Profile</p>
                        <hr/>
                        <p>Logout</p>
                    </div> : null }

                </div>
            </div>

            <div className="ls-search">

                <img src={assets.search_icon} className='search-icon' alt=''/>

                <input type='text' placeholder='Search'/>

            </div>

            </div>

            <div className="ls-list">

                {Array(12).fill("").map((Value,index)=>(

                  

                <div key = {index} className="friend">
                    <img className="friend-pp" src={assets.profile_img}/>
                    <div>

                        <p className='username'> Devesh Thakur </p>
                        <span className='recent-message'>Hii,Prashant</span>
                    </div>
                </div>

                ))}

            </div>



            
        </div>
    );
}

export default LeftSideBar;
