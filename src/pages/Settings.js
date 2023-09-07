import { useEffect } from 'react';
import BLUE_THEME from '../images/blue-theme.png'
import ORANGE_THEME from '../images/orange-theme.png'
import INFO_ICON from '../images/info.png';
/**
 * Settings page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */

export const Settings = () => {
  // Get the root element
  var r = document.querySelector(':root');

  // Filter the display of API Call section based on the application role.
  useEffect(() => {
    var defaultTheme = document.getElementById("orangeTheme");
    defaultTheme.checked = true;  
  }, []);

  // Update the theme color.
  const updateTheme = async (event) => {
    event.preventDefault();
    var themeColor = document.querySelector( 'input[name="theme"]:checked');
    console.log(themeColor);   

    if (themeColor.value === "blueTheme") {
      r.style.setProperty('--primary', '#1591EB');
    } else {
      r.style.setProperty('--primary', '#FF7300');
    } 
  };

  return (
    <div className='App-section'>
      <header className='App-header-sub-section'>
        <h1>Settings</h1>
        <p className='p-description'>Manage the theme related settings of the application.</p>
      </header>
      <div className='container-center'>
        <form id="form" onSubmit={updateTheme}>
          <div className="table-container">
            <table className="one-column-table">
            <div className="card-container justify-center">
              <img alt='react-logo' src={ INFO_ICON} className='small-icon'/>
              <p className='p-description justified-text'>
                Customize the theme color of the application user interfaces by switching between the following buttons.
              </p>
            </div>
              <tr>
              <div className='row'>
                <div className='column'>
                  <div className='card theme-card-height'>
                    <div className="card-container-theme">
                      <div className='row'>
                        <input type="radio" id="blueTheme" value="blueTheme" name="theme"/>  
                        <label for="blue"> Blue color theme </label>
                      </div>
                      <img className="theme-image" alt='react-logo' src={BLUE_THEME}/>
                    </div>
                  </div>
                </div>
                <div className='column'>
                  <div className='card theme-card-height'>
                    <div className="card-container-theme">
                      <div className='row'>
                        <input type="radio" id="orangeTheme" value="orangeTheme" name="theme"/>  
                        <label for="orange"> Orange color theme </label>
                      </div>
                      <img className="theme-image" alt='react-logo' src={ORANGE_THEME}/>
                    </div>
                  </div>
                </div>
              </div>
              </tr>
              <button type="submit" className="btn btn-margin-top">Update</button>
            </table>
          </div>
          </form>
      </div>
    </div>
  );
};
