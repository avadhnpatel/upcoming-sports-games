import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserteamsContextProvider } from './context/UserteamContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserteamsContextProvider>
        <App />
      </UserteamsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

