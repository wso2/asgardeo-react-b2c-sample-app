import {AsgardeoSPAClient} from '@asgardeo/auth-react';
import endpointConfig from '../configs/endpoint-config';

export async function getExternalApi () {

  const requestConfig = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "GET",
    url: `${endpointConfig.api.endpoints.externalApi}`
  };

  return AsgardeoSPAClient.getInstance().httpRequest(requestConfig)
  .then((response) => {
      
    return response.data;
  })
  .catch((error) => {
    // Log the error.
  });
};
