import {AsgardeoSPAClient} from '@asgardeo/auth-react';
import endpointConfig from '../configs/endpoint-config';

const auth = AsgardeoSPAClient.getInstance();

export async function getExternalApi () {

  const requestConfig = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "GET",
    url: `${endpointConfig.api.endpoints.externalApi}`
  };

  return auth.httpRequest(requestConfig)
  .then((response) => {
      
    return response.data;
  })
  .catch((error) => {
    // Log the error.
  });
};
