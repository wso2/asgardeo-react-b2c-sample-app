import ASGARDEO_LOGO from '../images/asgardeo-logo-transparent.png';
import GITHUB_ICON from '../images/github.png';
import USER_LOGO from '../images/user.png'
import REACT_LOGO from '../images/react-logo.png';
import { useAuthContext } from '@asgardeo/auth-react';
import Cards from '../components/Cards';

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Home = () => {

  const { state, signIn } = useAuthContext();

  const signUpURL = `${process.env.REACT_APP_SIGN_UP_URL}${process.env.REACT_APP_CLIENT_ID} &sp=${process.env.REACT_APP_APPLICATION_NAME} &redirect_url=${process.env.REACT_APP_CLIENT_BASE_URL}`;

  return (
    <>
      {
        state?.isAuthenticated
        ? (
          <>
            <header className='App-header-section App-header-length'>
              <div>
                <div className="avatar-large">
                  <img alt='react-logo' src={ USER_LOGO } className='link-logo-image'/>
                </div>
                <h1>Hello <b>{state?.displayName ?? state?.username}</b></h1>
                <h4>Welcome to the React + Asgardeo demonstration app!</h4>
                <p className='p-description justified-text max-width'>From here on you can experience the basic business application use cases integrated with Asgardeo for user profile management and other capabilities.</p>
              </div>
            </header>
            <h3>What can you do next?</h3>
            <Cards></Cards>
          </>
        ) : (
          <header className='App-header-section'>
            <div>
              <div className="container">
                <div className="logo-container">
                  <img alt='react-logo' src={ REACT_LOGO } className='react-logo-image logo'/>
              </div>
            </div>
              <div className='logo-container'>
                <h1>Enhance your application’s IAM experience with 
                  <img alt='react-logo' src={ ASGARDEO_LOGO } className='asgardeo-logo-image'/>
                </h1>
              </div>
              <p className='p-description justified-text'>
                This sample demonstrates the authentication flow of a React application using Asgardeo.
              </p>
              <div className='button-container'>
                <button className='btn' onClick={() => signIn()}>Sign In</button>
                <a href={signUpURL}>
                  <button className='btn-outline large-button'>Create an account</button>
                </a>
              </div>
              <div className="container-column">
                <a href='https://github.com/dasuni-30/asgardeo-react-sample-app'>
                    <img alt='react-logo' src={ GITHUB_ICON } className='github-logo-image-small'/>
                </a>
                <a href='https://github.com/dasuni-30/asgardeo-react-sample-app'>
                  Explore the source code
                </a>
            </div>
            </div>
          </header>
        )
      }
    </>
  );
};
