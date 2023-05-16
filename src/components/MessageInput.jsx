import React, { useContext, useState } from 'react';
import { Web3Context } from '../store/Web3ContextProvider';

import styles from './MessageInput.module.css';

function MessageInput() {
  const { account, saveMessage } = useContext(Web3Context);
  const [message, setMessage] = useState('');

  const handleSaveMessage = async () => {
    if (!message) return;
    await saveMessage(message);
    setMessage('');
  };

  return (
    <div className={styles.messageInput}>
      <textarea
        className={styles.textarea}
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.button} onClick={handleSaveMessage}>
        Save <span className={styles.arrow}>&#10148;</span>
      </button>
    </div>
  );
}

export default MessageInput;
