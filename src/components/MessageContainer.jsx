import React from 'react';
import styles from './MessageContainer.module.css';

const MessageContainer = ({ message, fromAddress, timestamp }) => {
  return (
    <div className={styles.messageContainer}>
      <div className = {styles.msgheader}>
          <div className={styles.fromAddress}>{fromAddress}</div>
          <div className={styles.timestamp}>{timestamp}</div>        
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default MessageContainer;
