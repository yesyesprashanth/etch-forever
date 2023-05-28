import { useContext, useEffect, useState, useRef } from 'react';
import { Web3Context } from '../store/Web3ContextProvider';
import styles from './MessageList.module.css';
import MessageContainer from './MessageContainer';

const MessageList = () => {
  const {messages, getMessages, account} = useContext(Web3Context);
  const messageListRef = useRef(null);  

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages();          
    };    

    fetchMessages();
  }, []);

  useEffect(()=>{
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages])

  return (
    <>
    <div className = {styles.messageListHeading}><h2>Messages</h2></div>
    <div className={styles.messageListContainer} ref = {messageListRef}>     
      
      {(account=="")? (
        <div>Loading messages...</div>
      ) : (   
        
         messages.length>0?(messages.map((message, index) => (
              <MessageContainer
              key={index}
              message={message.text}
              fromAddress={message.fromAddress}
              timestamp={message.timestamp}
              /> 
         ))):(
          <div>You are the first one to Etch</div>
         )
        //  <div>MessageList</div>        
      )}
    </div>
  </>
  );
};

export default MessageList;
