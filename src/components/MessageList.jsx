import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../store/Web3ContextProvider';
import styles from './MessageList.module.css';
import MessageContainer from './MessageContainer';

const MessageList = () => {
  const {messages, getMessages, account} = useContext(Web3Context);
  

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages();     
      console.log(messages);
    };

    fetchMessages();
  }, []);

  return (
    <>
    <div className = {styles.messageListHeading}><h2>Messages</h2></div>
    <div className={styles.messageListContainer}>     
      
      {(account=="")? (
        <div>Loading messages...</div>
      ) : (   
        
            messages.map((message, index) => (
              <MessageContainer
              key={index}
              message={message.text}
              fromAddress={message.fromAddress}
              timestamp={message.timestamp}
              />
         ))
        //  <div>MessageList</div>        
      )}
    </div>
  </>
  );
};

export default MessageList;
