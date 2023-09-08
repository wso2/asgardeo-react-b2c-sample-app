import React from 'react';
import GITHUB_ICON from '../images/github.png';
import USER_GUIDE from '../images/user.png';
import DOCUMENTATION_LOGO from '../images/docs.png';

const Links = () => {
  return (
    <div className='row'>
      <div className="container">
        <div className="container-column">
          <a href='https://docs.google.com/document/d/1-yKHQgQE3-Pj5FRoBdOLf33u1Y41QWzNd3jdR6TVhIQ/edit#heading=h.mvq9fx4kf8ex'>
            <img alt='react-logo' src={ USER_GUIDE } className='link-logo-image-small logo'/>
          </a>
          <a href='https://docs.google.com/document/d/1-yKHQgQE3-Pj5FRoBdOLf33u1Y41QWzNd3jdR6TVhIQ/edit#heading=h.mvq9fx4kf8ex'>
            User Guide
          </a>
        </div>
        <div className="container-column">
          <a href='https://github.com/dasuni-30/asgardeo-react-sample-app'>
            <img alt='react-logo' src={ GITHUB_ICON } className='link-logo-image-small logo'/>
          </a>
          <a href='https://github.com/dasuni-30/asgardeo-react-sample-app'>
            Github
          </a>
        </div>
        <div className="container-column">
          <a href='https://wso2.com/asgardeo/docs/'>
            <img alt='react-logo' src={ DOCUMENTATION_LOGO } className='link-logo-image-small logo'/>
          </a>
          <a href='https://wso2.com/asgardeo/docs/'>
            Asgardeo
          </a>
        </div>
      </div>
    </div> 
  )
}

export default Links;
