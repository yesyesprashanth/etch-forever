import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import {contractABI, COTRACT_ADDRESS, ETHERSCAN_API, POLYGONSCAN_API} from '../utils/contractData';
import dotenv from 'dotenv';
dotenv.config();
const Web3Context = createContext();


const Web3ContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        await connectWallet();
        console.log("connectWallet Function Called")
      }
    };

    init();
    ethereum.on('chainChanged', handleChainChange);

    return () => {
      ethereum.removeListener('chainChanged', handleChainChange);
    };
  }, []);
  
  const handleChainChange = (chainId) => {
    // Check if the connected account is still available in the new blockchain
    ethereum.request({ method: 'eth_accounts' })
      .then((accounts) => {
        const selectedAccount = accounts[0] || '';
        setAccount(selectedAccount);
        getMessages(selectedAccount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const connectWallet = async () => {
    try {
      console.log("CW top");
      const ethereum = window.ethereum;
      await ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const chainId = network.chainId;     
      const accounts = await provider.listAccounts();
      setAccount(pv=>accounts[0]);
      setProvider(pv=>provider);
      const contract = new ethers.Contract(COTRACT_ADDRESS, contractABI, signer);
      setContract(pv=>contract);    
      console.log("cw bottom");
      // alert(account)
    } catch (err) {
      console.log(err);
    }
  };
  
  const saveMessage = async (message) => {
    try {
      const tx = await contract.setMessage(message);
      await tx.wait();
      await getMessages();
    } catch (err) {
      console.log(err);
    }
  };
  
  const getMessage = async () => {
    try {
      const message =  "Message List";
      return message;
    } catch (err) {
      console.log(err);
    }
  };

  const removeDataPrefix = (inputString) => {
    return inputString.replace(/^0x([0-9a-fA-F]*)$/, '$1');
  };

  
  function hexToUtf8(hexString) {
    const hex = hexString.toString();
    let utf8String = '';
    for (let i = 0; i < hex.length; i += 2) {
      utf8String += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return decodeURIComponent(escape(utf8String));
  }
  
  const getMessages = async () => {
    try {     
      
      const chainId = parseInt(ethereum.chainId)       
      let response;
      if (chainId === 1) {
        // response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.COTRACT_ADDRESS}&sort=desc&apikey=${process.env.ETHERSCAN_API}`);
        response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${COTRACT_ADDRESS}&sort=desc&apikey=${ETHERSCAN_API}`);
        console.log(chainId);
      }else if (chainId === 11155111) {
        response = await fetch(`https://api-sepolia.etherscan.io//api?module=account&action=txlist&address=${COTRACT_ADDRESS}&sort=desc&apikey=${ETHERSCAN_API}`);        
        console.log(chainId);
      }else if (chainId === 5) {
        response = await fetch(`https://api-goerli.etherscan.io///api?module=account&action=txlist&address=${COTRACT_ADDRESS}&sort=desc&apikey=${ETHERSCAN_API}`);
        console.log(chainId);
      } 
      else if (chainId === 137) {
        response = await fetch(`https://api.polygonscan.com/api?module=account&action=txlist&address=${COTRACT_ADDRESS}&sort=desc&apikey=${POLYGONSCAN_API}`);
        console.log(chainId);        
      }else if(chainId === 80001) {
        response = await fetch(`https://api-testnet.polygonscan.com//api?module=account&action=txlist&address=${COTRACT_ADDRESS}&sort=desc&apikey=${POLYGONSCAN_API}`);        
        console.log(chainId);
      } else {
        console.error('Unsupported chain ID:', chainId);
        console.log(chainId);
        return;
      }
      const data = await response.json();    
      console.log(data)  
      const events = data.result.filter((tx => tx.input !== '0x')); //.filter((tx) => tx.from === '0xad4954f40dfaa0857095ec503f1fd9c0dbe0b2ab' && tx.input === '0x');     
      events.pop();
      console.log("Events", events);
      const messages = events.map((event) => {
        const timestamp = new Date(parseInt(event.timeStamp) * 1000).toLocaleString();

        const text = hexToUtf8(event.input.slice(74)).replace(/\0/g, '');    
        const fromAddress = event.from;
        console.log(text.toString());
        return { timestamp, text, fromAddress};
      });
      messages.reverse();
      console.log("Messages", messages);
      setMessages(messages);      
    } catch (error) {
      console.error(error);
    }
}
  
  return (
    <Web3Context.Provider value={{ connectWallet, saveMessage, messages, userMessage, setUserMessage, getMessages, account, provider }}>
      {children}
    </Web3Context.Provider>
  );
};


export { Web3ContextProvider, Web3Context };
