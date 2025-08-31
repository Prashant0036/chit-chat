import React from 'react';
import "./Chat.css";
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import ChatBox from '../../components/ChatBox/chatBox';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
const Chat = () => {
    return (
        <div className='chat'>
            
<div className="chat-container">


    {/* Mount The 3 Sections of Chat Page */}
    <LeftSideBar></LeftSideBar>
    <ChatBox></ChatBox>
    <RightSideBar></RightSideBar>
</div>


        </div>
    );
}

export default Chat;
