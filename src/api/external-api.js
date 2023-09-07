import {AsgardeoSPAClient} from '@asgardeo/auth-react';
import endpointConfig from '../configs/endpoint-config';

const externalApiEndpoint = `${endpointConfig.api.endpoints.externalApi}`;

const auth = AsgardeoSPAClient.getInstance();

export async function getExternalApi () {

  const requestConfig = {
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      method: "GET",
      url: externalApiEndpoint
  };

  return auth.httpRequest(requestConfig)
  .then((response) => {
      
      return response.data;
  })
  .catch((error) => {
      console.log(error);
  });
};
