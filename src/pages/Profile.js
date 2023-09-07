import { getUserDetails, updatePassword, updateUserDetails } from '../api/user-info';
import { useEffect, useState } from 'react';
import $ from 'jquery'
import { useAuthContext } from '@asgardeo/auth-react';
import USER_LOGO from '../images/user.png'

/**
 * Profile component.
 */
const Profile = () => {

  const [ formValues, setFormValues ] = useState();
  const [ passwordFormValues, setpasswordFormValues ] = useState();
  const { signOut } = useAuthContext();
  const [ userInfo, setUserInfo ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);

  const SCHEMA =  'urn:scim:wso2:schema';
  
  // Get the user details.
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await getUserDetails();
        setUserInfo(response);
        setIsLoading(false);
      } catch (error) {
        // Log the error.
      }
    })();
    
  }, []);

  // Set the form values.
  useEffect(() => {
    if (userInfo) {
      setFormValues({
        username: userInfo?.userName?.split('/')[1],
        email: userInfo?.emails[0],
        givenName: userInfo?.name?.givenName,
        lastName: userInfo?.name?.familyName,
        id: userInfo?.id,
        mfa: userInfo?.[SCHEMA]?.preferredMFAOption != null && JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption,
        profileUrl: userInfo?.profileUrl
      });

      if (userInfo?.[SCHEMA]?.preferredMFAOption != null ) {
        $("select[name='mfa']").val(JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption);
      }
    }
  },[ userInfo ]);

  // Set the personal info form values when changing.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  // Set the password form values when changing.
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setpasswordFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  // Set the second factor authentication method form values when changing.
  function handleSelect(event) {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  }

  // Update the second factor authentication method.
  const handleSecondFactorSubmit = async (event) => {
    event.preventDefault();
    let _formData = {
      ...userInfo,
      [SCHEMA]: { ...userInfo?.[SCHEMA], preferredMFAOption: "{\"authenticationOption\":\""+ formValues?.mfa + "\"}"}
    };
    try {
      updateUserDetails(_formData);
    } catch (error) {
      showNotification('Error in updating the user details.');
    } finally {
      showNotification('User details update successful.');
    }
  };

  // Update the user details.
  const handlePersonalInfoSubmit = async (event) => {
    event.preventDefault();
    let _formData = {
      ...userInfo,
      userName: `DEFAULT/${userInfo?.userName?.split('/')[1]}`,
      name: { familyName: formValues?.lastName, givenName: formValues?.givenName }
    };
    try {
      updateUserDetails(_formData);
    } catch (error) {
      showNotification('Error in updating the user details.');
    } finally {
      showNotification('User details update successful.');
    }
  };

  // Update the password.
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    console.log(passwordFormValues)
    try {
      updatePassword(
        passwordFormValues?.currentPassword,
        `DEFAULT/${userInfo?.userName?.split('/')[1]}`,
        passwordFormValues?.newPassword
      ).then((response) => {
        if (response.status && response.status === 200) {
          showNotification('Password update successful.');
        }
        signOut();
    })
    .catch((error) => {
      if (!error.response || error.response.status === 401) {
        showNotification('Error in updating the password.');
      }
    });

    } catch (error) {
      // Log error.
    } finally {
      // Navigate to the profile page. 
    }
  };

  function showNotification(message) {
    var notification = document.getElementById('successNotification');
    notification?.classList.add('show');
    $('#notificationDescription').text(message)
    setTimeout(function() {
      notification?.classList.remove('show');
    }, 3000); // Adjust the timeout duration as needed
  }

  return (
    <>
    { !isLoading ?
      (<div className='App-section'>
        <header className='App-header-sub-section'>
          <div className="avatar-large">
            <img alt='react-logo' src={ formValues?.profileUrl ?? USER_LOGO} className='link-logo-image circular-image'/>
          </div>
          <h1>{`${formValues?.givenName} ${formValues?.lastName}`} </h1>
          <tr>
            <label>Username: <b>{formValues?.username}</b></label>
            <br/>
            <label>User ID: <b>{formValues?.id}</b></label>
          </tr>
        </header>
        <form onSubmit={handlePersonalInfoSubmit}>
                <div className="table-container">
                  <table className="one-column-table">
                    <h3>Personal Info</h3>
                    <p className='p-description justified-text'>Update your user profile information.</p>
                    <div className="two-column-grid">
                    <div className="column">
                      <tr>
                        <td>
                          <label htmlFor='givenName'>First Name:</label>
                        </td>
                        </tr>
                        <tr>
                        <td>
                          <input
                            type='text'
                            id='givenName'
                            name='givenName'
                            value={formValues?.givenName}
                            onChange={handleChange}
                          />
                        </td>
                        </tr>
                        </div>
                        <div className="column">
                      <tr>
                        <td>
                          <label htmlFor='lastName'>Last Name:</label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={formValues?.lastName}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      </div>
                      </div>
                    <button className='btn margin-top' type='submit'>Update</button>
                  </table>
                </div>
              </form>

              <h3>Security Methods</h3>
              <p className='p-description justified-text'>Secure your account by updating passwords and second factor authentication methods.</p>

        <div className="two-column-grid">
          <div className="column">
            <div className='info-box'>
            <form onSubmit={handlePasswordSubmit}>
              <div className="table-container">
                <table className="one-column-table">
                  <h3>Change Password</h3>
                  <p className='p-description justified-text'>Update your password regularly and make sure it's unique.</p>
                  <tr>
                    <td>
                      <label htmlFor='currentPassword'>Current Password:</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type='password'
                        id='currentPassword'
                        name='currentPassword'
                        onChange={handlePasswordChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='newPassword'>New Password:</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type='password'
                        id='newPassword'
                        name='newPassword'
                        onChange={handlePasswordChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <label htmlFor='hint' className='label-hint'>
                        Changing the password will result in the termination of the current session.
                        You will have to login with the newly changed password.
                      </label>
                    </td>
                  </tr>
                  <button className='btn-outline btn-margin-top' type='submit'>Change</button>
                </table>
                </div>
                </form>
                </div>
                </div>

                <div className="column">
                <div className='info-box'>
                <form onSubmit={handleSecondFactorSubmit}>
                <div className="table-container">
                  <table className="one-column-table">
                    <h3>Second Factor Authentication</h3>
                    <p className='p-description justified-text'>Secure your account by setting two factor authentication.</p>
                    <tr>
                      <td colSpan={2} className='tr-align-center'>
                        <label>Select the Second Factor Authentication: </label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className='tr-align-center'>
                        <select id='mfa' name='mfa' onChange={handleSelect}>
                          <option value='false'>None</option>
                          <option value='email-otp-authenticator'>Email OTP</option>
                          <option value='SMSOTP'>SMS OTP</option>
                          <option value='totp'>TOTP</option>
                        </select>
                      </td>
                    </tr>
                    <label htmlFor='hint'>
                      The selected second factor will be prompted for authentication in the login flow.
                    </label>
                    <br/>
                    <button className='btn-margin-top btn-outline' type='submit'>Save</button>
                  </table>
                </div>
                </form>
              </div>
              <tr>
                <td colSpan={2} className='tr-padding tr-align-center'>
                  <div className='notification tr-align-center' id='successNotification'>
                    <p className='p-description' id='notificationDescription'>Submission successful!</p>
                  </div>
                </td>
              </tr>
        </div>
      </div>
    </div>)

    : (<div class="loader-container">
    <div class="loader"></div>
  </div>
  )
}
  </>
  );
};

export default Profile;
