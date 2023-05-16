import React, { useContext } from 'react';
import styles from './Menu.module.css';
import {Web3Context} from '../store/Web3ContextProvider'

const Menu = () => {
  const { account, connectWallet } = useContext(Web3Context);

  return (
    <div className={styles.menu}>
      <h2 className={styles.logo}>Etch Forever</h2>
      <button className={styles.button} onClick={connectWallet}>
        {account==""?("Connect Wallet"):("Connected")}
      </button>
    </div>
  );
};

export default Menu;

