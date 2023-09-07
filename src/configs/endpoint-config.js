const asgardeoBaseUrl = process.env.REACT_APP_ASGARDEO_BASE_URL;

const endpointConfig = {
  api: {
    endpoints: {
      me: `${asgardeoBaseUrl}/scim2/Me`,
      externalApi: 'https://71fe9995-65a1-4e05-92a8-bc40749649d8-prod.e1-us-east-azure.choreoapis.dev/hmvi/demoapi/endpoint-9090-803/1.0.0/accounts'
    },
  },
};

export default endpointConfig;
