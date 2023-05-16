import React from "react";
import Menu from '../components/Menu'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'

const HomePage = () => {
  return (    
      <div className="container">
        <Menu />
        <MessageList />
        <MessageInput />
      </div>    
  );
};

export default HomePage;
