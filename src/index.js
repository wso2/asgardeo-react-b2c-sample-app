import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <AuthProvider
  config={ {
      signInRedirectURL: `${process.env.REACT_APP_BASE_URL}`,
      signOutRedirectURL: `${process.env.REACT_APP_BASE_URL}`,
      clientID: `${process.env.REACT_APP_CLIENT_ID}`,
      baseUrl: `${process.env.REACT_APP_ASGARDEO_BASE_URL}`,
      resourceServerURLs: [ "https://71fe9995-65a1-4e05-92a8-bc40749649d8-prod.e1-us-east-azure.choreoapis.dev/hmvi/demoapi/endpoint-9090-803/1.0.0/accounts" ],
      scope: [ "openid","profile", "internal_login", "internal_user_mgt_view", "app_roles" ]
  } }
  >
  <React.StrictMode>
    <App/>
  </React.StrictMode>
</AuthProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
