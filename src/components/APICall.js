import React, { useState } from 'react';
import { getExternalApi} from '../api/external-api';
import INFO_ICON from '../images/info.png';

/**
 * API Call component.
 */
const APICall = () => {
  const [ userInfo, setUserInfo ] = useState();

  const message = 
    'Initiate a request to an external API and retrieve the response by clicking on the button below. ' +
    'This involves communicating with an external server through a ' +
    'designated API.';

    // Invoke the external API.
    const handleApiCall = () => {
    (async () => {
      try {
        const response = await getExternalApi();
        setUserInfo(response);
      } catch (error) {
        // Log the error.
      }
    })();
  };
  
  return (
    <div className='container-center'>
      <div className="card-container">
        <img alt='react-logo' src={ INFO_ICON} className='small-icon'/>
        <p className='p-description max-width'>{message}</p>
      </div>
      <div className='table-container'>
        <button className='btn btn-margin-top' onClick={handleApiCall}>Invoke API</button>
        <br/>
        <h3>Output</h3>
        <pre id='contentToCopy'>
          {JSON.stringify(userInfo, null, 2)}
        </pre>
      </div>
      
    </div>
  )
}

export default APICall;
