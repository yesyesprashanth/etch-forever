import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Web3ContextProvider } from './store/Web3ContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Web3ContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Web3ContextProvider>,
)
