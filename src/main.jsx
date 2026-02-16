import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MetadataProvider } from './context/MetadataContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MetadataProvider>
        <App />
      </MetadataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

