import {AsgardeoSPAClient} from '@asgardeo/auth-react';
import endpointConfig from '../configs/endpoint-config';

const meEndpoint = `${endpointConfig.api.endpoints.me}`;

const auth = AsgardeoSPAClient.getInstance();

/**
 * API Call to fetch user details.
 */
export async function getUserDetails () {

    const requestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/scim+json"
        },
        method: "GET",
        url: meEndpoint
    };

    return auth.httpRequest(requestConfig)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        throw new Error('Failed to fetch user profile.');
    });
};

/**
 * API Call to update user details.
 */
export async function updateUserDetails(body) {

    const requestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/scim+json"
        },
        method: "PUT",
        data: body,
        url: meEndpoint
    };

    return auth.httpRequest(requestConfig)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        throw new Error('Failed to update user profile.');
    });
  }

/**
 * API Call update the password.
 */
export async function updatePassword(currentPassword, username, newPassword) {

const requestConfig = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/scim+json"
    },
    method: "PATCH",
    url: meEndpoint,
    auth: {
        password: currentPassword,
        username: [ username, "@",
        `${process.env.REACT_APP_ORG_NAME}` ]
        .join("")
    },
    data: {
        Operations: [
            {
                op: "add",
                value: {
                    password: newPassword
                }
            }
        ],
        schemas: [ "urn:ietf:params:scim:api:messages:2.0:PatchOp" ]
    },
    withCredentials: true
};

return auth.httpRequest(requestConfig)
.then((response) => {
    return response.data;
})
.catch((error) => {
    throw new Error('Failed to update the password.');
});
}
