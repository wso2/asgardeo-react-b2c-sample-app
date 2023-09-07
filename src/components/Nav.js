import React, { useEffect, useState } from 'react';
import ASGARDEO_LOGO from '../images/asgardeo-logo-transparent.png';
import USER_LOGO from '../images/user.png';
import routesConfig from '../configs/routes-config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

/**
 * Nav bar component.
 */
const Nav = () => {
    const { state, signOut, getDecodedIDToken } = useAuthContext();
    const [ isResourcesAllowed, setIsResourcesAllowed ] = useState();

    const navigate = useNavigate();

    // Route to profile page.
    const routeProfileChange = () =>{ 
      let path = routesConfig.profile; 
      navigate(path);
      addActive();
    }

    // Route to API Call page.
    const routeResourcesChange = () =>{ 
      let path = routesConfig.resource; 
      navigate(path);
      addActive();
    }

    // Route to settings page.
    const routeSettingsChange = () =>{ 
      let path = routesConfig.settings; 
      navigate(path);
      addActive();
    }

    // Route to home page.
    const routeHomeChange = () =>{ 
      let path = routesConfig.home; 
      navigate(path);
      addActive();
    }

    // Filter the display of API Call section based on the application role.
    useEffect(() => {
      getDecodedIDToken().then((decodedIdToken) => {
        if (decodedIdToken?.application_roles === "React-App-Manager") {
          setIsResourcesAllowed(true);
        }
      }).catch((error) => {
          
      })
    }, [getDecodedIDToken, state]);

    // Add active class to the current button.
    useEffect (() => {
      addActive();
    }, [ isResourcesAllowed ]);

    // Add active class to the current button.
    useEffect(() => {
      console.log("hh");
      const currentUrl = window.location.href;
      const currentTabName = currentUrl.split("/")[3].replace("#", "");

      var resourceTab = document.getElementById("resource");
      var settingsTab = document.getElementById("setting");
      var homeTab = document.getElementById("home");
      var profileTab = document.getElementById("profile");
      var currentTab = homeTab;

      if (currentTabName === "resource") {
        currentTab = resourceTab;
        removeActiveTab(homeTab);
        removeActiveTab(settingsTab);
      } 
      else if (currentTabName === "settings") {
        currentTab = settingsTab;
        removeActiveTab(homeTab);
        removeActiveTab(resourceTab);
      } else if (currentTabName === "") {
        currentTab = homeTab;
        removeActiveTab(resourceTab);
        removeActiveTab(settingsTab);
      } else if (currentTabName === "profile") {
        currentTab = profileTab;
        removeActiveTab(homeTab);
        removeActiveTab(resourceTab);
        removeActiveTab(settingsTab);
      }
      else {
        currentTab = homeTab;
        removeActiveTab(resourceTab);
        removeActiveTab(settingsTab);
      }
      if (currentTab !== undefined && !(currentTab === null) && !(currentTab.className.includes("active")) && currentTab !== profileTab) {
        currentTab.className += " active";
      }
      
    }, [isResourcesAllowed]);

    // Remove active class from all buttons.
    function removeActiveTab (tab) {
      if (tab != null && tab.className.includes("active")) {
        tab.className = tab.className.replace(" active", "");
      }
    };

    // Add active class to the current button.
    const addActive = () =>{
      // Get the current tab from the route.
      const currentUrl = window.location.href;
      const currentTabName = currentUrl.split("/")[3].replace("#", "");

      var resourceTab = document.getElementById("resource");
      var settingsTab = document.getElementById("setting");
      var homeTab = document.getElementById("home");
      var profileTab = document.getElementById("profile");
      var currentTab;

      if (currentTabName === "resource") {
        currentTab = resourceTab;
        removeActiveTab(homeTab);
        removeActiveTab(settingsTab);
      } 
      else if (currentTabName === "settings") {
        currentTab = settingsTab;
        removeActiveTab(homeTab);
        removeActiveTab(resourceTab);
      } else if (currentTabName === "") {
        currentTab = homeTab;
        removeActiveTab(resourceTab);
        removeActiveTab(settingsTab);
      } else if (currentTabName === "profile") {
        currentTab = profileTab;
        removeActiveTab(homeTab);
        removeActiveTab(resourceTab);
        removeActiveTab(settingsTab);
      } else {
        currentTab = homeTab;
        removeActiveTab(resourceTab);
        removeActiveTab(settingsTab);
      }
      if (currentTab !== undefined && !(currentTab === null) && !(currentTab.className.includes("active")) && currentTab !== profileTab) {
        currentTab.className += " active";
      }
    };

    return (
      <div className='navbar-section'>
        <div className='navbar'>
          <div className='left-panel'>
            <div onClick={() => navigate(routesConfig.home)}>
              <img alt='react-logo' src={ ASGARDEO_LOGO } className='asgardeo-logo-image-small'/>
            </div>
          </div>
          <div className='center-panel' id='center-panel'>
            <a href='#/' className='nav active' id ='home' onClick={routeHomeChange}>Home</a>
            { 
              state.isAuthenticated
              && <a href='#/' className='nav' id='resource' onClick={routeResourcesChange}>API Call</a>
            }
            { 
              isResourcesAllowed
              && state.isAuthenticated
              && <a href='#/' className='nav' id='setting' onClick={routeSettingsChange}>Settings</a>
            }
          </div>
          <div className='right-panel'>
            <a href='#/' onClick={routeProfileChange}>{state?.displayName ?? state?.username}</a>
            <div className="avatar-dropdown">
              <div className="avatar">
                <img alt='react-logo' src={ USER_LOGO } className='link-logo-image-small logo'/>
                <span className="arrow small">&#9660;</span>
              </div>
              <ul className="dropdown-menu">
                <li><a href="#/" className='nav' id='profile' onClick={routeProfileChange}>Profile</a></li>
                <li><a href="#/" onClick={() => signOut()}>Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Nav;
